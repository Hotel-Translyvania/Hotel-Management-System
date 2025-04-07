
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-primary rounded-full p-2 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M2 12h20" />
          <path d="M2 16h20" />
          <path d="M6 8h12" />
        </svg>
      </div>
      <span className="font-bold text-2xl text-gray-800">
        Ezy<span className="text-primary">Stay</span>
      </span>
    </div>
  );
};

export default Logo;
