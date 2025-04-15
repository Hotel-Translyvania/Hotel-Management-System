import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

const SidebarSearch = ({ isOpen, placeholder }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="p-4 border-b">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="text-gray-400" />
        </div>
        {isOpen ? (
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : (
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <HiSearch size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarSearch;