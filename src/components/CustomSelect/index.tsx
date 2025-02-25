import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LucideIcon } from "lucide-react";

interface CustomSelectProps {
  options: { label: string; value: string | number }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  containerClassName?: string;
  iconClassName?: string;
  error?: boolean;
  errorMessage?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  icon: Icon,
  iconPosition = "right",
  containerClassName,
  iconClassName,
  error,
  errorMessage,
}) => {
  return (
    <div className="w-full">
      <div className={cn("relative flex items-center", containerClassName)}>
        {Icon && iconPosition === "left" && (
          <Icon
            className={cn(
              "absolute left-3 h-5 w-5 text-muted-foreground",
              iconClassName
            )}
          />
        )}

        <Select onValueChange={onChange} value={value}>
          <SelectTrigger
            className={cn(
              "w-full",
              Icon && iconPosition === "left" && "pl-10",
              Icon && iconPosition === "right" && "pr-10",
              error && "border-destructive focus:ring-destructive"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(({ label, value }) => (
              <SelectItem key={String(value)} value={String(value)}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {Icon && iconPosition === "right" && (
          <Icon
            className={cn(
              "absolute right-3 h-5 w-5 text-muted-foreground",
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
};
