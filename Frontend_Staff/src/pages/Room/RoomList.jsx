import React from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomColumns } from "@/components/Room/roomColumns";
import { roomDatabase } from "@/TestData/roomDataTest.js";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const navigate = useNavigate();
  const handleAddRoom = () => {
    navigate("/rooms/add-room");
  };
  return (
    <CustomTable
      data={roomDatabase}
      columns={roomColumns}
      addButtonText="Add Room"
      maxWidth="56"
      onAddClick={handleAddRoom}
      pageSize={5}
    />
  );
};

export default RoomList;
