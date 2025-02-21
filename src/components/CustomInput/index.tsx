import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  containerClassName?: string;
  iconClassName?: string;
  error?: boolean;
  errorMessage?: string;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      className,
      containerClassName,
      iconClassName,
      icon: Icon,
      iconPosition = "right",
      error,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div className={cn("relative flex items-center", containerClassName)}>
          <Input
            className={cn(
              Icon && iconPosition === "right" && "pr-10",
              Icon && iconPosition === "left" && "pl-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
          {Icon && (
            <Icon
              className={cn(
                "absolute h-5 w-5 text-muted-foreground",
                iconPosition === "right" && "right-3",
                iconPosition === "left" && "left-3",
                iconClassName
              )}
            />
          )}
        </div>
        {error && errorMessage && (
          <p className="mt-1 text-sm text-destructive">{errorMessage}</p>
        )}
      </div>
    );
  }
);
CustomInput.displayName = "CustomInput";
