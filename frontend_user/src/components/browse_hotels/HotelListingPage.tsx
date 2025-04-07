import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import SearchBar from './SearchBar';
import FiltersSidebar from './FiltersSidebar';
import HotelCard from './HotelCard';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import { hotels as hotelData } from '@/data/hotels';
import { Button } from '@/components/ui/button';

const HotelListingPage: React.FC = () => {
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotels] = useState(hotelData);
  const [showEmptyState] = useState(false);
  
  const hotelsPerPage = 8;
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);
  
  // Get current hotels
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  
  const handleClearFilters = () => {
    // Implement clear filters functionality
    console.log('Filters cleared');
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Banner */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)`
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl">
            Explore our selection of top-rated hotels for your next adventure
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <SearchBar />
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button 
              onClick={() => setFilterSidebarOpen(true)}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter Results
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <div className="md:w-72 flex-shrink-0">
            <FiltersSidebar 
              isOpen={filterSidebarOpen} 
              onClose={() => setFilterSidebarOpen(false)} 
            />
          </div>
          
          {/* Hotel Listings */}
          <div className="flex-1">
            {showEmptyState ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {hotels.length} hotels found
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelListingPage;
