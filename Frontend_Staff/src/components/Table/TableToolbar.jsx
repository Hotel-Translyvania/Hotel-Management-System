import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Filter, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const TableToolbar = ({ table, addButtonText, onAddClick }) => {
  const [filterField, setFilterField] = useState("all");
  const [filterValue, setFilterValue] = useState("");

  const filterableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter() && column.id !== "actions");

  const handleFilterChange = (value) => {
    setFilterField(value);
    setFilterValue("");
    if (value === "all") {
      table.resetColumnFilters();
      table.setGlobalFilter("");
    } else {
      table.resetColumnFilters();
    }
  };

  const handleSearch = (value) => {
    setFilterValue(value);
    if (filterField !== "all") {
      table.getColumn(filterField)?.setFilterValue(value);
    } else {
      table.setGlobalFilter(value);
    }
  };

  const clearFilters = () => {
    setFilterValue("");
    if (filterField !== "all") {
      table.getColumn(filterField)?.setFilterValue("");
    } else {
      table.setGlobalFilter("");
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              <span>{filterField === "all" ? "All Fields" : filterField}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleFilterChange("all")}>
              All Fields
            </DropdownMenuItem>
            {filterableColumns.map((column) => (
              <DropdownMenuItem
                key={column.id}
                onClick={() => handleFilterChange(column.id)}
                className={filterField === column.id ? "bg-gray-100" : ""}
              >
                {column.id}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-row gap-2 w-1/3">
          <Input
            placeholder={"Search... "}
            value={filterValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4  bg-white"
          />
          {filterValue && (
            <Button onClick={clearFilters} className="">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {addButtonText && (
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          onClick={onAddClick}
        >
          {addButtonText}
          <PlusCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
