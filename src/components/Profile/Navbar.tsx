
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Browse Hotels", href: "/hotels" },
    { name: "My Bookings", href: "/bookings" },
    { name: "Profile", href: "/profile" },
  ];

  const NavItem = ({ item, isMobile = false }: { item: { name: string; href: string }; isMobile?: boolean }) => {
    const isActive = window.location.pathname === item.href;
    return (
      <Link
        to={item.href}
        className={cn(
          "transition-colors duration-200",
          isActive
            ? "text-primary font-semibold"
            : "text-gray-600 hover:text-primary",
          isMobile && "block py-2"
        )}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">EzyStay</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name} className="px-3">
                <NavItem item={item} isMobile />
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;