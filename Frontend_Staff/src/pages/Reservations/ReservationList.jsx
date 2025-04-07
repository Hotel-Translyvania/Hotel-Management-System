import { CustomTable } from "@/components/Table/Table";
import { reservationColumns } from "@/components/Reservations/ReservationsColumn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import SelectGuestAndBooking from "../Process/ReservationCreation";
import EditBooking from "./EditBooking";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const ReservationListPage = () => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditReservationOpen, setIsEditReservationOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/hms/hotels/1/reservations/bookings");
        console.log("Fetched reservations:", response.data.data);

        const formattedReservations = response.data.data.map((reservation) => ({
          bookingId: reservation.bookingId,
          guestId: reservation.guestId,
          guestFirstName: reservation.guestFirstName,
          guestLastName: reservation.guestLastName,
          roomNum: reservation.roomNum,
          roomType: reservation.roomType,
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
          bookingStatus: reservation.bookingStatus,
          createdAt: reservation.createdAt,
        }));

        setReservations(formattedReservations);
        setError(null);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to load reservations");
        setReservations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading reservations...</div>
        <SpinPage />
      </div>
    );
  }

  // if (error) {
  //   return <div className="text-red-500">{error}</div>;
  // }

  return (
    <div>
      <CustomTable
        data={reservations}
        columns={reservationColumns}
        defaultSort={[{ id: "created_at", desc: false }]}
        addButtonText="Add Reservation"
        onAddClick={() => setIsAddBookOpen(true)}
        meta={{
          onEditClick: (reservation) => {
            setSelectedReservation(reservation);
            setIsEditReservationOpen(true);
          },
        }}
      />

      <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
        <DialogContent>
          <SelectGuestAndBooking
            onSuccess={() => {
              setIsAddBookOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditReservationOpen}
        onOpenChange={setIsEditReservationOpen}
      >
        <DialogContent>
          <EditBooking
            onSuccess={() => {
              setIsEditReservationOpen(false);
            }}
            reservationData={selectedReservation}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationListPage;
