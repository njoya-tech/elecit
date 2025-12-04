import React from 'react';
import { motion } from 'framer-motion';

export const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Composant Banner Principal
const BlogBanner = ({ titlePart1, titlePart2, highlightWord }) => {
  return (
    <div 
      className="relative w-full py-16 px-4"
      style={{ backgroundColor: MY_COLORS.black }}
    >
      <div className="max-w-7xl mx-auto text-center flex items-end justify-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold px-4 md:w-140 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ color: MY_COLORS.white }}>
            {titlePart1}{' '}
          </span>
          <span style={{ color: MY_COLORS.green }}>
            {highlightWord}
          </span>
          <span style={{ color: MY_COLORS.white }}>
            {titlePart2}{' '}
          </span>
        </motion.h1>
    
      </div>
    </div>
  );
};

export default BlogBanner