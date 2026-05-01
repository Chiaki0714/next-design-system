import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Gap = "6" | "8" | "12" | "16";
type Ratio = "1-1" | "2-1" | "1-2";

type SplitProps = {
  children: ReactNode;
  gap?: Gap;
  ratio?: Ratio;
  align?: "start" | "center" | "stretch";
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const gapClass: Record<Gap, string> = {
  "6": "gap-[var(--spacing-6)]",
  "8": "gap-[var(--spacing-8)]",
  "12": "gap-[var(--spacing-12)]",
  "16": "gap-[var(--spacing-16)]",
};

const ratioClass: Record<Ratio, string> = {
  "1-1": "lg:grid-cols-2",
  "2-1": "lg:grid-cols-[2fr_1fr]",
  "1-2": "lg:grid-cols-[1fr_2fr]",
};

const alignClass = {
  start: "items-start",
  center: "items-center",
  stretch: "items-stretch",
};

export function Split({
  children,
  gap = "8",
  ratio = "1-1",
  align = "center",
  className,
  ...props
}: SplitProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1",
        ratioClass[ratio],
        gapClass[gap],
        alignClass[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
