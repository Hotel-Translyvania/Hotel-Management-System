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
    cell: ({ row }) => (
      <div className="flex flex-col">
        {row.original.Item.split(", ")
          .slice(0, 3)
          .map((item, index) => (
            <div key={index}>
              {item}
              {index === 2 && row.original.Item.split(", ").length > 3 && (
                <span className="text-gray-500 text-xs ml-2">
                  +{row.original.Item.split(", ").length - 3} more
                </span>
              )}
            </div>
          ))}
      </div>
    ),
    size: 200,
  },
  {
    id: "Qty",
    accessorKey: "Qty",
    header: "Quantity",
    size: 80,
    cell: ({ row }) => (
      <div className="flex flex-col">
        {row.original.Qty.split(", ")
          .slice(0, 3)
          .map((qty, index) => (
            <div key={index}>
              {qty}
              {index === 2 && row.original.Qty.split(", ").length > 3 && (
                <span className="text-gray-500 text-xs ml-2">
                  +{row.original.Qty.split(", ").length - 3} more
                </span>
              )}
            </div>
          ))}
      </div>
    ),
  },
  {
    id: "Price",
    accessorKey: "Price",
    header: "Price",
    size: 80,
    cell: ({ row }) => (
      <div className="flex flex-col">
        {row.original.Price.split(", ")
          .slice(0, 3) // Match the same 3 items
          .map((price, index) => (
            <div key={index}>
              {price} $
              {index === 2 && row.original.Price.split(", ").length > 3 && (
                <span className="text-gray-500 text-xs ml-2">
                  +{row.original.Price.split(", ").length - 3} more
                </span>
              )}
            </div>
          ))}
      </div>
    ),
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
