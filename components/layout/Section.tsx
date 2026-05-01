import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionSpacing = "none" | "sm" | "default" | "lg" | "nav";
type SectionTone = "default" | "muted" | "primary" | "transparent";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  spacing?: SectionSpacing;
  tone?: SectionTone;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "as" | "children">;

const spacingClass: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-12 lg:py-16",
  default: "py-[var(--section-padding-y)]",
  lg: "py-20 lg:py-32",
  nav: "py-[var(--nav-padding-y)]",
};

const toneClass: Record<SectionTone, string> = {
  default: "bg-[var(--base-background)] text-foreground",
  muted: "bg-muted text-foreground",
  primary: "bg-primary text-primary-foreground",
  transparent: "bg-transparent text-inherit",
};

export function Section<T extends ElementType = "section">({
  as,
  children,
  spacing = "default",
  tone = "default",
  className,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        "flex w-full flex-col items-center gap-6",
        spacingClass[spacing],
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
