
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface CurrentBookingCardProps {
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: "Confirmed" | "Checked-in" | "Upcoming";
  hotelName: string;
  bookingId: string;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getBadgeColor = () => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Checked-in':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`${getBadgeColor()} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {status}
    </span>
  );
};

const CurrentBookingCard: React.FC<CurrentBookingCardProps> = ({
  roomNumber,
  roomType,
  checkIn,
  checkOut,
  status,
  hotelName,
  bookingId
}) => {
  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-hotel-primary text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{hotelName}</h3>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-hotel-secondary p-3 rounded-lg">
            <Calendar className="h-6 w-6 text-hotel-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">{roomType}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Room</p>
                <p className="text-sm font-medium">{roomNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-medium">{checkIn} - {checkOut}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <div className="w-full flex justify-end">
          <Button
            variant="outline"
            className="bg-white text-hotel-primary border-hotel-primary hover:bg-hotel-primary hover:text-white"
            asChild
          >
            <Link to={`/bookings/${bookingId}`}>View Booking Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CurrentBookingCard;
