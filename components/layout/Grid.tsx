import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Columns = "2" | "3" | "4";
type Gap = "6" | "8" | "12";

type GridProps = {
  children: ReactNode;
  columns?: Columns;
  gap?: Gap;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const columnsClass: Record<Columns, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 lg:grid-cols-3",
  "4": "md:grid-cols-2 lg:grid-cols-4",
};

const gapClass: Record<Gap, string> = {
  "6": "gap-[var(--spacing-6)]",
  "8": "gap-[var(--spacing-8)]",
  "12": "gap-[var(--spacing-12)]",
};

export function Grid({
  children,
  columns = "3",
  gap = "6",
  className,
  ...props
}: GridProps) {
  return (
    <div className={cn("grid w-full grid-cols-1", columnsClass[columns], gapClass[gap], className)} {...props}>
      {children}
    </div>
  );
}
