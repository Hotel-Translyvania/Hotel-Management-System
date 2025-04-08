import { useState, useEffect } from "react";
import PaymentSuccessModal from "@/components/Payment/PaymentSuccessModal";

const TestSuccessModal = () => {
  const [showSuccess, setShowSuccess] = useState(true); // modal opens immediately

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <PaymentSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        bookingId="EZY-09134"
        onViewBooking={() => {
          alert("Redirect to booking page");
          setShowSuccess(false);
        }}
      />
    </div>
  );
};

export default TestSuccessModal;