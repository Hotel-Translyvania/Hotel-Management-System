import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";

const Sidebar = ({ appName, navItems, isOpen, onToggle, activeNavItem }) => {
  
  return (
    <div
      className={`flex flex-col px-2 py-4  h-screen bg-white shadow-lg transition-all duration-1000 ${
        isOpen ? "w-64" : "w-28"
      }`}
    >
      <SidebarHeader 
        isOpen={isOpen} 
        appName={appName}
      />
      
      <SidebarNav 
        isOpen={isOpen} 
        items={navItems} 
        activeItem={activeNavItem}
      />
      
      <SidebarFooter 
        isOpen={isOpen} 
        onToggle={onToggle} 
      />
    </div>
  );
};

export default Sidebar;