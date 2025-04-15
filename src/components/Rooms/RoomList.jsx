import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import Filter from '../ui/filter';

const RoomList = ({ rooms, onBookNow }) => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filters, setFilters] = useState({
    roomNumber: '',
    roomType: '',
    bedType: '',
    floor: '',
    view: '',
    smoking: ''
  });

  // Initialize filteredRooms when rooms data is available
  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setFilteredRooms(rooms);
    }
  }, [rooms]);

  // Apply filters when they change
  useEffect(() => {
    if (!rooms || rooms.length === 0) return;

    let result = [...rooms];
    
    if (filters.roomNumber) {
      result = result.filter(room => room.roomNum.toString().includes(filters.roomNumber));
    }
    if (filters.roomType) {
      result = result.filter(room => room.roomType.toLowerCase().includes(filters.roomType.toLowerCase()));
    }
    if (filters.bedType) {
      result = result.filter(room => room.bedType?.toLowerCase().includes(filters.bedType.toLowerCase()));
    }
    if (filters.floor) {
      result = result.filter(room => Math.floor(room.roomNum / 100).toString() === filters.floor);
    }
    
    setFilteredRooms(result);
  }, [filters, rooms]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>
      <Filter filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <RoomCard key={room.roomId} room={room} onBookNow={onBookNow} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">
              {rooms.length === 0 ? 'Loading rooms...' : 'No rooms match your filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RoomList;