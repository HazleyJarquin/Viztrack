"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface Link {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
  action?: () => void;
}

interface Props {
  link: Link;
}

export const LinkItems = ({ link }: Props) => {
  const pathName = usePathname();
  const isActive = pathName === link.path;

  return (
    <Link
      href={link.path}
      onClick={link.action}
      key={link.id}
      className={clsx(
        "w-full px-3 py-2 flex items-center gap-3 rounded-md group hover:bg-lavenderLight",
        {
          "bg-lavenderLight text-white": isActive,
        }
      )}
    >
      <div
        className={clsx(" flex-shrink-0", {
          "text-deepBlue": isActive,
          "text-muted-foreground": !isActive,
        })}
      >
        {link.icon}
      </div>

      <p
        className={clsx(" text-sm line-clamp-1", {
          "text-deepBlue": isActive,
          "text-muted-foreground": !isActive,
        })}
      >
        {link.name}
      </p>
    </Link>
  );
};
