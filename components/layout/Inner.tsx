import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "column" | "row" | "responsive";
type Gap = "0" | "4" | "6" | "8" | "10" | "12" | "16";
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "between" | "end";

type InnerProps = {
  children: ReactNode;
  direction?: Direction;
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const directionClass: Record<Direction, string> = {
  column: "flex-col",
  row: "flex-row",
  responsive: "flex-col lg:flex-row",
};

const gapClass: Record<Gap, string> = {
  "0": "gap-0",
  "4": "gap-[var(--spacing-4)]",
  "6": "gap-[var(--spacing-6)]",
  "8": "gap-[var(--spacing-8)]",
  "10": "gap-[var(--spacing-10)]",
  "12": "gap-[var(--spacing-12)]",
  "16": "gap-[var(--spacing-16)]",
};

const alignClass: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClass: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  between: "justify-between",
  end: "justify-end",
};

/**
 * Inner handles internal layout.
 * Figma often includes this responsibility in Container.
 * In code, keep it separated from Container.
 */
export function Inner({
  children,
  direction = "column",
  gap = "16",
  align = "start",
  justify = "start",
  className,
  ...props
}: InnerProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        directionClass[direction],
        gapClass[gap],
        alignClass[align],
        justifyClass[justify],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
