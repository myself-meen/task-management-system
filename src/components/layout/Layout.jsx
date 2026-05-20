import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { useState } from "react";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F9FF]">

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 md:ml-20">

        <TopNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-4 pt-20 md:p-6 lg:p-8 md:pt-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;