import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  icon?: React.ReactNode;
  label: string;
  items: string[];
  onSelect?: (item: string) => void;
}

export const CustomDropdown = ({ icon, label, items, onSelect }: Props) => {
  return (
    <div className="w-full max-w-[200px]">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center justify-center bg-white px-3 py-2 focus:outline-none data-[state=open]:bg-transparent">
          <div className="flex items-center gap-1">
            {icon && (
              <div className="flex h-6 w-6 items-center justify-center">
                {icon}
              </div>
            )}
            <span className="text-sm font-medium text-neutral-800">
              {label}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] border-none bg-white shadow-lg">
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="focus:bg-neutral-50"
              onClick={() => onSelect && onSelect(item)}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
