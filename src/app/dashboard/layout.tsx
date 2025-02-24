import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex">
      <div className="hidden md:flex  h-screen">
        <Sidebar />
      </div>

      <div className="w-full md:w-[85%] h-screen flex flex-col">
        <div className="w-full flex items-center px-2">
          <Navbar />
        </div>
        <div className="w-full px-5 pt-2 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
