import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../Delete/DeleteButton";

export const guestSelection = [
  {
    id: "guestId",
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Guest ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 110,
  },
  {
    id: "fullName",
    accessorfn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
    size: 24,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },

  {
    id: "nationality",
    accessorKey: "nationality",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nationality
        <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  {
    id: "idType",
    accessorKey: "idType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID Type
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
  {
    id: "idNumber",
    accessorKey: "idNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID No.
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
];

export const useEditGuest = (guestId) => {
  const navigate = useNavigate();
  const handleEditGuest = () => {
    navigate(`/guests/edit-guests/${guestId}`);
  };
  return handleEditGuest;
};
