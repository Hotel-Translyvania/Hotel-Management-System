
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Bell } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold text-hotel-primary">StayPal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/rooms" className="text-gray-600 hover:text-hotel-primary transition-colors duration-200">
              Rooms
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-hotel-primary transition-colors duration-200">
              Services
            </Link>
            <Link to="/destinations" className="text-gray-600 hover:text-hotel-primary transition-colors duration-200">
              Destinations
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-hotel-primary transition-colors duration-200">
              Support
            </Link>
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="User menu">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/bookings" className="w-full">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/logout" className="w-full">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 animate-fade-in">
            <div className="space-y-3">
              <Link 
                to="/rooms" 
                className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-hotel-primary"
                onClick={() => setIsOpen(false)}
              >
                Rooms
              </Link>
              <Link 
                to="/services" 
                className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-hotel-primary"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/destinations" 
                className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-hotel-primary"
                onClick={() => setIsOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                to="/support" 
                className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-hotel-primary"
                onClick={() => setIsOpen(false)}
              >
                Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
