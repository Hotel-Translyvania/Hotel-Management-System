import { Button } from "@/components/ui/button";
import RoomDetail from "@/pages/Room/RoomDetail";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { DeleteButton } from "../Delete/DeleteButton";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const roomColumns = [
  {
    id: "roomNumber",
    accessorKey: "roomNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center"
      >
        Room No.
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "type",
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },

  {
    id: "bedType",
    accessorKey: "bedType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bed Type
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "roomDetails",
    header: "Room Details",
    cell: ({ row }) => <RoomDetail row={row} />,
    size: 400,
    enableSorting: false,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={`${
          row.original.status === "occupied"
            ? "bg-red-100 "
            : row.original.status === "available"
            ? "bg-green-100 "
            : row.original.status === "maintenance"
            ? "bg-yellow-100 "
            : "bg-gray-100"
        } p-1 rounded-full flex items-center justify-center w-full `}
      >
        <span>{row.original.status}</span>
      </div>
    ),
    size: 100,
  },
  {
    id: "price",
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.price}$</span>,
    size: 100,
  },
  {
    id: "actions",
    header: "Quick Action",
    cell: ({ row, table }) => (
      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            table.options.meta.onEditClick(row.original);
            e.stopPropagation();
          }}
          className=" hover:bg-gray-200"
        >
          <Edit className="size-4 text-blue-600" />
        </Button>
        <DeleteButton
          onDelete={
            async () => {
              console.log(row.original);
              await handleDelete(row.original.id);
            }
          }
        />
      </div>
    ),
    enableSorting: false,
    size: 80,
  },
];

const handleDelete = async (room_id) => {
  try {
    console.log(`/hms/hotels/1/rooms/${room_id}`)
    const response = await api.delete(`/hms/hotels/1/rooms/${room_id}`);
    console.log("Room deleted:", response.data);
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};
