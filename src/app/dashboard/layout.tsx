import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex bg-white">
      <div className="hidden md:flex w-[15%] h-screen">
        <Sidebar />
      </div>

      <div className="w-full md:w-[85%] h-screen flex flex-col">
        <Navbar />
        <div className="w-full px-5 flex-grow overflow-y-auto pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
