
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HotelCard = ({ image, name, location, rating, price, description, discount }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative overflow-hidden h-48 sm:h-64">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount && (
          <Badge className="absolute top-3 right-3 bg-primary text-white">
            {discount}% OFF
          </Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="fill-amber-500 h-4 w-4" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mt-1 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <span className="text-lg font-bold text-primary">${price}</span>
            <span className="text-muted-foreground text-sm"> / night</span>
          </div>
          <button className="text-primary font-medium text-sm hover:underline">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
