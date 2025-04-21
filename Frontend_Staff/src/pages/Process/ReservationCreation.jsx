import React, { useState, useEffect, use } from "react";
import RoomSelection from "../Room/RoomSelection";
import SelectGuest from "../Guests/SelectGuest";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";
import { useReservationStore } from "@/components/store/useReservationStore";
import { api } from "@/lib/api";


const SelectGuestAndBooking = ({ onSuccess }) => {
  const {addReservation} = useReservationStore();
  const [activeButton, setActiveButton] = useState("guest");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [room, setRoom] = useState([]);
  const [guest, setGuest] = useState([]);

  useEffect(() => {
    const fetchGuest = async () => {
      console.log("Fetching guests from:", "http://localhost:3000/api/v1/hotels/1/guests");
      try {
        setIsLoading(true);
        const response = await api.get("/hotels/1/guests");
        const data = response.data?.data;
        console.log(data, "data from api");
        const formattedGuest = data.map((guest) => ({
          id: guest.id,
          firstName: guest.firstName,
          lastName: guest.lastName,
          gender: guest.gender,
          email: guest.email,
          phone: guest.phone,
          address: guest.address,
          nationality: guest.nationality,
          idType: guest.identificationType,
          idNumber: guest.idNumber,
        }));

        console.log("Fetched guests:", formattedGuest);

        setGuest(formattedGuest);
        setError(null);
      } catch (error) {
        console.error("Error fetching guests:", error.mess);
        setError("Failed to load guests");
        setGuest([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuest();
  }, []);


  const [bookingFormData, setBookingFormData] = useState({
    checkIn: "",
    checkOut: "",
  });

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fetchRoom = async () => {
      try {
        console.log("Fetching rooms from:", `/hotels/1/availablerooms?check_in=${bookingFormData.checkIn}&check_out=${bookingFormData.checkOut}`);
        const response = await api.get(
          `/hotels/1/availablerooms?check_in=${bookingFormData.checkIn}&check_out=${bookingFormData.checkOut}`
        );
        
        const data = response.data.data;
        const formattedRoom = data.map((room) => ({
          id: room.id,
          roomNumber: room.roomNumber,
          roomType: room.type,
          price: room.price,
          status: room.status,
          size: room.size,
          maxOccupancy: room.occupancy,
          bedType: room.bedType,
          amenities: room.amenities.map((amenity) => amenity.name),
        }));
        console.log(formattedRoom);
        setRoom(formattedRoom);
        setError(null);
        if (formattedRoom.length !== 0) {
          setActiveButton("book");
        }
      } catch (error) {
        // console.error("Error fetching room:", error);
        setError("Failed to load room");
        setRoom([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  };

  const handleRoomSelection = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addReservation(selectedGuest, selectedRoom, bookingFormData);
      onSuccess();
    } catch (error) {
      console.error("Error adding reservation:", error);
      setError("Failed to add reservation");
    } finally {
      setIsLoading(false);
    }
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
            activeButton === "guest"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("guest")}
        >
          Select Guest
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

      {activeButton === "guest" && (
        <SelectGuest
          setSelectedGuest={setSelectedGuest}
          bookingFormData={bookingFormData}
          handleBookingChange={handleBookingChange}
          handleBookingSubmit={handleBookingSubmit}
          selectedGuest={selectedGuest}
          guest={guest}
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

export default SelectGuestAndBooking;
