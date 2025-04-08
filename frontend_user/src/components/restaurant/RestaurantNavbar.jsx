import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function RestaurantNavbar({ cartItemCount, onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-16 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span className="sr-only">Toggle menu</span>
          </button>

          <Link to="/restaurant" className="flex items-center gap-2">
            <span className="font-bold text-xl hidden md:inline-flex">Hotel Restaurant</span>
            <span className="font-bold text-xl md:hidden">HR</span>
          </Link>
        </div>

        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 md:right-auto bg-white md:bg-transparent flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-0 border-b md:border-0`}>
          <Link to="/restaurant/Menu" className={`text-sm font-medium transition-colors ${
            location.pathname === '/restaurant' ? 'text-blue-600' : 'hover:text-blue-600'

          }`}>
            Menu
          </Link>
          <Link to="/restaurant/order" className={`text-sm font-medium transition-colors ${
            location.pathname === '/restaurant/order' ? 'text-blue-600' : 'hover:text-blue-600'
          }`}>
            Place Order
          </Link>
          <Link to="/restaurant/history" className={`text-sm font-medium transition-colors ${
            location.pathname === '/restaurant/history' ? 'text-blue-600' : 'hover:text-blue-600'
          }`}>
            Order History
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button className="relative p-2" onClick={onCartClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}