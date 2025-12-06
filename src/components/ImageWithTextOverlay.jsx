
import React from 'react';
import fond_sombre from '../assets/fond_sombre.png'; // importez l'image locale ou utilisez une URL

const ImageWithTextFrontBack = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Texte en arrière-plan (derrière l’image) */}
      <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 select-none -z-10">
        Texte en arrière-plan
      </div>

      {/* Image avec opacité */}
      <img
        src={fond_sombre}
        alt="Background"
        className="w-full h-auto opacity-100"
      />

      {/* Texte en avant-plan, superposé à l’image */}
      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
        Texte en avant-plan
      </div>
    </div>
  );
};export default ImageWithTextFrontBack