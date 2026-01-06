// src/components/CTAButton.jsx
import React from "react";
import { MY_COLORS } from "../../constants/colors.js";

const CTAButton = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      className={`relative z-20 px-8 py-3 rounded-full border-2 
      transition-all duration-300 font-semibold text-lg hover:scale-105 active:scale-95 ${className}`}
      onClick={onClick}
      type={type}
      style={{
        borderColor: MY_COLORS.secondaryGreen,
        color: MY_COLORS.secondaryGreen,
        backgroundColor: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen;
        e.currentTarget.style.color = MY_COLORS.white;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = MY_COLORS.secondaryGreen;
      }}
    >
      {children}
    </button>
  );
};

export default CTAButton;
