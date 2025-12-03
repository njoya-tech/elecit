// src/components/CTAButton.jsx
import React from "react";

const CTAButton = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full border-2 border-green-500 text-green-500 bg-transparent px-6 md:px-8 py-2.5 
        md:py-3 font-semibold text-sm md:text-base transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default CTAButton;
