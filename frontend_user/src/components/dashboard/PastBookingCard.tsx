
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PastBookingCardProps {
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: "Completed" | "Cancelled";
  bookingId: string;
  imageUrl: string;
}

const PastBookingCard: React.FC<PastBookingCardProps> = ({
  hotelName,
  roomType,
  checkIn,
  checkOut,
  status,
  bookingId,
  imageUrl
}) => {
  const isCompleted = status === "Completed";

  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${hotelName} - ${roomType}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          isCompleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-gray-900">{hotelName}</h3>
        <p className="text-sm text-gray-600 mt-1">{roomType}</p>
        <div className="mt-2 text-xs text-gray-500">
          {checkIn} - {checkOut}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 p-4">
        {isCompleted && (
          <Button 
            variant="outline" 
            className="w-full border-hotel-primary text-hotel-primary hover:bg-hotel-primary hover:text-white transition-colors"
          >
            Rebook This Room
          </Button>
        )}
        {!isCompleted && (
          <Button 
            variant="outline" 
            className="w-full text-gray-500 border-gray-300 hover:bg-gray-50"
            disabled
          >
            Booking Cancelled
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PastBookingCard;
