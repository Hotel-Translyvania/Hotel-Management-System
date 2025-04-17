import React from "react";

const ErrorMessage = ({ title = "Data Loading Error", message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;