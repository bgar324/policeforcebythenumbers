export const ROUTE_TRANSITION_ACTIVE_CLASS = "route-transitioning";

export function beginRouteTransition() {
  if (typeof window === "undefined") {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  document.documentElement.classList.add(ROUTE_TRANSITION_ACTIVE_CLASS);
}
