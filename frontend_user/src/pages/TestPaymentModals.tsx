import { useState } from "react";
import PaymentSuccessModal from "@/components/Payment/PaymentSuccessModal";
import PaymentFailureModal from "@/components/Payment/PaymentFailureModal";
import { Button } from "@/components/ui/button";

const TestModals = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Button onClick={() => setShowSuccess(true)}>Show Success Modal</Button>
      <Button variant="destructive" onClick={() => setShowFailure(true)}>Show Failure Modal</Button>

      <PaymentSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        bookingId="EZY-09134"
        onViewBooking={() => {
          alert("Redirect to booking page");
          setShowSuccess(false);
        }}
      />

      <PaymentFailureModal
        isOpen={showFailure}
        onClose={() => setShowFailure(false)}
        onTryAgain={() => {
          alert("Retrying payment...");
          setShowFailure(false);
        }}
      />
    </div>
  );
};

export default TestModals;
