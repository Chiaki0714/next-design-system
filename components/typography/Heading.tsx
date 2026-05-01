import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "sm" | "md" | "lg" | "xl";

type HeadingProps = {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

const sizeClass: Record<HeadingSize, string> = {
  sm: "text-2xl font-semibold tracking-tight md:text-3xl",
  md: "text-3xl font-semibold tracking-tight md:text-4xl",
  lg: "text-4xl font-semibold tracking-tight md:text-5xl",
  xl: "text-5xl font-semibold tracking-tight md:text-6xl",
};

export function Heading({
  as = "h2",
  size = "lg",
  children,
  className,
  ...props
}: HeadingProps) {
  const Component = as;

  return (
    <Component className={cn("text-balance leading-tight", sizeClass[size], className)} {...props}>
      {children}
    </Component>
  );
}
