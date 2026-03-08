"use client";

import { Link as ViewTransitionLink } from "next-view-transitions";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
} from "react";

export type TransitionStartOptions = {
  replace?: boolean;
  scroll?: boolean;
};

export type TransitionLinkProps = Omit<
  ComponentPropsWithoutRef<typeof ViewTransitionLink>,
  "href"
> & {
  href: string;
  transition?: TransitionStartOptions;
};

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink(
    { href, replace, scroll, transition, ...rest },
    ref,
  ) {
    return (
      <ViewTransitionLink
        ref={ref}
        href={href}
        replace={transition?.replace ?? replace}
        scroll={transition?.scroll ?? scroll}
        {...rest}
      />
    );
  },
);

export default TransitionLink;
