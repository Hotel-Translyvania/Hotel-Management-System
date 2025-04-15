import { Button } from "@/components/ui/button";
import { Edit, ArrowUpDown } from "lucide-react";
import { DeleteButton } from "../Confirmation/DeleteButton";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const staffColumns = [
  {
    id: "profilePic",
    accessorKey: "profilePic",
    header: "Picture",
    cell: ({ row }) => (
      <img
        src={row.original.profilePic}
        alt="Staff"
        className="size-10 rounded-full object-cover"
      />
    ),
    size: 60,
    enableSorting: false,
  },
  {
    id: "staffName",
    accessorKey: "staffName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),

    size: 24,
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
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 28,
  },
  {
    id: "phonenumber",
    accessorKey: "phonenumber",
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
    id: "staffSalary",
    accessorKey: "staffSalary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Salary
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => `$${row.original.staffSalary}`,
    size: 24,
  },
  {
    id: "staffRole",
    accessorKey: "staffRole",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 20,
  },
  {
    id: "employedAt",
    accessorKey: "employedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Start Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),

    size: 20,
  },
  {
    id: "staffStatus",
    accessorKey: "staffStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
  {
    id: "actions",
    header: "Quick Action",
    cell: ({ row, table }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            // console.log("Yo",row.original);
            table.options.meta?.onEditClick?.(row.original);
          }}
        >
          <Edit className="size-4 text-blue-600" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            table.options.meta?.onAssignClick?.(row.original);
          }}
        >
          <img
            src="/assign.svg"
            alt="Assign"
            className="size-4 text-blue-600"
          />
        </Button>
        <DeleteButton
          onDelete={async () => {
            await handleDelete(row.original.id);
          }}
        />
      </div>
    ),
    enableSorting: false,
    size: 140,
  },
];

export default staffColumns;

export const handleDelete = async (id) => {
  try {
    const response = await api.delete(`/hms/hotels/1/staff/${id}`);
    console.log("Delete Response:", response.data);
  } catch (error) {
    console.error("Error deleting staff:", error);
  }
};
