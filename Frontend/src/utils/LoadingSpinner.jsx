import React from 'react';

const LoadingSpinner = ({ message = "Loading...", size = "large" }) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-16 w-16", 
    large: "h-32 w-32"
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-orange-500 ${sizeClasses[size]} mb-4`}></div>
      <p className={`text-gray-300 ${textSizeClasses[size]}`}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;