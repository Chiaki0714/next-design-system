import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Gap = "4" | "6" | "8" | "12" | "16";
type Align = "start" | "center" | "end" | "stretch";

type StackProps = {
  children: ReactNode;
  gap?: Gap;
  align?: Align;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const gapClass: Record<Gap, string> = {
  "4": "gap-[var(--spacing-4)]",
  "6": "gap-[var(--spacing-6)]",
  "8": "gap-[var(--spacing-8)]",
  "12": "gap-[var(--spacing-12)]",
  "16": "gap-[var(--spacing-16)]",
};

const alignClass: Record<Align, string> = {
  start: "items-start text-left",
  center: "items-center text-center",
  end: "items-end text-right",
  stretch: "items-stretch",
};

export function Stack({
  children,
  gap = "6",
  align = "start",
  className,
  ...props
}: StackProps) {
  return (
    <div className={cn("flex w-full flex-col", gapClass[gap], alignClass[align], className)} {...props}>
      {children}
    </div>
  );
}
