import React, { useState } from "react";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomName: "",
    roomType: "Standard",
    description: "",
    bedType: "Single",
    size: "",
    status: "Available",
    picture: null,
    price: "",
    maxOccupancy: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    console.log("Room Data Submitted:", Object.fromEntries(data));
    setFormData({
      roomNumber: "",
      roomName: "",
      roomType: "Standard",
      description: "",
      bedType: "Single",
      size: "",
      status: "Available",
      picture: null,
      price: "",
      maxOccupancy: "",
    });
  };

  return (
    <div className=" space-y-4 rounded-lg p-8 w-3/5">
      <h2 className="text-2xl font-semibold text-center">Add New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-x-5">
          <div className="w-full md:w-48 max-w-md p-6 bg-white rounded-lg ">
            {file ? (
              <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 cursor-pointer flex flex-col items-center justify-center gap-2 h-48 relative"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                {/* Add Room Image Text */}
                <p className="text-gray-700 text-sm font-medium mb-2">
                  Add Room Image
                </p>
                {/* Main circular area with door icon */}
                <div className="relative w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V5h12v14zm-4-2h2v-2h-2v2z" />
                  </svg>
                  {/* Smaller circle with pencil icon */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-5">
            <div className="mb-5">
              <label
                htmlFor="roomNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Room number"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="roomName"
                className="block text-sm font-medium text-gray-700"
              >
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                name="roomName"
                value={formData.roomName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Room name"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="roomType"
                className="block text-sm font-medium text-gray-700"
              >
                Room Type
              </label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Standard">Standard</option>
                <option value="Accessible">Accessible</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Family">Family</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Room Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Room description"
                rows="5"
              />
            </div>
          </div>

          <div className="flex-1 space-y-5">
            <div className="mb-5">
              <label
                htmlFor="bedType"
                className="block text-sm font-medium text-gray-700"
              >
                Bed Type
              </label>
              <select
                id="bedType"
                name="bedType"
                value={formData.bedType}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size (sq ft)
              </label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="size (sq ft)"
                min="0"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price per Night ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Price per Night ($)"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="maxOccupancy"
                className="block text-sm font-medium text-gray-700"
              >
                Max Occupancy
              </label>
              <input
                type="number"
                id="maxOccupancy"
                name="maxOccupancy"
                value={formData.maxOccupancy}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Maximum occupancy"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
