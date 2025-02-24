import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CustomAvatar } from "../CustomAvatar";
import { ModeToggle } from "../ModeToggle";
import { SidebarTrigger } from "../ui/sidebar";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex items-center justify-between md:justify-end p-5 dark:bg-[#100c0c]">
      <SidebarTrigger className="block md:hidden" />

      <div className="flex items-center gap-5">
        <ModeToggle />
        <CustomAvatar
          fallback={"??"}
          src={session?.user?.image ?? ""}
          name={session?.user?.name ?? ""}
        />
      </div>
    </div>
  );
};
