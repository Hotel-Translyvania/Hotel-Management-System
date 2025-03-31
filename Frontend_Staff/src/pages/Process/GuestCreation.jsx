import React from "react";
import AddGuest from "../Guests/AddGuest";
import RoomList from "../Room/RoomList";
import AddBooking from "../Reservations/AddBooking";
import { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomSelection } from "@/components/Room/roomSelection";
import { roomDatabase } from "@/TestData/roomDataTest";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfileAndBooking = () => {
  const [activeButton, setActiveButton] = useState("profile");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const handleOnClick = (val) => {
    setActiveButton(val);
  };
  return (
    <div className="p-4 flex justify-center items-center size-3/5"> {/* Remember w-3/5 h-screen */}
      <div className="flex flex-col rounded-3xl flex-1 p-8 bg-white">
        {/* {selectedRoom && (
          <div>{"Selected Room: " + selectedRoom.roomNumber}</div>
        )} */}
        <div className="flex flex-row border-b w-fill text-[#718EBF] gap-12 font-serif text-lg">
          <button
            className={`items-center ${
              activeButton === "profile"
                ? "border-b-2  text-[#1814F3] border-[#1814F3]"
                : ""
            }  `}
            onClick={() => handleOnClick("profile")}
          >
            Create Profile
          </button>
          <button
            className={` items-center ${
              activeButton === "room"
                ? "border-b-2  text-[#1814F3] border-[#1814F3]"
                : ""
            }  `}
            onClick={() => handleOnClick("room")}
          >
            Select Room
          </button>
          <button
            className={` items-center ${
              activeButton === "booking"
                ? "border-b-2  text-[#1814F3] border-[#1814F3]"
                : ""
            }  `}
            onClick={() => handleOnClick("booking")}
          >
            Booking
          </button>
        </div>
        {activeButton === "profile" && <AddGuest />}
        {activeButton === "room" && (
          <div className="p-4 flex flex-col gap-4">
            <CustomTable
              data={roomDatabase}
              columns={roomSelection}
              EnableSelection={true}
              onSelectionChange={setSelectedRoom}
              pageSize={5}
              maxWidth="32"
            />
            <div className="flex justify-end">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-1/4"
                onClick={() => setActiveButton("booking")}
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {activeButton === "booking" && <AddBooking />}
      </div>
    </div>
  );
};
export default ProfileAndBooking;
