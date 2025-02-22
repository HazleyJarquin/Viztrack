import { CustomInput } from "../CustomInput";
import { MenuIcon, SearchIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="w-full flex items-center p-5">
      <MenuIcon className="flex md:hidden" />
      <CustomInput
        placeholder="Search"
        icon={SearchIcon}
        className="bg-paleBlue border-none"
      />
    </div>
  );
};
