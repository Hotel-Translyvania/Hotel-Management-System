import React from 'react';

const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      roomNumber: '',
      roomType: '',
      bedType: '',
      floor: '',
      view: '',
      smoking: ''
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Filter Rooms</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={filters.roomNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
            placeholder="Room #"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
          <select
            name="roomType"
            value={filters.roomType}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">All Types</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bed Type</label>
          <select
            name="bedType"
            value={filters.bedType}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">All Types</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="King">King</option>
            <option value="Queen">Queen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
          <select
            name="floor"
            value={filters.floor}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">All Floors</option>
            <option value="1">1st Floor</option>
            <option value="2">2nd Floor</option>
            <option value="3">3rd Floor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
          <select
            name="view"
            value={filters.view}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">Any View</option>
            <option value="Garden">Garden View</option>
            <option value="Pool">Pool View</option>
            <option value="Sea">Sea View</option>
            <option value="City">City View</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Smoking</label>
          <select
            name="smoking"
            value={filters.smoking}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">Any</option>
            <option value="yes">Smoking</option>
            <option value="no">Non-Smoking</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;