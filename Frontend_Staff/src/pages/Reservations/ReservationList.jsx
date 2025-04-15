import { CustomTable } from "@/components/Table/Table";
import { reservationColumns } from "@/components/Reservations/ReservationsColumn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import SelectGuestAndBooking from "../Process/ReservationCreation";
import EditBooking from "./EditBooking";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";
import { useReservationStore } from "@/components/store/useReservationStore";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const ReservationListPage = () => {
  const { fetchReservations, reservations, deleteReservation, isLoading, initialized } = useReservationStore();
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditReservationOpen, setIsEditReservationOpen] = useState(false);
  const [error, setError] = useState(null);
  console.log(reservations);


  useEffect(() => {
    if (!initialized) {
      fetchReservations();
    }
  }, [initialized]);

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      alert("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading reservations...</div>
        <SpinPage />
      </div>
    );
  }

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
          onDeleteClick: (reservation) => {
            handleDelete(reservation.bookingId);
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
