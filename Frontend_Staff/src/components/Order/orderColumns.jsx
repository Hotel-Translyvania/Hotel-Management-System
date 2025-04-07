import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const foodOrderColumns = [
  {
    id: "OrderID",
    accessorKey: "OrderID",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 90,
  },
  {
    id: "RoomNumber",
    accessorKey: "RoomNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room No.
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "Item",
    accessorKey: "Item",
    header: "Food Name",
    size: 200,
  },
  {
    id: "Qty",
    accessorKey: "Qty",
    header: "Quantity",
    size: 80,
  },
  {
    id: "OrderTime",
    accessorKey: "OrderTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Time
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span>
        {new Date(row.original.OrderTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    ),
    size: 100,
  },
  {
    id: "Status",
    accessorKey: "Status",
    header: "Status",
    size: 120,
  },
  {
    id: "Notes",
    accessorKey: "Notes",
    header: "Special Requests",
    size: 200,
  },
];
