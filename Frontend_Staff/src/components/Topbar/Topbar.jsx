import { FiUser } from "react-icons/fi";
import { MdNotifications, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "../Auth/authStore";
import { LogoutConfirmation } from "../Confirmation/Logout";
import { PlusCircle } from "lucide-react";

const Topbar = ({ currentNavItem }) => {
  const { user, logout } = useAuthStore();
  const Navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm py-3 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold font-serif">{currentNavItem}</h1>
      </div>

      <div className="flex items-center space-x-4 ml-4">
        <MdNotifications
          className="cursor-pointer text-blue-500 hover:text-red-300"
          onClick={() => alert("You have no new notifications.")}
          aria-label="Notification-Bell-Button"
          size={20}
        />

        <div
          className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-full cursor-pointer"
          onClick={() => {
            console.log(user?.role);
            Navigate(user?.role === "admin" ? "/admin/settings" : "/setting");
          }}
        >
          {user?.profilePic ? (
            <img
              src={user?.profilePic}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser size={18} className="text-gray-600" />
            </div>
          )}
        </div>
        {/* 
        if user?.role is admin, add a new button to add another admin and redirect to /admin/signup        
        */}
        {user?.role === "admin" && (
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => Navigate("/admin/signup")}
          >
            <PlusCircle size={16} />
          </Button>
        )}

        <LogoutConfirmation
          onLogout={async () => {
            await logout();
            Navigate("/login");
          }}
        />
      </div>
    </header>
  );
};

export default Topbar;
