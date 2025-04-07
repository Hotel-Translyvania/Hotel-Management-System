import { Button } from "@/components/ui/button";
import { Edit, ArrowUpDown } from "lucide-react";
import { DeleteButton } from "../Delete/DeleteButton";

const ManagersColumns = [
  {
    id: "picture",
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => (
      <img
        src={row.original.picture}
        className="size-24 rounded-full object-cover"
      />
    ),
    size: 110,
    enableSorting: false,
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    size: 200,
  },
  {
    id: "hotel",
    accessorKey: "hotel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hotel
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    size: 180,
  },

  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    size: 220,
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
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    size: 150,
  },
  {
    id: "employedDate",
    accessorKey: "registeredAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Since
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => new Date(row.original.registeredAt).toLocaleDateString(),
    size: 120,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <DeleteButton
          onDelete={() => {
            alert(`Deleted Manager ID ${row.original.id}`);
          }}
        />
      </div>
    ),
    enableSorting: false,
    size: 90,
  },
];

export default ManagersColumns;
