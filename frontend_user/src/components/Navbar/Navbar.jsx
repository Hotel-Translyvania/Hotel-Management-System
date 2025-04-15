import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality as needed
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Home Link */}
        <Link 
          to="/" 
          className="text-xl font-bold text-blue-600 hover:text-blue-800"
        >
          EzyStay
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hotels, destinations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/user_login"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/user_login'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            DashBoard
          </Link>
          <Link
            to="/browse_hotels"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/browse_hotels'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Hotels
          </Link>
          <Link
            to="/rooms"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/rooms'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Rooms
          </Link>
          <Link
            to="/bookings"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/bookings'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Booking
          </Link>
          <Link
            to="/billing"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/billing'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Billing
          </Link>
          <Link
            to="/profile"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/profile'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Profile
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;