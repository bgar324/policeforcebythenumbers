"use client";

import TransitionLink, {
  type TransitionLinkProps,
} from "@/app/components/transition/TransitionLink";
import { buildLeavingHref } from "@/lib/external-navigation";

type ExternalLinkProps = Omit<TransitionLinkProps, "href"> & {
  href: string;
};

export default function ExternalLink({
  href,
  prefetch,
  ...props
}: ExternalLinkProps) {
  return (
    <TransitionLink
      href={buildLeavingHref(href)}
      prefetch={prefetch ?? false}
      {...props}
    />
  );
}
