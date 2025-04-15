
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    rating: number;
    location: string;
    price: number;
    description: string;
    image: string;
    amenities: string[];
  }
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold text-gray-800">
          ${hotel.price}/night
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{hotel.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{hotel.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hotel.description}
        </p>
        
        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.map((amenity, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="text-sm">View Details</Button>
          <Button className="text-sm bg-hotel-primary hover:bg-hotel-accent">Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
