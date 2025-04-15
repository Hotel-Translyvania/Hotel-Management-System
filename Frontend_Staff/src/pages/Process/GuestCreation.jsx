import React, { useState } from "react";
import AddGuest from "../Guests/AddGuest";
import RoomSelection from "../Room/RoomSelection";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";
import { useGuestStore } from "@/components/store/useGuestStore";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const UserProfileAndBooking = ({ onSuccess }) => {
  const { addGuest } = useGuestStore();
  const [activeButton, setActiveButton] = useState("profile");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState([]);

  const handleGuestFormSubmit = () => {
    setIsLoading(true);

    const fetchRoom = async () => {
      try {
        const response = await api.get(
          "hotels/1/rooms?check_in=2025-01-11&check_out=2025-12-13"
        );
        const data = response.data.rooms.data;
        const formattedRoom = data.map((room) => ({
          id: room.id,
          roomNumber: room.roomNumber,
          roomType: room.type,
          price: room.price,
          status: room.status,
          maxOccupancy: room.occupancy,
          bedType: room.bedType,
          amenities: room.amenities,
        }));

        if (formattedRoom.length !== 0) {
          setRoom(formattedRoom);
          setActiveButton("book");
        }
        setError(null);

      } catch (error) {
        console.error("Error fetching room:", error);
        setError("Failed to load room");
        setRoom([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  };

  const [guestFormData, setGuestFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    idType: "",
    idNumber: "",
  });

  const [bookingFormData, setBookingFormData] = useState({
    checkIn: "",
    checkOut: "",
  });

  const handleRoomSelection = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const book = async () => {
      try {
        await addGuest(guestFormData, selectedRoom, bookingFormData);
        onSuccess();
      } catch (error) {
        console.error("Error booking room:", error);
        setError("Failed to book room");
      } finally {
        setIsLoading(false);
      }
    };

    book();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 bg-white w-full h-full ">
      <div className="flex flex-row border-b w-fill text-[#718EBF] gap-12 font-serif text-lg">
        <button
          className={`items-center ${
            activeButton === "profile"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("profile")}
        >
          Create Profile
        </button>
        <button
          className={`items-center ${
            activeButton === "book"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
        >
          Select Room
        </button>
      </div>

      {activeButton === "profile" && (
        <AddGuest
          formData={guestFormData}
          setFormData={setGuestFormData}
          onSubmit={handleGuestFormSubmit}
          setBookingFormData={setBookingFormData}
          bookingFormData={bookingFormData}
        />
      )}

      {activeButton === "book" && (
        <RoomSelection
          setSelectedRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
          handleRoomSelection={handleRoomSelection}
          room={room}
        />
      )}
    </div>
  );
};

export default UserProfileAndBooking;
