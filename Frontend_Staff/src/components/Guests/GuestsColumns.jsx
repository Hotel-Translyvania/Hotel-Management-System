import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const guestColumns = [
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
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
  {
    id: "gender",
    accessorKey: "gender",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-sm"
      >
        Gender
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 20,
  },
  // {
  //   id: "email",
  //   accessorKey: "email",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Email
  //       <ArrowUpDown className="size-4" />
  //     </Button>
  //   ),
  //   size: 28,
  // },
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
    id: "address",
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Address
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 32,
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
  {
    id: "actions",
    header: "Quick Action",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={useEditGuest(row.original.id)}
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

export const useEditGuest = (guestId) => {
  const navigate = useNavigate();
  const handleEditGuest = () => {
    navigate(`/guests/edit-guests/${guestId}`);
  };
  return handleEditGuest;
};
