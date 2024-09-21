// src/components/common/Loader.tsx

import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-screen bg-white">
    <div className="relative flex justify-center items-center space-x-4">
      {/* Outer Rotating Circle */}
      <div className="w-16 h-16 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
      
      {/* Inner Pulse Circle */}
      <div className="absolute w-10 h-10 bg-blue-500 rounded-full animate-pulse"></div>
      
      {/* Smaller Circles Rotating */}
      <div className="absolute flex space-x-1">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce animation-delay-150"></div>
        <div className="w-4 h-4 bg-blue-800 rounded-full animate-bounce animation-delay-300"></div>
      </div>
    </div>
  </div>
);

export default Loader;
