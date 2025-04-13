import React from "react";

interface LogoProps {
  className?: string;
  size?: number; // Size of the square icon
}

const Logo = ({ className = "", size = 40 }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icon */}
      <div
        className="bg-primary rounded-xl flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Abstract icon or simple symbol */}
        <span
          className="text-white font-extrabold"
          style={{ fontSize: size * 0.5 }}
        >
          ✦
        </span>
      </div>

      {/* Brand Name */}
      <div className="text-white font-extrabold text-2xl leading-none">
        EzyStay
      </div>
    </div>
  );
};

export default Logo;
