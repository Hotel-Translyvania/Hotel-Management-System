import { CustomTable } from "@/components/Table/Table";
import { reservationDatabase } from "@/TestData/reservationDatabase";
import { reservationColumns } from "@/components/Reservations/ReservationsColumn";
import { useNavigate } from "react-router-dom";
const ReservationListPage = () => {
  const navigate = useNavigate();

  const handleAddBooking = () => {
    navigate("/reservations/add-booking");
  };

  return (
    <div>
      <CustomTable
        data={reservationDatabase}
        columns={reservationColumns}
        defaultSort={[{ id: "created_at", desc: false }]}
        addButtonText="Add Reservation"
        onAddClick={handleAddBooking}
      />
    </div>
  );
};

export default ReservationListPage;

