import { useState } from "react";
import PaymentFailureModal from "@/components/Payment/PaymentFailureModal";

const TestFailureModal = () => {
  const [showFailure, setShowFailure] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
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

export default TestFailureModal;