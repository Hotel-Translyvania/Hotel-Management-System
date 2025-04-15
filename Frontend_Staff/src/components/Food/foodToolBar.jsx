import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const FoodToolbar = ({
  searchTerm,
  setSearchTerm,
  buttonText,
  onAddClick,
  onOrderClick,
  role,
}) => {
  return (
    <div className="flex justify-between">
      <Input
        placeholder="Search foods..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/4"
      />
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          onClick={onOrderClick}
        >
          Orders
        </Button>
        {role === "manager" && (
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={onAddClick}
          >
            {buttonText}
            <PlusCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FoodToolbar;
