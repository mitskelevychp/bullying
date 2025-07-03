"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "border-destructive text-destructive hover:border-destructive/80",
      },
      size: {
        sm: "h-9 rounded-md",
        lg: "h-11 rounded-md px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants>
>(({ className, variant, size, ...props }, ref) => (
  <input
    className={cn(inputVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
))

Input.displayName = "Input"

export { Input }
