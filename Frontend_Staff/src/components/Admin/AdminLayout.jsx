import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import {
  Administration,
  AdminNavItems,
  AdminProfile,
} from "@/TestData/HotelConfig";
import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const activeNavItem =
    AdminNavItems.find((item) => {
      item.path === location.pathname.split("/admin/")[1];
    }) || AdminNavItems[0];

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar
        appName={Administration}
        navItems={AdminNavItems}
        isOpen={sidebarOpen}
        activeNavItem={activeNavItem}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col flex-1 overflow-hidden border-l border-gray-200">
        <Topbar user={AdminProfile} currentNavItem={activeNavItem.name} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
