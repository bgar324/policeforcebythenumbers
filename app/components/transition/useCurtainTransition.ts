"use client";

import { useContext } from "react";
import { CurtainTransitionContext } from "./TransitionProvider";

export function useCurtainTransition() {
  const context = useContext(CurtainTransitionContext);

  if (!context) {
    throw new Error("useCurtainTransition must be used within TransitionProvider.");
  }

  return context;
}
