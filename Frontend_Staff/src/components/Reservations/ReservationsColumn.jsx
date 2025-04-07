import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../Delete/DeleteButton";

export const reservationColumns = [
  {
    id: "bookingId",
    accessorKey: "bookingId",
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
    accessorfn: (row) => `${row.guestFirstName} ${row.guestLastName}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-start flex-col">
        <div className="">
          {row.original.guestFirstName} {row.original.guestLastName}
        </div>
        <div className="text-sm text-muted-foreground">
          {row.original.guestId}
        </div>
      </div>
    ),
    size: 150,
  },
  {
    id: "roomNum",
    accessorKey: "roomNum",
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
    id: "roomType",
    accessorKey: "roomType",
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
    id: "checkIn",
    accessorKey: "checkIn",
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
    id: "checkOut",
    accessorKey: "checkOut",
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
  {
    id: "bookingStatus",
    accessorKey: "bookingStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  // {
  //   id: "booking_via",
  //   accessorKey: "booking_via",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Booked Via
  //       <ArrowUpDown className="size-4" />
  //     </Button>
  //   ),
  //   size: 100,
  // },
  {
    id: "createdAt",
    accessorKey: "createdAt",
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
    cell: ({ row, table }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            table.options.meta?.onEditClick?.(row.original);
          }}
          className="text-sm hover:bg-gray-200"
        >
          <Edit className="h-4 w-4 text-blue-600" />
        </Button>
        <DeleteButton
          onDelete={() =>
            alert(`Delete guest with ID: ${row.original.bookingId}`)
          }
        />
      </div>
    ),
    enableSorting: false,
    size: 100,
  },
];
