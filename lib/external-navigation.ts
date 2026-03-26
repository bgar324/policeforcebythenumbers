const LEAVING_PAGE_PATH = "/leaving";

export function buildLeavingHref(target: string) {
  return `${LEAVING_PAGE_PATH}?target=${encodeURIComponent(target)}`;
}

export function parseExternalTarget(target: string | null | undefined) {
  if (!target) {
    return null;
  }

  try {
    const url = new URL(target);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}
