
import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const SearchBar: React.FC = () => {
  const [destination, setDestination] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState<string>('2');

  const handleSearch = () => {
    console.log('Searching for:', {
      destination,
      checkInDate,
      checkOutDate,
      guests
    });
    // Implement search functionality
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 -mt-16 relative z-10">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Destination */}
        <div className="flex-1">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination / Hotel name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="destination"
              className="pl-9 h-12"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left h-12 font-normal",
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left h-12 font-normal",
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Select guests">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {guests} {parseInt(guests) === 1 ? 'Guest' : 'Guests'}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5 Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button (Full-width on mobile, aligned on desktop) */}
        <div className="md:self-end mt-4 md:mt-0">
          <Button 
            onClick={handleSearch}
            className="w-full md:w-auto h-12 px-8 bg-hotel-primary hover:bg-hotel-accent transition-colors"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
