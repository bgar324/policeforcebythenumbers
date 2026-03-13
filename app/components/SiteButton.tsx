import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const siteButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        action: "group/site-button relative isolate overflow-visible",
        actionCompact: "group/site-button relative isolate overflow-visible",
        navControl:
          "h-full bg-white px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-black transition-colors duration-150 font-[family:var(--font-nav)]",
        mobileMenuToggle:
          "h-full min-w-[82px] gap-2 border-l border-black bg-white px-3 font-[family:var(--font-nav)] transition-colors duration-150 min-[380px]:min-w-[92px] min-[380px]:gap-3 min-[380px]:px-4 md:hidden",
        mobileThemeToggle:
          "block w-full bg-white px-6 py-3 text-center text-[15px] leading-none text-black transition-colors duration-150 font-[family:var(--font-nav)] hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-[rgb(var(--site-ink-rgb))] dark:hover:!text-[rgb(var(--site-surface-rgb))] dark:focus-visible:!bg-[rgb(var(--site-ink-rgb))] dark:focus-visible:!text-[rgb(var(--site-surface-rgb))]",
        utilityIcon: "group/site-button relative isolate overflow-visible",
        overlay: "fixed inset-0 z-40",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "navControl",
        active: true,
        className:
          "bg-black !text-white dark:!bg-[rgb(var(--site-ink-rgb))] dark:!text-[rgb(var(--site-surface-rgb))]",
      },
      {
        variant: "navControl",
        active: false,
        className:
          "hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-[rgb(var(--site-ink-rgb))] dark:hover:!text-[rgb(var(--site-surface-rgb))] dark:focus-visible:!bg-[rgb(var(--site-ink-rgb))] dark:focus-visible:!text-[rgb(var(--site-surface-rgb))]",
      },
      {
        variant: "mobileMenuToggle",
        active: true,
        className: "bg-black text-white",
      },
      {
        variant: "mobileMenuToggle",
        active: false,
        className:
          "bg-white text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white",
      },
      {
        variant: "overlay",
        active: true,
        className:
          "pointer-events-auto bg-white/10 opacity-100 backdrop-blur-[2px]",
      },
      {
        variant: "overlay",
        active: false,
        className: "pointer-events-none bg-transparent opacity-0",
      },
    ],
    defaultVariants: {
      variant: "action",
      active: false,
    },
  },
);

const raisedButtonShadowVariants = cva(
  "pointer-events-none absolute inset-0 border border-black bg-black opacity-0 transition-all duration-300 ease-out group-hover/site-button:translate-x-1 group-hover/site-button:translate-y-1 group-hover/site-button:opacity-100 group-focus-visible/site-button:translate-x-1 group-focus-visible/site-button:translate-y-1 group-focus-visible/site-button:opacity-100",
  {
    variants: {
      variant: {
        action: "",
        actionCompact: "",
        utilityIcon: "",
      },
    },
    defaultVariants: {
      variant: "action",
    },
  },
);

const raisedButtonFaceVariants = cva(
  "relative inline-flex h-full w-full items-center justify-center overflow-hidden border border-black bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] text-black transition-transform duration-300 ease-out group-hover/site-button:-translate-x-1 group-hover/site-button:-translate-y-1 group-focus-visible/site-button:-translate-x-1 group-focus-visible/site-button:-translate-y-1",
  {
    variants: {
      variant: {
        action:
          "px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]",
        actionCompact:
          "px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
        utilityIcon: "size-10 text-xs font-semibold uppercase leading-none",
      },
    },
    defaultVariants: {
      variant: "action",
    },
  },
);

type RaisedButtonVariant = "action" | "actionCompact" | "utilityIcon";
type SlottableChildProps = {
  children?: React.ReactNode;
  className?: string;
} & Record<string, unknown>;

function isRaisedButtonVariant(
  variant: string | null | undefined,
): variant is RaisedButtonVariant {
  return (
    variant === "action" ||
    variant === "actionCompact" ||
    variant === "utilityIcon"
  );
}

type SiteButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof siteButtonVariants> & {
    asChild?: boolean;
  };

export function SiteButton({
  children,
  className,
  variant,
  active,
  asChild = false,
  type,
  ...props
}: SiteButtonProps) {
  const resolvedVariant = variant ?? "action";
  const sharedProps = {
    "data-slot": "site-button",
    "data-variant": resolvedVariant,
    "data-active": active ? "true" : "false",
  } as const;

  if (isRaisedButtonVariant(resolvedVariant)) {
    const raisedContent = (
      <>
        <span
          aria-hidden
          className={raisedButtonShadowVariants({ variant: resolvedVariant })}
        />
        <span className={raisedButtonFaceVariants({ variant: resolvedVariant })}>
          {children}
        </span>
      </>
    );

    if (asChild) {
      if (!React.isValidElement(children)) {
        throw new Error("SiteButton with asChild requires a single React element child.");
      }

      const child = children as React.ReactElement<SlottableChildProps>;
      const childProps = child.props;

      return React.cloneElement<SlottableChildProps>(child, {
        ...childProps,
        ...sharedProps,
        ...props,
        className: cn(
          siteButtonVariants({ variant: resolvedVariant, active, className }),
          childProps.className,
        ),
        children: (
          <>
            <span
              aria-hidden
              className={raisedButtonShadowVariants({ variant: resolvedVariant })}
            />
            <span
              className={raisedButtonFaceVariants({ variant: resolvedVariant })}
            >
              {childProps.children}
            </span>
          </>
        ),
      });
    }

    return (
      <button
        type={type ?? "button"}
        {...sharedProps}
        className={cn(
          siteButtonVariants({ variant: resolvedVariant, active, className }),
        )}
        {...props}
      >
        {raisedContent}
      </button>
    );
  }

  if (asChild) {
    if (!React.isValidElement(children)) {
      throw new Error("SiteButton with asChild requires a single React element child.");
    }

    const child = children as React.ReactElement<SlottableChildProps>;
    const childProps = child.props;

    return React.cloneElement<SlottableChildProps>(child, {
      ...childProps,
      ...sharedProps,
      ...props,
      className: cn(
        siteButtonVariants({ variant: resolvedVariant, active, className }),
        childProps.className,
      ),
    });
  }

  return (
    <button
      type={type ?? "button"}
      {...sharedProps}
      className={cn(
        siteButtonVariants({ variant: resolvedVariant, active, className }),
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { siteButtonVariants };
