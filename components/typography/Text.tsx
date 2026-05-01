import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSize = "sm" | "base" | "lg" | "xl";
type TextTone = "default" | "muted";

type TextProps = {
  size?: TextSize;
  tone?: TextTone;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLParagraphElement>;

const sizeClass: Record<TextSize, string> = {
  sm: "text-sm leading-6",
  base: "text-base leading-7",
  lg: "text-lg leading-8",
  xl: "text-xl leading-8",
};

const toneClass: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
};

export function Text({
  size = "base",
  tone = "muted",
  children,
  className,
  ...props
}: TextProps) {
  return (
    <p className={cn("text-pretty", sizeClass[size], toneClass[tone], className)} {...props}>
      {children}
    </p>
  );
}
