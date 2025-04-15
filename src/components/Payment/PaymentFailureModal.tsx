import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XCircle } from "lucide-react";

interface PaymentFailureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryAgain?: () => void;
}

const PaymentFailureModal = ({
  isOpen,
  onClose,
  onTryAgain,
}: PaymentFailureModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="w-full h-2 bg-ezystay-error" />

          <div className="flex items-center justify-center w-20 h-20 rounded-full mt-8 mb-4 animate-scale-in bg-red-50 text-ezystay-error">
            <XCircle className="w-12 h-12" />
          </div>

          <div className="px-6 py-4 text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 text-ezystay-error">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't process your payment. Please check your payment details or try again.
            </p>
            <p className="text-sm text-gray-500 italic mb-4">
              No charges were made to your card.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-8">
              <Button
                onClick={onTryAgain}
                className="bg-ezystay-primary hover:bg-ezystay-primary/90"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-200"
              >
                Back to Booking
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentFailureModal;