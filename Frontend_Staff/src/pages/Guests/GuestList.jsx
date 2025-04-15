import { useEffect } from "react";
import { CustomTable } from "@/components/Table/Table";
import { guestColumns } from "@/components/Guests/GuestsColumns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserProfileAndBooking from "../Process/GuestCreation";
import EditGuest from "./EditGuest";
import SpinPage from "@/components/Spin/Spin";
import { useGuestStore } from "@/components/store/useGuestStore";
import { useState } from "react";
import { handleDelete } from "@/components/Staff/staffCoulmns";

const GuestListPage = () => {
  const { guests, isLoading, deleteGuest, fetchGuests, initialized } =
    useGuestStore();
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isEditGuestOpen, setIsEditEditOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    if (!initialized) {
      fetchGuests();
    }
  }, [initialized]);

  const handleDelete = async (id) => {
    try {
      await deleteGuest(id);
      alert("Guest deleted successfully!");
    } catch (error) {
      console.error("Error deleting guest:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading Guest...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div>
      <CustomTable
        data={guests}
        columns={guestColumns}
        addButtonText="Add Guest"
        onAddClick={() => setIsAddGuestOpen(true)}
        meta={{
          onEditClick: (guest) => {
            setSelectedGuest(guest);
            setIsEditEditOpen(true);
          },
          onDeleteClick: (guest) => {
            handleDelete(guest.id);
          },
        }}
      />

      <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
        <DialogContent>
          <UserProfileAndBooking
            onSuccess={() => {
              setIsAddGuestOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditGuestOpen} onOpenChange={setIsEditEditOpen}>
        <DialogContent>
          <EditGuest
            onSuccess={() => {
              setIsEditEditOpen(false);
            }}
            guestData={selectedGuest}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestListPage;
