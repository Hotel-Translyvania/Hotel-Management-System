import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className={`text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
              Ezy<span className="text-primary">Stay</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className={`flex space-x-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              <Link to="/" className="hover:text-primary transition-300 font-medium">Home</Link>
              <Link to="#about" className="hover:text-primary transition-300 font-medium">About Us</Link>
              <Link to="#contact" className="hover:text-primary transition-300 font-medium">Contact</Link>
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center">
              <Input 
                placeholder="Search hotels..." 
                className={`pl-10 pr-4 py-2 rounded-full w-[240px] bg-opacity-20 backdrop-blur-sm ${isScrolled ? 'bg-gray-100' : 'bg-white bg-opacity-20 text-white placeholder:text-gray-200'}`}
              />
              <Search className={`absolute left-3 w-4 h-4 ${isScrolled ? 'text-gray-500' : 'text-white'}`} />
            </div>

            {/* Auth Buttons */}
            <div className="flex space-x-2">
              <Link to="/login">
                <Button variant="outline" className={`rounded-full ${isScrolled ? 'border-primary text-primary' : 'border-white text-white'}`}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? 'text-gray-700' : 'text-white'}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white mt-2 py-4 px-4 rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-primary py-2 transition-300">Home</Link>
              <Link to="#about" className="text-gray-700 hover:text-primary py-2 transition-300">About Us</Link>
              <Link to="#contact" className="text-gray-700 hover:text-primary py-2 transition-300">Contact</Link>
              
              <div className="relative mt-2">
                <Input placeholder="Search hotels..." className="pl-10 pr-4 py-2 rounded-full bg-gray-100" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="rounded-full border-primary text-primary w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="rounded-full bg-primary hover:bg-primary/90 w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
