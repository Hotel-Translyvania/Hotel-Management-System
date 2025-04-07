import React from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomSelection } from "@/components/Room/roomSelection";
// import { roomDatabase } from "@/TestData/roomDataTest";
import { Button } from "@/components/ui/button";

const RoomSelection = ({
  setSelectedRoom,
  handleRoomSelection,
  selectedRoom,
  room,
}) => {
  const handleSave = (e) => {
    e.preventDefault();
    if (selectedRoom) {
      handleRoomSelection(e);
    }
  };
  return (
    <div className="py-4 flex flex-col gap-2">
      <CustomTable
        data={room}
        columns={roomSelection}
        EnableSelection={true}
        onSelectionChange={setSelectedRoom}
        pageSize={4}
        maxWidth="32"
      />

      <div className="flex justify-center -mt-2">
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-1/4"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default RoomSelection;
