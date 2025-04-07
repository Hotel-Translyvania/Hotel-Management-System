import React from 'react';
const RoomCard = ({ room, onBookNow }) => {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    occupied: 'bg-red-100 text-red-800',
    'not cleaned': 'bg-yellow-100 text-yellow-800'
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={room.image || 'https://via.placeholder.com/300x200'} 
          alt={room.roomType} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{room.roomType}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[room.roomStatus.toLowerCase()] || 'bg-gray-100'}`}>
            {room.roomStatus}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1">Room #{room.roomNum}</p>
        <p className="text-gray-600 text-sm">Bed: {room.numberOfBed || room.Bed} {room.bedType || ''}</p>
        <p className="text-gray-600 text-sm">Max Occupancy: {room.max_occupancy}</p>
        <p className="text-gray-600 text-sm mt-2">{room.room_descripiton}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${room.pricePerNight || '--'}/night</span>
          <button 
            onClick={() => onBookNow(room)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            disabled={room.roomStatus.toLowerCase() !== 'available'}
          >
            {room.roomStatus.toLowerCase() === 'available' ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default RoomCard;