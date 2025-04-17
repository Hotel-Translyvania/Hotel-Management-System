import { useStaffStore } from "@/components/store/useStaffStore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SpinPage from "@/components/Spin/Spin";

const AssignStaff = ({ onSuccess, staff_id }) => {
  const { assignStaff } = useStaffStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useForm({
    defaultValues: {
      serviceType: "",
      roomId: "",
      description: "",
      startTime: "",
      endTime: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const OnSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      await assignStaff(data, staff_id);
      onSuccess();
    } catch (error) {
      console.error("Error assigning staff:", error);
      setError("Failed to assign staff. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Assigning...</div>
        <SpinPage />
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="font-semibold text-xl">Assign Staff</h1>
      </div>
      <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Service Type</label>
          <select
            id="serviceType"
            {...register("serviceType", { required: true })}
            className="border p-2  border-gray-500 rounded-lg"
          >
            <option value="">Select Service Type</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Room Service">Room Service</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Room No.</label>
          <input
            id="roomId"
            placeholder="Room No."
            {...register("roomId", { required: true })}
            className="border p-2  border-gray-500 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Description</label>
          <textarea
            id="description"
            {...form.register("description")}
            placeholder="Service Description"
            className="border p-2  border-gray-500 rounded-lg"
            style={{ resize: "none" }}
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Start Time</label>
            <input
              type="datetime-local"
              {...register("startTime", { required: true })}
              className="border p-2  border-gray-500 rounded-lg "
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">End Time</label>
            <input
              type="datetime-local"
              {...register("endTime", { required: true })}
              className="border p-2  border-gray-500 rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-2xl"
        >
          Assign Staff
        </button>
      </form>
    </div>
  );
};

export default AssignStaff;
