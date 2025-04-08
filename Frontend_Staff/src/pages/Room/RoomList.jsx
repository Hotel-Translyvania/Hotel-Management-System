import React, { useState, useEffect } from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomColumns } from "@/components/Room/roomColumns";
import { roomDatabase } from "@/TestData/roomDataTest.js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const RoomList = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  // const []

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/hotels/1/rooms");
        console.log("Fetched Rooms:", response?.data?.rooms?.data);

        setRoom(response?.data?.rooms?.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to load rooms");
        setRoom([]);
      } finally {
        setIsLoading(false);
        setRefresh(false);
      }
    };

    fetchRooms();
  }, [refresh]);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading...</div>
        <SpinPage />
      </div>
    );
  }
  return (
    <div>
      <CustomTable
        data={room}
        columns={roomColumns}
        addButtonText="Add Room"
        maxWidth="48"
        onAddClick={() => setIsAddRoomOpen(true)}
        meta={{
          onEditClick: (room) => {
            setIsEditRoomOpen(true);
            setSelectedRoom(room);
            console.log(room);
          },
        }}
        pageSize={5}
      />
      {console.log(selectedRoom)}
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent>
          <AddRoom
            onSuccess={() => {
              setIsAddRoomOpen(false);
              setRefresh(true);
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
        <DialogContent>
          <EditRoom
            onSuccess={() => {
              setIsEditRoomOpen(false);
              setRefresh(true);
            }}
            roomData={selectedRoom}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomList;
