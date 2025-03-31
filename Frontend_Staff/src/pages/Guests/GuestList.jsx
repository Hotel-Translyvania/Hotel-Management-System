import { CustomTable } from "@/components/Table/Table";
import { guestColumns } from "@/components/Guests/GuestsColumns";
import { useState } from "react";
import { guestDatabase } from "@/TestData/dataTest";
import { useNavigate } from "react-router-dom";
const GuestListPage = () => {
  const navigate = useNavigate();

  const handleAddGuest = () => {
    navigate("/guests/add-guests");
  };


  return (
    <div>
      <CustomTable
        data={guestDatabase}
        columns={guestColumns}
        addButtonText="Add Guest"
        onAddClick={handleAddGuest}
      />
    </div>
  );
};

export default GuestListPage;
