import React from "react";
import { useForm } from "react-hook-form";

const AssignStaff = ({ onSuccess, staff_id }) => {
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
  const OnSubmit = (data) => {
    console.log("Form Data: ", data, staff_id);
    onSuccess();
  };
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
