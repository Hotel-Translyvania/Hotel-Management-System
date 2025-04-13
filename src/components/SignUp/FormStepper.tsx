
import React from "react";
import { cn } from "@/lib/utils";

interface FormStepperProps {
  steps: readonly string[]; // Change from string[] to readonly string[]
  currentStep: number;
}

const FormStepper: React.FC<FormStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8 mt-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200",
                  index < currentStep
                    ? "bg-primary text-white"
                    : index === currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-400"
                )}
              >
                {index < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1",
                  index <= currentStep ? "text-primary font-medium" : "text-gray-400"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center">
                <div
                  className={cn(
                    "h-[2px] w-full",
                    index < currentStep ? "bg-primary" : "bg-gray-200"
                  )}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormStepper;
