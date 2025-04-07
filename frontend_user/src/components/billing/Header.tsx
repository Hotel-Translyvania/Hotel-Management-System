
import { useState } from 'react';
import { Bell, HelpCircle, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg 
                className="h-8 w-auto text-blue-600"
                viewBox="0 0 24 24" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.1,2H2.9C2.4,2,2,2.4,2,2.9v18.3C2,21.6,2.4,22,2.9,22h18.3c0.5,0,0.9-0.4,0.9-0.9V2.9C22,2.4,21.6,2,21.1,2z M18,12 c-3.3,0-6,2.7-6,6v1H6v-8h12V12z M18,5v3H6V5H18z"/>
                <circle cx="17" cy="17" r="1"/>
              </svg>
              <span className="ml-2 text-lg font-semibold text-gray-900">Premium Hotel</span>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-1 pt-1 inline-flex items-center text-sm font-medium">
                Billing
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent px-1 pt-1 inline-flex items-center text-sm font-medium">
                Reservations
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent px-1 pt-1 inline-flex items-center text-sm font-medium">
                Services
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent px-1 pt-1 inline-flex items-center text-sm font-medium">
                Support
              </a>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
              <HelpCircle className="h-6 w-6" />
            </button>
            <button className="flex items-center space-x-2 p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
              <User className="h-6 w-6" />
              <span className="text-sm font-medium text-gray-700">Guest Portal</span>
            </button>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50"
            >
              Billing
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Reservations
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Support
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Guest Portal</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <Bell className="h-5 w-5 mr-2 text-gray-400" />
                Notifications
              </button>
              <button className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <HelpCircle className="h-5 w-5 mr-2 text-gray-400" />
                Help
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;