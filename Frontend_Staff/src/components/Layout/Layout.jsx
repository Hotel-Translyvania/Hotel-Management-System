import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { hotelName, navItems, userProfile } from "@/TestData/HotelConfig";
import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const activeNavItem = navItems.find((item) => item.path === location.pathname) || navItems[0];

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar
        appName={hotelName}
        navItems={navItems}
        isOpen={sidebarOpen}
        activeNavItem={activeNavItem}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col flex-1 overflow-hidden border-l border-gray-200">
        <Topbar
          user={userProfile}
          currentNavItem={activeNavItem.name}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;