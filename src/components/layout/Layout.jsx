import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function Layout() {
  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">

      <Sidebar />

      <div className="flex-1">

        <TopNavbar />

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;