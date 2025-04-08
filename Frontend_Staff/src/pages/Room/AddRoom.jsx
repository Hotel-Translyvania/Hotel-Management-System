import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const AddRoom = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      roomNumber: "",
      roomType: "Standard",
      description: "",
      bedType: "Single",
      size: "",
      status: "Available",
      image: null,
      price: "",
      maxOccupancy: "",
      amenities: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [room, setRoom] = useState([]);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading rooms...</div>
        <SpinPage />
      </div>
    );
  }

  const picture = watch("image");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setValue("image", file);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!data.image) {
        setError("Please upload a room image");
        return;
      }
      const amenitiesArray = data.amenities
        .split(",")
        .filter((item) => item.trim() !== "")
        .map((item) => ({ amenityName: item.trim() }));

      const formData = new FormData();
      formData.append("type", data.roomType);
      formData.append("price", String(data.price));
      formData.append("occupancy", String(data.maxOccupancy));
      formData.append("bedType", data.bedType);
      formData.append("description", data.description);
      formData.append("size", String(data.size));
      formData.append("roomNumber", data.roomNumber);
      formData.append("amenities", JSON.stringify(amenitiesArray));
      formData.append("image", data.image);

      setIsLoading(true);

      const response = await api.post("/hms/hotels/1/rooms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Room added successfully:", response.data);
      onSuccess();
      reset();
    } catch (error) {
      console.error("Error adding room:", error);
      setError("Failed to add room");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading reservations...</div>
        <SpinPage />
      </div>
    );
  }
  return (
    <div className="space-y-4 rounded-lg p-2 w-full">
      <h2 className="text-2xl font-semibold text-center">Add New Room</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-x-5">
          <div className="w-full md:w-48 p-2 bg-white rounded-lg">
            {picture ? (
              <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={URL.createObjectURL(picture)}
                  alt={picture.name}
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
                <p className="text-gray-700 text-sm font-medium mb-2">
                  Add Room Image
                </p>
                <div className="relative w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V5h12v14zm-4-2h2v-2h-2v2z" />
                  </svg>
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
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div>
              <label
                htmlFor="roomNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Room number"
                {...register("roomNumber", {
                  required: "Room number is required",
                })}
              />
              {errors.roomNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.roomNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="roomType"
                className="block text-sm font-medium text-gray-700"
              >
                Room Type
              </label>
              <select
                id="roomType"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("roomType")}
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

            <div>
              <label
                htmlFor="bedType"
                className="block text-sm font-medium text-gray-700"
              >
                Bed Type
              </label>
              <select
                id="bedType"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("bedType")}
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Room Description
              </label>
              <textarea
                id="description"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Room description"
                style={{ resize: "none" }}
                rows="5"
                {...register("description", {
                  required: "Room description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size (sq ft)
              </label>
              <input
                type="number"
                id="size"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="size (sq ft)"
                min="0"
                {...register("size", { required: "Size is required" })}
              />
              {errors.size && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.size.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("status")}
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price per Night ($)
              </label>
              <input
                type="number"
                id="price"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Price per Night ($)"
                min="0"
                step="0.1"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
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
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Maximum occupancy"
                min="1"
                {...register("maxOccupancy", {
                  required: "Max occupancy is required",
                })}
              />
              {errors.maxOccupancy && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maxOccupancy.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="amenities"
                className="block text-sm font-medium text-gray-700"
              >
                Amenities
              </label>
              <textarea
                type="text"
                id="amenities"
                row="2"
                style={{ resize: "none" }}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Wi-Fi, TV and etc"
                {...register("amenities", {
                  required: "Amenities are required",
                })}
              />
              {errors.amenities && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.amenities.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 w-3/4 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Add Room
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddRoom;
