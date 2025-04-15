import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdLogout } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import SpinPage from "../Spin/Spin";

export const LogoutConfirmation = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await onLogout();
      setIsOpen(false);
      setError(null);
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="bg-blue-500 text-white hover:bg-blue-600 flex flex-col gap-0"
        onClick={() => setIsOpen(true)}
      >
        <MdLogout className="items-center" size={20} />
      </Button>


      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={"sm:max-w-xl p-6"}>
          <DialogHeader>
            <DialogTitle className={"font-bold font-serif"}>
              Confirm Logout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-blue-700 hover:bg-blue-800 text-white flex flex-row gap-2"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Logout
              {isLoading && (
                <div>
                  <SpinPage size={4} color="white" />
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
