import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize =
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

type ContainerGutter = "default" | "none";

type ContainerProps = {
  children: ReactNode;
  size?: ContainerSize;
  gutter?: ContainerGutter;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const sizeClass: Record<ContainerSize, string> = {
  "2xl": "max-w-[var(--container-2xl)]",
  "3xl": "max-w-[var(--container-3xl)]",
  "4xl": "max-w-[var(--container-4xl)]",
  "5xl": "max-w-[var(--container-5xl)]",
  "6xl": "max-w-[var(--container-6xl)]",
  "7xl": "max-w-[var(--container-7xl)]",
  full: "max-w-none",
};

const gutterClass: Record<ContainerGutter, string> = {
  default: "px-[var(--container-padding-x)]",
  none: "px-0",
};

/**
 * Container is responsible only for width, gutter and centering.
 * Do not add flex/grid/gap responsibilities here.
 */
export function Container({
  children,
  size = "7xl",
  gutter = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClass[size],
        gutterClass[gutter],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
