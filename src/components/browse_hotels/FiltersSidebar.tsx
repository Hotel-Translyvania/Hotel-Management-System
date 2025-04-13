import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Wifi, Car, Waves, Dumbbell, X } from 'lucide-react';

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FiltersState) => void;
  onClearFilters: () => void;
}

interface FiltersState {
  priceRange: number[];
  starRating: number[];
  roomType: string[];
  amenities: { [key: string]: boolean };
  sortBy: string;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ isOpen, onClose, onApplyFilters, onClearFilters }) => {
  const [filters, setFilters] = React.useState<FiltersState>({
    priceRange: [0, 500],
    starRating: [],
    roomType: [],
    amenities: {
      wifi: false,
      pool: false,
      parking: false,
      gym: false,
    },
    sortBy: 'popularity'
  });

  // Update filters and apply immediately
  const updateFilters = (newFilters: Partial<FiltersState>) => {
    const updatedFilters = { ...filters, ...newFilters };
  
    // Clean amenities to include only selected (true) values when applying filters
    const cleanedAmenities = Object.fromEntries(
      Object.entries(updatedFilters.amenities).filter(([_, value]) => value)
    );
  
    const cleanedFilters = {
      ...updatedFilters,
      amenities: cleanedAmenities
    };
  
    setFilters(updatedFilters); // Still track full internal state
    onApplyFilters(cleanedFilters); // Only apply selected values
  };  

  // Handle Price Range Change
  const handlePriceRangeChange = (value: number[]) => {
    updateFilters({ priceRange: value });
  };  

  // Handle Checkbox Change
  const handleCheckboxChange = (amenity: string) => {
    const updatedAmenities = {
      ...filters.amenities,
      [amenity]: !filters.amenities[amenity],
    };
  
    updateFilters({ amenities: updatedAmenities });
  };

  // Handle Star Rating Change
  const handleStarRatingChange = (rating: number) => {
    const updatedStarRating = filters.starRating.includes(rating)
      ? filters.starRating.filter(star => star !== rating)
      : [...filters.starRating, rating];
    updateFilters({ starRating: updatedStarRating });
  };

  // Handle Room Type Change
  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const updatedRoomType = filters.roomType.includes(type)
      ? filters.roomType.filter(room => room !== type)
      : [...filters.roomType, type];
    updateFilters({ roomType: updatedRoomType });
  };

  // Handle Sort By Change
  const handleSortByChange = (value: string) => {
    updateFilters({ sortBy: value });
  };

  // Handle Clear Filters
  const handleClearFilters = () => {
    const defaultFilters = {
      priceRange: [0, 500],
      starRating: [],
      roomType: [],
      amenities: {
        wifi: false,
        pool: false,
        parking: false,
        gym: false,
      },
      sortBy: 'popularity'
    };
    setFilters(defaultFilters);
    onClearFilters();
    onApplyFilters(defaultFilters);
  };

  return (
    <div
      className={`
        fixed md:static top-0 left-0 w-full md:w-72 h-full md:h-auto
        overflow-y-auto bg-white z-50 shadow-lg md:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Price Range</h3>
          <Slider
            defaultValue={filters.priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={handlePriceRangeChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Star Rating */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Star Rating</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.starRating.includes(rating)}
                  onCheckedChange={() => handleStarRatingChange(rating)}
                />
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
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.roomType.includes(type)}
                  onCheckedChange={() => {
                    const updatedRoomType = filters.roomType.includes(type)
                      ? filters.roomType.filter(room => room !== type)
                      : [...filters.roomType, type];
                    updateFilters({ roomType: updatedRoomType });
                  }}
                />
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
          {['wifi', 'pool', 'parking', 'gym'].map((amenity) => (
            <div key={amenity} className="flex items-center">
              <Checkbox
                id={amenity}
                checked={filters.amenities[amenity]}
                onCheckedChange={() => handleCheckboxChange(amenity)}
              />
              <Label htmlFor={amenity} className="ml-2">
                {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
              </Label>
            </div>
          ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Sort By */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Sort By</h3>
          <RadioGroup value={filters.sortBy} onValueChange={handleSortByChange}>
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

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;