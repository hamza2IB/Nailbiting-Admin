'use client';
import React, { useEffect, useState } from "react";

export default function Toaster({ type, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide the toaster after 3 seconds
      if (onClose) {
        onClose(); // Call the onClose callback if provided
      }
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timeout on unmount
  }, [onClose]);

  // Define styles based on the type
  const typeStyles = {
    error: {
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      textColor: "text-red-700",
    },
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      textColor: "text-green-700",
    },
    warning: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-700",
    },
  };

  const { bgColor, borderColor, textColor } = typeStyles[type] || {};

  if (!isVisible) {
    return null; // Don't render the toaster if it's not visible
  }

  return (
    <div className={`${bgColor} ${borderColor} border-l-4 p-4 mb-6`}>
      <p className={`text-sm ${textColor}`}>{message}</p>
    </div>
  );
}
