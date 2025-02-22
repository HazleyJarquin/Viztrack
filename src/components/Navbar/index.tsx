import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CustomAvatar } from "../CustomAvatar";
import { MenuIcon } from "lucide-react";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex items-center justify-between md:justify-end p-5">
      <MenuIcon className="flex md:hidden" />

      <CustomAvatar
        fallback={"??"}
        src={session?.user?.image ?? ""}
        name={session?.user?.name ?? ""}
      />
    </div>
  );
};
