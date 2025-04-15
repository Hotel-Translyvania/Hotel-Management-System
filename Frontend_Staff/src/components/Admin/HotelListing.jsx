import { useState, useEffect } from "react";
import HotelCard from "./Hotels/hotelCard";
import hotelData from "./Hotels/hotelData";
import HotelPagination from "./Hotels/hotelPagination";
import HotelToolBar from "./Hotels/hotelToolBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddHotel from "./AddHotel";
import EditHotel from "./EditHotel";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const HotelListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [addHotelOpen, setAddHotelOpen] = useState(false);
  const [editHotelOpen, setEditHotelOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const [hotel, setHotel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("hotels");
        const data = response.data.data;
        const formattedHotel = data.map((hotel) => ({
          id: hotel.id,
          hotelName: hotel.name,
          location: hotel.location,
          description: hotel.description,
          image: hotel.image,
        }));
        setHotel(formattedHotel);
        setError(null);
      } catch (error) {
        console.error("Error fetching hotel:", error);
        setError("Failed to load hotel");
        setHotel([]);
      } finally {
        setIsLoading(false);
        setRefresh(false);
      }
    };

    fetchHotel();

  }, [refresh]);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading hotel...</div>
        <SpinPage />
      </div>
    );
  }


  const filteredHotels = hotel.filter(
    (hotel) =>
      hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6 p-4 rounded-lg bg-white">
      <div>
        <HotelToolBar
          setSearchTerm={setSearchTerm}
          buttonText="Add Hotel"
          onAddClick={() => setAddHotelOpen(true)}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {paginatedHotels.map((hotel) => (
          <HotelCard
            hotel={hotel}
            onEditClick={() => {
              setEditHotelOpen(true);
              setCurrentHotel(hotel);
            }}
          />
        ))}
      </div>

      <HotelPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />

      <Dialog open={addHotelOpen} onOpenChange={setAddHotelOpen}>
        <DialogContent className="sm:max-w-3xl">
          <AddHotel
            onSuccess={() => {
              setAddHotelOpen(false);
              setRefresh(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={editHotelOpen} onOpenChange={setEditHotelOpen}>
        <DialogContent className="sm:max-w-3xl">
          <EditHotel
            currentHotel={currentHotel}
            onSuccess={() => {
              setEditHotelOpen(false);
              setRefresh(true);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
