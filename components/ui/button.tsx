"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "quiet" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-action hover:bg-primary-hover",
  ghost: "bg-surface-2 text-ink border border-border hover:bg-surface-3",
  quiet: "bg-transparent text-ink-2 hover:text-ink",
  danger: "bg-danger-soft text-danger hover:bg-danger hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[12.5px] rounded-xl",
  md: "px-5 py-3 text-[14.5px] rounded-[18px]",
  lg: "px-5 py-4 text-[15.5px] rounded-[24px]",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", block, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-[transform,background,box-shadow] duration-200 active:scale-[0.975] disabled:pointer-events-none disabled:opacity-45",
        variants[variant],
        sizes[size],
        block && "w-full",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
