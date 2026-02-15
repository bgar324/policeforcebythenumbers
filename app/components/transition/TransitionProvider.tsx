"use client";

import {
  Suspense,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const COVER_DURATION_MS = 500;
const REVEAL_DURATION_MS = 550;
const COVER_HOLD_MS = 70;
const FAILSAFE_MS = 4500;
const SEED_SALT = "pfbn-curtain-v1";
const CURTAIN_COLOR = "#171716" as const;
const LABEL_TEXT = "PFBN";
const LABEL_COLOR = "#f2efe7";

type Phase = "idle" | "cover" | "wait-route" | "wait-paint" | "reveal";

type Cell = {
  x: number;
  y: number;
  color: typeof CURTAIN_COLOR;
};

type Pattern = {
  width: number;
  height: number;
  dpr: number;
  cellSize: number;
  cells: Cell[];
  total: number;
};

export type TransitionStartOptions = {
  replace?: boolean;
  scroll?: boolean;
};

type StartTransition = (
  href: string,
  options?: TransitionStartOptions,
) => Promise<void>;

type CurtainTransitionContextValue = {
  startTransition: StartTransition;
  isTransitioning: boolean;
};

type ActiveTransition = {
  id: number;
  toHref: string;
  toKey: string;
  options: {
    replace: boolean;
    scroll: boolean;
  };
  reducedMotion: boolean;
  resolve: () => void;
};

type ScrollLockSnapshot = {
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
};

export const CurtainTransitionContext =
  createContext<CurtainTransitionContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hashString(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace<T>(values: T[], random: () => number) {
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
}

function createPattern(
  seed: number,
  viewportWidth: number,
  viewportHeight: number,
  dpr: number,
): Pattern {
  const targetCells = clamp(
    Math.round((viewportWidth * viewportHeight) / 14000),
    200,
    500,
  );
  const baseCellSize = clamp(
    Math.round(Math.sqrt((viewportWidth * viewportHeight) / targetCells)),
    28,
    72,
  );
  const cellSize = clamp(Math.round(baseCellSize / 2), 14, 36);
  const cols = Math.ceil(viewportWidth / cellSize);
  const rows = Math.ceil(viewportHeight / cellSize);
  const random = mulberry32(seed);
  const curtainColor = CURTAIN_COLOR;

  const orderedColumns: number[] = [];
  for (let col = 0; col < cols; ) {
    const remaining = cols - col;
    const bandSize = Math.min(remaining, 1 + Math.floor(random() * 3));
    const band: number[] = [];

    for (let i = 0; i < bandSize; i += 1) {
      band.push(col + i);
    }

    shuffleInPlace(band, random);
    orderedColumns.push(...band);
    col += bandSize;
  }

  const cells: Cell[] = [];
  for (const col of orderedColumns) {
    const rowOrder = Array.from({ length: rows }, (_, index) => index);
    shuffleInPlace(rowOrder, random);

    for (const row of rowOrder) {
      cells.push({
        x: col * cellSize,
        y: row * cellSize,
        color: curtainColor,
      });
    }
  }

  return {
    width: viewportWidth,
    height: viewportHeight,
    dpr,
    cellSize,
    cells,
    total: cells.length,
  };
}

function coverLabelAlpha(progress: number) {
  const p = clamp(progress, 0, 1);

  if (p < 0.14) return 0;
  if (p < 0.24) return (p - 0.14) / 0.1;
  if (p < 0.4) return 1;
  if (p < 0.46) return 1 - ((p - 0.4) / 0.06) * 0.8;
  if (p < 0.52) return 0.2 + ((p - 0.46) / 0.06) * 0.8;
  if (p < 0.66) return 1 - (p - 0.52) / 0.14;
  return 0;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

function buildRouteKey(pathname: string, search: string) {
  return search.length > 0 ? `${pathname}?${search}` : pathname;
}

function toDestination(href: string) {
  const url = new URL(href, window.location.href);
  return {
    origin: url.origin,
    toHref: `${url.pathname}${url.search}${url.hash}`,
    toKey: `${url.pathname}${url.search}`,
  };
}

function RouteChangeSignal({
  onRouteChange,
}: {
  onRouteChange: (routeKey: string) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const routeKey = useMemo(() => buildRouteKey(pathname, search), [pathname, search]);

  useEffect(() => {
    onRouteChange(routeKey);
  }, [onRouteChange, routeKey]);

  return null;
}

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const patternRef = useRef<Pattern | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const rafRef = useRef<number | null>(null);
  const revealDelayRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const activeRef = useRef<ActiveTransition | null>(null);
  const inFlightPromiseRef = useRef<Promise<void> | null>(null);
  const transitionIdRef = useRef(0);
  const coverCompleteAtRef = useRef(0);
  const scrollLockRef = useRef<ScrollLockSnapshot | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const currentRouteKeyRef = useRef(
    typeof window === "undefined"
      ? ""
      : `${window.location.pathname}${window.location.search}`,
  );
  const mountedRef = useRef(false);

  const clearScheduledWork = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (revealDelayRef.current !== null) {
      window.clearTimeout(revealDelayRef.current);
      revealDelayRef.current = null;
    }
  }, []);

  const unlockScroll = useCallback(() => {
    const snapshot = scrollLockRef.current;
    if (!snapshot) {
      return;
    }

    document.documentElement.style.overflow = snapshot.htmlOverflow;
    document.body.style.overflow = snapshot.bodyOverflow;
    document.body.style.paddingRight = snapshot.bodyPaddingRight;
    scrollLockRef.current = null;
  }, []);

  const lockScroll = useCallback(() => {
    if (scrollLockRef.current) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollbarCompensation = Math.max(0, window.innerWidth - html.clientWidth);

    scrollLockRef.current = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (scrollbarCompensation > 0) {
      body.style.paddingRight = `${scrollbarCompensation}px`;
    }
  }, []);

  const prepareCanvas = useCallback((seed: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const pattern = createPattern(seed, width, height, dpr);

    patternRef.current = pattern;

    canvas.style.width = `${pattern.width}px`;
    canvas.style.height = `${pattern.height}px`;
    canvas.width = Math.max(1, Math.round(pattern.width * pattern.dpr));
    canvas.height = Math.max(1, Math.round(pattern.height * pattern.dpr));

    const context = canvas.getContext("2d");
    if (!context) {
      contextRef.current = null;
      return;
    }

    context.setTransform(pattern.dpr, 0, 0, pattern.dpr, 0, 0);
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, pattern.width, pattern.height);
    contextRef.current = context;
  }, []);

  const drawCells = useCallback((visibleCount: number, startIndex = 0) => {
    const pattern = patternRef.current;
    const context = contextRef.current;

    if (!pattern || !context) {
      return;
    }

    const clampedStart = clamp(startIndex, 0, pattern.total);
    const clampedCount = clamp(visibleCount, 0, pattern.total - clampedStart);

    context.clearRect(0, 0, pattern.width, pattern.height);
    for (let i = clampedStart; i < clampedStart + clampedCount; i += 1) {
      const cell = pattern.cells[i];
      context.fillStyle = cell.color;
      context.fillRect(cell.x, cell.y, pattern.cellSize, pattern.cellSize);
    }
  }, []);

  const drawCenterLabel = useCallback((progress: number) => {
    const pattern = patternRef.current;
    const context = contextRef.current;

    if (!pattern || !context) {
      return;
    }

    const alpha = coverLabelAlpha(progress);
    if (alpha <= 0.01) {
      return;
    }

    const fontSize = Math.round(
      clamp(Math.min(pattern.width, pattern.height) * 0.18, 48, 122),
    );
    const centerX = pattern.width / 2;
    const centerY = pattern.height / 2;

    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `400 ${fontSize}px "Chomsky", Georgia, "Times New Roman", Times, serif`;
    context.globalAlpha = 0.94 * alpha;
    context.shadowColor = "rgba(0,0,0,0.35)";
    context.shadowBlur = Math.round(fontSize * 0.08);
    context.fillStyle = LABEL_COLOR;
    context.fillText(LABEL_TEXT, centerX, centerY);
    context.restore();
  }, []);

  const resolveTransition = useCallback(
    (transitionId: number) => {
      const active = activeRef.current;
      if (!active || active.id !== transitionId) {
        return;
      }

      clearScheduledWork();
      drawCells(0);
      patternRef.current = null;
      phaseRef.current = "idle";
      activeRef.current = null;
      inFlightPromiseRef.current = null;
      unlockScroll();

      if (mountedRef.current) {
        setIsTransitioning(false);
      }

      active.resolve();
    },
    [clearScheduledWork, drawCells, unlockScroll],
  );

  const navigateToTarget = useCallback(
    (active: ActiveTransition) => {
      if (active.options.replace) {
        router.replace(active.toHref, { scroll: active.options.scroll });
        return;
      }

      router.push(active.toHref, { scroll: active.options.scroll });
    },
    [router],
  );

  const beginReveal = useCallback(
    (transitionId: number) => {
      const active = activeRef.current;
      if (!active || active.id !== transitionId) {
        return;
      }

      const pattern = patternRef.current;
      if (!pattern) {
        resolveTransition(transitionId);
        return;
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      phaseRef.current = "reveal";
      const startedAt = performance.now();

      const step = (now: number) => {
        const latest = activeRef.current;
        if (!latest || latest.id !== transitionId || phaseRef.current !== "reveal") {
          return;
        }

        const progress = clamp((now - startedAt) / REVEAL_DURATION_MS, 0, 1);
        const eased = easeInOutCubic(progress);
        const removedCells = Math.round(pattern.total * eased);
        const visibleCells = pattern.total - removedCells;

        drawCells(visibleCells, removedCells);

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(step);
          return;
        }

        resolveTransition(transitionId);
      };

      rafRef.current = window.requestAnimationFrame(step);
    },
    [drawCells, resolveTransition],
  );

  const beginCover = useCallback(
    (transitionId: number) => {
      const pattern = patternRef.current;
      if (!pattern) {
        resolveTransition(transitionId);
        return;
      }

      phaseRef.current = "cover";
      const startedAt = performance.now();

      const step = (now: number) => {
        const active = activeRef.current;
        if (!active || active.id !== transitionId || phaseRef.current !== "cover") {
          return;
        }

        const progress = clamp((now - startedAt) / COVER_DURATION_MS, 0, 1);
        const eased = easeOutCubic(progress);
        const visibleCells = Math.round(pattern.total * eased);

        drawCells(visibleCells);
        drawCenterLabel(progress);

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(step);
          return;
        }

        drawCells(pattern.total);
        coverCompleteAtRef.current = performance.now();
        phaseRef.current = "wait-route";
        navigateToTarget(active);

        timeoutRef.current = window.setTimeout(() => {
          const latest = activeRef.current;
          if (!latest || latest.id !== transitionId || phaseRef.current === "idle") {
            return;
          }
          beginReveal(transitionId);
        }, FAILSAFE_MS);
      };

      rafRef.current = window.requestAnimationFrame(step);
    },
    [beginReveal, drawCells, drawCenterLabel, navigateToTarget, resolveTransition],
  );

  const startTransition = useCallback<StartTransition>(
    (href, options = {}) => {
      if (typeof window === "undefined") {
        return Promise.resolve();
      }

      if (inFlightPromiseRef.current) {
        return inFlightPromiseRef.current;
      }

      let destination: ReturnType<typeof toDestination>;
      try {
        destination = toDestination(href);
      } catch {
        return Promise.resolve();
      }

      if (destination.origin !== window.location.origin) {
        window.location.assign(href);
        return Promise.resolve();
      }

      const fromKey = currentRouteKeyRef.current;
      const toKey = destination.toKey;

      if (toKey === fromKey) {
        return Promise.resolve();
      }

      const reducedMotion = prefersReducedMotionRef.current;
      const normalizedOptions = {
        replace: Boolean(options.replace),
        scroll: options.scroll ?? true,
      };

      const transitionPromise = new Promise<void>((resolve) => {
        const id = transitionIdRef.current + 1;
        transitionIdRef.current = id;

        const activeTransition: ActiveTransition = {
          id,
          toHref: destination.toHref,
          toKey,
          options: normalizedOptions,
          reducedMotion,
          resolve,
        };

        activeRef.current = activeTransition;
        phaseRef.current = reducedMotion ? "wait-route" : "cover";

        if (reducedMotion) {
          navigateToTarget(activeTransition);
          timeoutRef.current = window.setTimeout(() => {
            resolveTransition(id);
          }, FAILSAFE_MS);
          return;
        }

        lockScroll();

        const seed = hashString(`${fromKey}|${toKey}|${SEED_SALT}`);
        prepareCanvas(seed);
        setIsTransitioning(true);
        drawCells(0);
        beginCover(id);
      });

      inFlightPromiseRef.current = transitionPromise;
      return transitionPromise;
    },
    [beginCover, drawCells, lockScroll, navigateToTarget, prepareCanvas, resolveTransition],
  );

  const handleRouteChange = useCallback(
    (nextRouteKey: string) => {
      currentRouteKeyRef.current = nextRouteKey;

      const active = activeRef.current;
      if (
        !active ||
        nextRouteKey !== active.toKey ||
        phaseRef.current !== "wait-route"
      ) {
        return;
      }

      phaseRef.current = "wait-paint";

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const latest = activeRef.current;
          if (
            !latest ||
            latest.id !== active.id ||
            phaseRef.current !== "wait-paint"
          ) {
            return;
          }

          if (latest.reducedMotion) {
            resolveTransition(latest.id);
            return;
          }

          const elapsedSinceCover = performance.now() - coverCompleteAtRef.current;
          const holdRemaining = Math.max(0, COVER_HOLD_MS - elapsedSinceCover);
          if (holdRemaining <= 0) {
            beginReveal(latest.id);
            return;
          }

          revealDelayRef.current = window.setTimeout(() => {
            const current = activeRef.current;
            if (!current || current.id !== latest.id || phaseRef.current !== "wait-paint") {
              return;
            }
            beginReveal(latest.id);
          }, holdRemaining);
        });
      });
    },
    [beginReveal, resolveTransition],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      currentRouteKeyRef.current = `${window.location.pathname}${window.location.search}`;
    }
  }, []);

  useEffect(() => {
    const active = activeRef.current;
    if (
      !active ||
      currentRouteKeyRef.current !== active.toKey ||
      phaseRef.current !== "wait-route"
    ) {
      return;
    }
    handleRouteChange(currentRouteKeyRef.current);
  }, [handleRouteChange]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      clearScheduledWork();
      unlockScroll();
    };
  }, [clearScheduledWork, unlockScroll]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    updateMotionPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference);
      return () => mediaQuery.removeEventListener("change", updateMotionPreference);
    }

    mediaQuery.addListener(updateMotionPreference);
    return () => mediaQuery.removeListener(updateMotionPreference);
  }, []);

  const contextValue = useMemo(
    () => ({
      startTransition,
      isTransitioning,
    }),
    [isTransitioning, startTransition],
  );

  return (
    <CurtainTransitionContext.Provider value={contextValue}>
      <Suspense fallback={null}>
        <RouteChangeSignal onRouteChange={handleRouteChange} />
      </Suspense>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[2147483647] ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      />
    </CurtainTransitionContext.Provider>
  );
}
