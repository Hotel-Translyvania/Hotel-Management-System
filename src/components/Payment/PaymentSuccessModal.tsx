import { useNavigate } from "react-router-dom"; // add this import
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  onViewBooking?: () => void;
}

const PaymentSuccessModal = ({
  isOpen,
  onClose,
  bookingId,
  onViewBooking,
}: PaymentSuccessModalProps) => {
  const navigate = useNavigate(); // initialize the navigate function

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="w-full h-2 bg-ezystay-success" />

          <div className="flex items-center justify-center w-20 h-20 rounded-full mt-8 mb-4 animate-scale-in bg-green-50 text-ezystay-success">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div className="px-6 py-4 text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 text-ezystay-success">
              Payment Successful
            </h2>
            <p className="text-gray-600 mb-4">
              Your reservation has been confirmed. A confirmation email has been sent to you.
            </p>

            {bookingId && (
              <div className="bg-gray-50 p-3 rounded-md mb-6">
                <p className="text-sm text-gray-500">
                  Booking ID: <span className="font-medium">{bookingId}</span>
                </p>
              </div>
            )}

            <div className="flex justify-center mt-6 mb-8">
              <Button
                variant="outline"
                onClick={() => navigate("/billing")}
                className="border-gray-200"
              >
                Go to Billing
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;