import React, {  } from "react";
import { ICONS } from "../../asset/assets.js";
import Hero from "../../components/Hero/Hero.jsx";

const Entreprise = () => {




  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* -------- Floating casque --------------------- */}
      <div className="relative w-full h-[410px] overflow-hidden">
        {/* Floating background icon */}
        <div
          className="absolute bg-no-repeat bg-contain opacity-20 bg-[length:200px] -z-10 animate-[floatIcon_4s_ease-in-out_infinite]"
          style={{
            backgroundImage: `url(${ICONS.Casque})`,
            left: "1450px",
            bottom: "200px",
            width: "200px",
            height: "200px",
            transform: "scaleX(-1)",
          }}
        />
      </div>

      <style>
        {`
          @keyframes floatIcon {
            0%   { transform: translateY(0) scaleX(-1); }
            50%  { transform: translateY(-50px) scaleX(-1); }
            100% { transform: translateY(0) scaleX(-1); }
          }
        `}
      </style>
    </div>
  );
};

export default Entreprise;
