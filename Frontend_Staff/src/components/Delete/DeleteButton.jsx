import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import SpinPage from "../Spin/Spin";

export const DeleteButton = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete();
      setIsOpen(false);
      setError(null);
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete item");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="hover:bg-gray-200"
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={"sm:max-w-xl p-6"}>
          <DialogHeader>
            <DialogTitle className={"font-bold font-serif"}>
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
