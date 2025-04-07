import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const HotelCard = ({ hotel, onEditClick }) => {
  console.log(hotel)
  return (
    <div className="flex flex-col w-[245px] gap-2 rounded-lg overflow-hidden shadow-sm">
      <div className="shrink-0 overflow-hidden h-40">
        <img
          src={hotel.image}
          alt={hotel.hotelName}
          className="object-cover size-full"
        />
      </div>

      <div className="p-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-serif font-bold text-blue-500 ">
              {hotel.hotelName}
            </p>
            <div className="flex flex-row gap-1 items-center">
              <MapPin className="text-blue-400 size-3 " />
              <p className=" text-indigo-500 text-sm font-semibold">{hotel.location}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm hover:bg-gray-100"
            onClick={onEditClick}
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className=" text-gray-600 truncated">{hotel.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
