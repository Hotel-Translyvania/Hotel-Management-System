
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Wifi, Car, Waves, Dumbbell } from 'lucide-react';

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ isOpen, onClose }) => {
  const [priceRange, setPriceRange] = React.useState<number[]>([50, 500]);
  
  return (
    <div className={`
      fixed md:static top-0 left-0 w-full md:w-72 h-screen md:h-auto
      overflow-y-auto bg-white z-40 shadow-lg md:shadow-none
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="md:hidden">
            Close
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Price Range</h3>
          <Slider 
            defaultValue={priceRange} 
            min={0} 
            max={1000} 
            step={10}
            onValueChange={setPriceRange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Star Rating */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Star Rating</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="ml-2 flex">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Room Type */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Room Type</h3>
          <div className="space-y-3">
            {['Single', 'Double', 'Suite', 'Family'].map((type) => (
              <div key={type} className="flex items-center">
                <Checkbox id={`type-${type}`} />
                <Label htmlFor={`type-${type}`} className="ml-2">{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Amenities</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Checkbox id="wifi" />
              <Label htmlFor="wifi" className="ml-2 flex items-center">
                <Wifi className="h-4 w-4 mr-1" /> Wi-Fi
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="pool" />
              <Label htmlFor="pool" className="ml-2 flex items-center">
                <Waves className="h-4 w-4 mr-1" /> Pool
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="parking" />
              <Label htmlFor="parking" className="ml-2 flex items-center">
                <Car className="h-4 w-4 mr-1" /> Parking
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="gym" />
              <Label htmlFor="gym" className="ml-2 flex items-center">
                <Dumbbell className="h-4 w-4 mr-1" /> Gym
              </Label>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Sort By */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Sort By</h3>
          <RadioGroup defaultValue="popularity">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popularity" id="popularity" />
              <Label htmlFor="popularity">Popularity</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="price-low" id="price-low" />
              <Label htmlFor="price-low">Price (Low to High)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="price-high" id="price-high" />
              <Label htmlFor="price-high">Price (High to Low)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="rating" id="rating" />
              <Label htmlFor="rating">Rating</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          className="w-full mt-6"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default FiltersSidebar;
