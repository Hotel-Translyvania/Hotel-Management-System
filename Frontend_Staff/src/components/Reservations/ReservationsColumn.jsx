import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const reservationColumns = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"flex items-center"}
      >
        Book ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 90,
  },
  {
    id: "guestName",
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 150,
  },
  {
    id: "room_id",
    accessorKey: "room_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "room_type",
    accessorKey: "room_type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room Type
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "check_in",
    accessorKey: "check_in",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Check-In
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "check_out",
    accessorKey: "check_out",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Check-Out
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  //   {
  //     id: "booking_status",
  //     accessorKey: "booking_status",
  //     header: ({ column }) => (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="size-4" />
  //       </Button>
  //     ),
  //     size: 100,
  //   },
  {
    id: "booking_via",
    accessorKey: "booking_via",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Booked Via
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Time
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 90,
  },
  {
    id: "actions",
    header: "Quick Action",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={useEditReservation(row.original.id)}
          className="text-sm"
        >
          <Edit className="h-4 w-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => alert(`Delete: ${row.original.id}`)}
          className="hover:bg-gray-200"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    ),
    enableSorting: false,
    size: 100,
  },
];

export const useEditReservation = (reservationId) => {
  const navigate = useNavigate();
  const handleEditReservation = () => {
    navigate(`/reservations/edit-booking/${reservationId}`);
  };
  return handleEditReservation;
};
