import React, { useEffect, useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomColumns } from "@/components/Room/roomColumns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";
import SpinPage from "@/components/Spin/Spin";
import { useRoomStore } from "@/components/store/useRoomStore";
import { handleDelete } from "@/components/Staff/staffCoulmns";

const RoomList = () => {
  const { rooms, isLoading, error, fetchRooms, initialized, deleteRoom } =
    useRoomStore();

  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleDelete = async (roomId) => {
    console.log(roomId, "roomId");
    try {
      await deleteRoom(roomId);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  useEffect(() => {
    if (!initialized) {
      fetchRooms();
    }
  }, [initialized]);

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
        data={rooms}
        columns={roomColumns}
        addButtonText="Add Room"
        maxWidth="48"
        onAddClick={() => setIsAddRoomOpen(true)}
        meta={{
          onEditClick: (room) => {
            setIsEditRoomOpen(true);
            setSelectedRoom(room);
          },
          onDeleteClick: (room) => {
            handleDelete(room.id);
          },
        }}
        pageSize={5}
      />
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent>
          <AddRoom
            onSuccess={() => {
              setIsAddRoomOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
        <DialogContent>
          <EditRoom
            onSuccess={() => {
              setIsEditRoomOpen(false);
            }}
            roomData={selectedRoom}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomList;
