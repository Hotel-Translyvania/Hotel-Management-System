import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const roomSelection = [
  {
    id: "roomNumber",
    accessorKey: "roomNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.roomNumber}</div>
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
        Type
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.roomType}</div>
    ),
    size: 100,
  },
  {
    id: "details",
    header: "Details",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{row.original.bedType}</span>
          <span>||</span>
          <span>{row.original.size} sqft</span>
        </div>
        <div className="text-xs text-gray-600 ">
          {row.original.amenities?.slice(0, 3).join(" || ")}
          {row.original.amenities?.length > 3 &&
            " +" + (row.original.amenities.length - 3)}
        </div>
      </div>
    ),
    size: 120,
    enableSorting: false,
  },
  {
    id: "capacity",
    accessorKey: "maxOccupancy",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Capacity
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p className="flex items-center font-medium justify-center">
        {row.original.maxOccupancy}
      </p>
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
    cell: ({ row }) => <div className="font-medium">{row.original.price}$</div>,
    size: 120,
  },
];
