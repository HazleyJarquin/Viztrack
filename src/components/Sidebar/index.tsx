"use client";

import { useSideBar } from "./hooks/useSidebar";
import { LinkItems } from "./components/LinkItems";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "../ui/sidebar";

export const Sidebar = () => {
  const { sideBarLinks } = useSideBar();
  const { data: session } = useSession();

  const handleLogout = () => {
    if (session?.user) {
      signOut({ callbackUrl: "/auth/login" });
    } else {
      deleteCookie("authToken");
    }
  };

  return (
    <ShadSidebar variant="floating">
      <SidebarHeader>
        <div className="w-full py-4 border-b border-gray-300 flex items-center justify-center gap-2">
          <div className="bg-deepBlue rounded-full flex items-center justify-center w-10 h-10">
            <p className="text-white">V</p>
          </div>
          <h1 className="text-deepBlue font-bold text-xl">VizTrack</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {sideBarLinks.map((item) => (
              <SidebarMenu key={item.id}>
                <SidebarGroupLabel>{item.name}</SidebarGroupLabel>
                {item.children.map((child) => (
                  <LinkItems key={child.id} link={child} />
                ))}
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-5">
          <LinkItems
            link={{
              id: 0,
              name: "Cerrar Sesión",
              path: "/auth/login",
              icon: <LogOutIcon />,
              action: handleLogout,
            }}
          />
        </div>
      </SidebarFooter>
    </ShadSidebar>
  );
};
