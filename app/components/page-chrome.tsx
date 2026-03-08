import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

export const pageShellClassName =
  "mx-auto w-full max-w-[1200px] border-x border-black font-[family:var(--font-nav)]";

export const pageGutterClassName = "px-6 sm:px-10";

export const pageHeaderSpacingClassName = "py-10 sm:py-14";

export const pageSectionSpacingClassName = "py-10 sm:py-12";

export const pageEyebrowClassName =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70";

export const pageSectionEyebrowClassName =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60";

export const pageMetaLabelClassName =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55";

export const pageTitleClassName =
  "mt-4 max-w-4xl text-4xl font-medium leading-tight sm:text-6xl";

export const pageTitleStrongClassName =
  "mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl";

export const pageDescriptionClassName =
  "mt-4 max-w-3xl text-base leading-relaxed text-black/75";

export const pageDescriptionWideClassName =
  "mt-5 max-w-4xl text-base leading-relaxed text-black/75";

export const pageActionClassName =
  "inline-flex items-center justify-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white";

export const pageActionCompactClassName =
  "inline-flex items-center justify-center border border-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white";

type PageShellProps = ComponentPropsWithoutRef<"main">;

export function PageShell({ className, ...props }: PageShellProps) {
  return <main className={cn(pageShellClassName, className)} {...props} />;
}

type PageInsetProps = ComponentPropsWithoutRef<"div">;

export function PageInset({ className, ...props }: PageInsetProps) {
  return <div className={cn(pageGutterClassName, className)} {...props} />;
}

type PageHeaderProps = ComponentPropsWithoutRef<"header"> & {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  innerClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

export function PageHeader({
  className,
  innerClassName,
  eyebrow,
  title,
  description,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cn("border-b border-black", className)} {...props}>
      <PageInset className={cn(pageHeaderSpacingClassName, innerClassName)}>
        <p className={cn(pageEyebrowClassName, eyebrowClassName)}>{eyebrow}</p>
        <h1 className={cn(pageTitleClassName, titleClassName)}>{title}</h1>
        {description ? (
          <p className={cn(pageDescriptionClassName, descriptionClassName)}>
            {description}
          </p>
        ) : null}
        {children}
      </PageInset>
    </header>
  );
}

type PageSectionProps = ComponentPropsWithoutRef<"section"> & {
  innerClassName?: string;
  withBorder?: boolean;
};

export function PageSection({
  className,
  innerClassName,
  withBorder = true,
  children,
  ...props
}: PageSectionProps) {
  return (
    <section
      className={cn(withBorder && "border-b border-black", className)}
      {...props}
    >
      <PageInset className={cn(pageSectionSpacingClassName, innerClassName)}>
        {children}
      </PageInset>
    </section>
  );
}
