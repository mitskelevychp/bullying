"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/utils"

const textareaVariants = cva(
  "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "border-destructive text-destructive hover:border-destructive/80",
      },
      size: {
        sm: "min-h-[60px] text-sm",
        lg: "min-h-[80px] text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    VariantProps<typeof textareaVariants>
>(({ className, variant, size, ...props }, ref) => (
  <textarea
    className={cn(textareaVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
))

Textarea.displayName = "Textarea"

export { Textarea }
