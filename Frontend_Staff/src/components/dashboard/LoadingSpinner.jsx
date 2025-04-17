import React from "react";

const LoadingSpinner = ({ message = "Loading dashboard data..." }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"
          role="status" 
        >

        </div>
        <p className="text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;