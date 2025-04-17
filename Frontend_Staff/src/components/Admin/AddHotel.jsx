import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import SpinPage from "../Spin/Spin";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const AddHotel = ({ onSuccess }) => {
  const form = useForm({
    defaultValues: {
      hotelName: "",
      location: "",
      description: "",
      picture: null,
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [hotelImage, setHotelImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    if (!hotelImage) {
      alert("Please upload a hotel image.");
      return;
    }

    setIsLoading(true);
    setError(null);

    data.picture = hotelImage;

    try {
      const formData = new FormData();
      formData.append("name", data.hotelName);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("image", data.picture);

      // localhost:3000/api/v1/hotels

      const response = await api.post("/hotels", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Hotel added successfully:", response.data);

      onSuccess()
    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message || "An error occurred while adding the hotel");
      alert(error.message || "Failed to add hotel");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Adding hotel...</div>
        <SpinPage />
      </div>
    );
  }

  const handleHotelImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setHotelImage(file);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center font-serif p-4 gap-3">
      <h2 className="text-2xl font-semibold">Add Hotel</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-10 text-sm w-full"
      >
        <div className="relative">
          {hotelImage ? (
            <img
              src={URL.createObjectURL(hotelImage)}
              alt="Hotel"
              className="size-32 rounded-full object-cover"
            />
          ) : (
            <div className="rounded-full size-32 border items-center justify-center flex bg-gray-100">
              Choose Image
            </div>
          )}
          <div className="bg-[#1814F3] h-8 w-8 flex justify-center items-center rounded-full absolute right-0 top-20 hover:brightness-200 transition duration-200">
            <label htmlFor="fileInput" className="cursor-pointer">
              <img src="/pencil.svg" />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleHotelImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-row gap-6 w-3/4 justify-between">
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323]">Hotel Name</label>
              <input
                id="hotelName"
                {...register("hotelName", {
                  required: {
                    value: true,
                    message: "Hotel Name is required",
                  },
                })}
                placeholder="Hotel Name"
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323]">Location</label>
              <input
                id="location"
                {...register("location", {
                  required: {
                    value: true,
                    message: "Location is required",
                  },
                })}
                placeholder="City, Country"
                className="rounded-xl p-3 border w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323]">Description</label>
              <textarea
                id="description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
                placeholder="Brief description of the hotel"
                className="rounded-xl p-3 border w-full h-32"
                rows={4}
                style={{
                  resize: "none",
                }}
              />
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="px-10 py-3 text-white rounded-xl bg-[#1814F3]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
