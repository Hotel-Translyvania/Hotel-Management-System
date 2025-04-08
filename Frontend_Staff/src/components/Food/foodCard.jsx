import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";


const FoodCard = ({ food, onEditClick, onDeleteClick }) => {
  const visibleIngredients = food.Ingredients.slice(0, 4);


  return (
    <div className="flex flex-col w-[245px] gap-1 rounded-lg overflow-hidden shadow-sm">
      <div className="shrink-0 overflow-hidden h-40">
        <img
          src={food.picture}
          alt={food.Name}
          className="object-cover size-full"
        />
      </div>

      <div className="p-2">
        <div className="flex justify-between">
          <h3 className="font-semibold ">{food.Name}</h3>
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={onEditClick}
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={onDeleteClick}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-sm text-gray-400 truncate">
            {visibleIngredients.join(" || ")}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-blue-600">${food.Price}</span>
          <span
            className={`text-sm text-gray-400
            ${food.Status === "Available" ? "text-green-500" : "text-red-500"}
            `}
          >
            {food.Status}
          </span>
          <span className="text-indigo-600 font-semibold text-sm">
            {food.Category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
