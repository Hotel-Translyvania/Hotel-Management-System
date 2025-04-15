import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const AddManager = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      address: "",
      phone: "",
      hotel: "",
      department: "",
      registeredAt: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    console.log(data);
    if (!profileImage) {
      alert("Please upload a profile image.");
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("dateOfBirth", data.dob);
      formData.append("address", data.address);
      formData.append("phoneNumber", data.phone);
      formData.append("hotelId", data.hotel);
      formData.append("registrationDate", data.registeredAt);
      formData.append("profilePic", profileImage);
      formData.append("password", "");

      const response = await api.post("/manager", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Manager added successfully:", response.data);
      alert("Manager added successfully!");
      onSuccess();
    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message || "An error occurred while adding the manager");
    } finally {
      setIsLoading(false);
    }

  };
  const [profileImage, setProfileImage] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setProfileImage(file);
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Adding manager...</div>
        <SpinPage />
      </div>
    );
  }
  return (
    <div className="flex items-center flex-col justify-center font-serif p-4 gap-3">
      <h2 className="text-2xl font-semibold">Add Manager</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-10 text-sm w-full"
      >
        <div className="relative">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="size-32 rounded-full"
            />
          ) : (
            <img src="/placePP.png" className="size-32" />
          )}
          <div className="bg-[#1814F3] h-8 w-8 flex justify-center items-center rounded-full absolute right-0 top-20 hover:brightness-200 transition duration-200">
            <label htmlFor="fileInput" className="cursor-pointer">
              <img src="/pencil.svg" />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-row gap-6 w-3/4 justify-between">
          <div className="flex flex-col gap-3 w-1/2 ">
            <div className="flex flex-col items-start justify-center gap-2 ">
              <label className="text-[#232323] ">First Name</label>
              <input
                id="firstName"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "First Name is required",
                  },
                })}
                placeholder="First Name"
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Last Name</label>
              <input
                id="lastName"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Last Name is required",
                  },
                })}
                placeholder="Last Name"
                className="rounded-xl p-3 border w-full"
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Email</label>
              <input
                placeholder="Email"
                type="email"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Date of Birth</label>
              <input
                type="date"
                id="dob"
                {...register("dob", {
                  required: {
                    value: true,
                    message: "Date of Birth is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Address is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                id="phone"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                  pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message: "Invalid Phone Number",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Hotel Id</label>
              <input
                type="text"
                placeholder="Hotel"
                id="hotel"
                {...register("hotel", {
                  required: {
                    value: true,
                    message: "Hotel is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Registered At</label>
              <input
                type="date"
                id="registeredAt"
                {...register("registeredAt", {
                  required: {
                    value: true,
                    message: "Registration Date is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex w-full justify-end ">
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

export default AddManager;
