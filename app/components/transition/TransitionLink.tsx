"use client";

import Link from "next/link";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";
import type { TransitionStartOptions } from "./TransitionProvider";
import { useCurtainTransition } from "./useCurtainTransition";

export type TransitionLinkProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href"
> & {
  href: string;
  transition?: TransitionStartOptions;
};

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  );
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink(
    { href, onClick, target, download, replace, scroll, transition, ...rest },
    ref,
  ) {
    const { startTransition } = useCurtainTransition();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (event.defaultPrevented || isModifiedEvent(event)) {
        return;
      }

      if (target && target !== "_self") {
        return;
      }

      if (typeof download !== "undefined" && download !== false) {
        return;
      }

      const destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin) {
        return;
      }

      const current = new URL(window.location.href);
      if (
        destination.pathname === current.pathname &&
        destination.search === current.search
      ) {
        return;
      }

      event.preventDefault();
      void startTransition(`${destination.pathname}${destination.search}${destination.hash}`, {
        replace: transition?.replace ?? Boolean(replace),
        scroll: transition?.scroll ?? scroll,
      });
    };

    return (
      <Link
        ref={ref}
        href={href}
        target={target}
        download={download}
        replace={replace}
        scroll={scroll}
        onClick={handleClick}
        {...rest}
      />
    );
  },
);

export default TransitionLink;
