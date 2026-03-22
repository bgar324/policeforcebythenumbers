"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ROUTE_TRANSITION_ACTIVE_CLASS } from "@/app/components/transition/route-transition-state";

const ROUTE_TRANSITION_SETTLE_CLASS = "route-transition-settle";

export default function RouteTransitionEffects() {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    const root = document.documentElement;

    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;
    root.classList.add(ROUTE_TRANSITION_SETTLE_CLASS);

    const timeoutId = window.setTimeout(() => {
      root.classList.remove(
        ROUTE_TRANSITION_ACTIVE_CLASS,
        ROUTE_TRANSITION_SETTLE_CLASS,
      );
    }, 950);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
