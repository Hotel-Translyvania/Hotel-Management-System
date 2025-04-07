import { Button } from "@/components/ui/button";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { roomDatabase } from "@/TestData/roomDataTest";
import { CustomTable } from "@/components/Table/Table";
import { roomSelection } from "@/components/Room/roomSelection";
import { ArrowDownCircle } from "lucide-react";

const EditBooking = ({ reservationData, onSuccess }) => {
  const form = useForm({
    defaultValues: {
      checkIn: reservationData.checkIn,
      checkOut: reservationData.checkOut,
      roomNumber: reservationData.roomNum,
      status: reservationData.bookingStatus,
    },
  });
  const [showTable, setShowTable] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (reservationData) {
      reset({
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut,
        status: reservationData.bookingStatus,
      });
    }
  }, [reservationData, reset]);
  
  const onSubmit = (data) => {
    data.roomNumber = selectedRoom?.roomNum || reservationData.roomNum;
    console.log(data, selectedRoom);
    onSuccess();
  };

  return (
    <div className="flex items-center flex-col justify-center font-serif gap-3">
      <h2 className="text-2xl font-semibold">Edit Reservation</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-row gap-6 w-full  items-start">
          <div className="flex flex-col  gap-2 w-full">
            <label className="text-[#232323] ">Check-In Date</label>
            <input
              type="date"
              id="checkIn"
              {...register("checkIn", {
                required: {
                  value: true,
                  message: "Check-In Date is required",
                },
              })}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                errors.checkIn ? "border-red-500" : ""
              }`}
            />
            {errors.checkIn && (
              <span className="text-red-500">{errors.checkIn.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#232323] ">Check-Out Date</label>
            <input
              type="date"
              id="checkOut"
              {...register("checkOut", {
                required: {
                  value: true,
                  message: "Check-Out Date is required",
                },
              })}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                errors.checkOut ? "border-red-500" : ""
              }`}
            />
            {errors.checkOut && (
              <span className="text-red-500">{errors.checkOut.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-20 items-center">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2 ">
              <label className="text-[#232323] ">Room Number</label>
              <input
                type="text"
                id="roomNumber"
                {...register("roomNumber")}
                disabled={true}
                value={selectedRoom?.roomNumber || reservationData.roomNum}
                className={`border border-gray-300 rounded-md p-2 w-full ${
                  errors.roomNumber ? "border-red-500" : ""
                }`}
              />
            </div>
            {!showTable && (
              <div className="items-end flex">
                <Button
                  variant="default"
                  className="bg-blue-500 text-white rounded-lg p-5 hover:bg-blue-600"
                  onClick={() => setShowTable(true)}
                >
                  Select New Room
                  <ArrowDownCircle className="ml-2" size={20} />
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#232323] ">Status</label>
            <select
              {...register("status", {
                required: {
                  value: true,
                  message: "Status is required",
                },
              })}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                errors.status ? "border-red-500" : ""
              }`}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && (
              <span className="text-red-500">{errors.status.message}</span>
            )}
          </div>
        </div>
        {showTable && (
          <div className="">
            <CustomTable
              columns={roomSelection}
              data={roomDatabase}
              onSelectionChange={setSelectedRoom}
              EnableSelection={true}
              pageSize={4}
            />
          </div>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-700 text-white rounded-lg p-2 hover:bg-blue-800"
          >
            Update Reservation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBooking;
