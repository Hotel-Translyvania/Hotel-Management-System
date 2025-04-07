import { CustomTable } from "@/components/Table/Table";
import React from "react";
import { guestSelection } from "@/components/Guests/GuestSelection";
// import { guestDatabase } from "@/TestData/dataTest";
import { Button } from "@/components/ui/button";

const SelectGuest = ({
  setSelectedGuest,
  bookingFormData,
  handleBookingSubmit,
  handleBookingChange,
  selectedGuest,
  guest

}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGuest) {
      handleBookingSubmit(e);
    } else {
      alert("Please select a guest before proceeding.");
    }
  };
  return (
    <div className="p-6 flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Check-In Date
            </label>
            <input
              type="date"
              name="checkIn"
              value={bookingFormData.checkIn}
              onChange={handleBookingChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Check-Out Date
            </label>
            <input
              type="date"
              name="checkOut"
              value={bookingFormData.checkOut}
              onChange={handleBookingChange}
              required
              min={bookingFormData.checkIn}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-0.5 bg-gray-200 w-2/5"></div>
          <div>Select Guest</div>
          <div className="h-0.5 bg-gray-200 w-2/5"></div>
        </div>

        <CustomTable
          data={guest}
          columns={guestSelection}
          EnableSelection={true}
          onSelectionChange={setSelectedGuest}
          pageSize={5}
          maxWidth="32"
        />
        <div className="flex justify-end">
          <Button
            variant="default"
            className="bg-blue-700 w-1/4 hover:bg-blue-600"
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SelectGuest;
