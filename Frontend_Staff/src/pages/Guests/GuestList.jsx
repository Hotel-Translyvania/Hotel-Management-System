import { useState, useEffect } from "react";
import { CustomTable } from "@/components/Table/Table";
import { guestColumns } from "@/components/Guests/GuestsColumns";
import { guestDatabase } from "@/TestData/dataTest";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserProfileAndBooking from "../Process/GuestCreation";
import EditGuest from "./EditGuest";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";
import { set } from "react-hook-form";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const GuestListPage = () => {
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isEditGuestOpen, setIsEditEditOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [guest, setGuest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/hotels/1/guests");
        const data = response.data?.data;
        const formattedGuest = data.map((guest) => ({
          id: guest.id,
          firstName: guest.firstName || "John",
          lastName: guest.lastName || "Doe",
          gender: guest.gender,
          email: guest.email,
          phone: guest.phone,
          address: guest.address,
          nationality: guest.nationality,
          idType: guest.idType,
          idNumber: guest.idNumber,
        }));

        console.log("Fetched guests:", formattedGuest);

        setGuest(formattedGuest);
        setError(null);
      } catch (error) {
        console.error("Error fetching guests:", error);
        setError("Failed to load guests");
        setGuest([]);
      } finally {
        setIsLoading(false);
        setRefresh(false);
      }
    };

    fetchGuest();
  }, [refresh]);
  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading staff...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div>
      <CustomTable
        data={guest}
        columns={guestColumns}
        addButtonText="Add Guest"
        onAddClick={() => setIsAddGuestOpen(true)}
        meta={{
          onEditClick: (guest) => {
            setSelectedGuest(guest);
            setIsEditEditOpen(true);
            console.log(guest);
          },
        }}
      />

      <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
        <DialogContent>
          <UserProfileAndBooking
            onSuccess={() => {
              setIsAddGuestOpen(false);
              setRefresh(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditGuestOpen} onOpenChange={setIsEditEditOpen}>
        <DialogContent>
          <EditGuest
            onSuccess={() => {
              setIsEditEditOpen(false);
              setRefresh(true);
            }}
            guestData={selectedGuest}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestListPage;
