
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  amenities: string[];
  id: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  description,
  price,
  imageUrl,
  amenities,
  id
}) => {
  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {price > 300 && (
          <div className="absolute top-2 left-2 bg-hotel-primary text-white px-2 py-1 text-xs font-medium rounded">
            Premium
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <div className="text-hotel-primary font-bold">${price}<span className="text-xs text-gray-500">/night</span></div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1">
          {amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
              +{amenities.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 p-4">
        <Button 
          className="w-full bg-hotel-primary text-white hover:bg-hotel-primary-hover"
          asChild
        >
          <a href={`/rooms/${id}`}>View Details</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
