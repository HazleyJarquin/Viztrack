"use client";

import { useSideBar } from "./hooks/useSidebar";
import { LinkItems } from "./components/LinkItems";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";

export const Sidebar = () => {
  const { sideBarLinks } = useSideBar();
  return (
    <div className="w-full h-screen bg-softGray flex flex-col gap-5">
      <div className="w-full py-4 border-b border-gray-300 flex items-center justify-center gap-2">
        <div className="bg-deepBlue rounded-full flex items-center justify-center w-10 h-10">
          <p className="text-white">V</p>
        </div>
        <h1 className="text-deepBlue font-bold text-xl">VizTrack</h1>
      </div>

      {sideBarLinks.map((link) => (
        <div
          key={link.id}
          className="w-full py-5 px-5 flex flex-col items-start justify-start gap-2"
        >
          <p className="text-muted-foreground text-start uppercase text-sm">
            {link.name}
          </p>
          {link.children.map((child) => (
            <LinkItems key={child.id} link={child} />
          ))}
        </div>
      ))}
      <div className="px-5">
        <LinkItems
          link={{
            id: 0,
            name: "Cerrar Sesión",
            path: "/auth/login",
            icon: <LogOutIcon />,
            action: () => {
              deleteCookie("authToken");
            },
          }}
        />
      </div>
    </div>
  );
};
