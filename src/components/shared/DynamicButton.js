import React from "react";

const DynamicButton = ({ isLoading, onClick, children, type, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-[10px] px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#199A8E] hover:bg-teal-600 focus:outline-none  ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading || disabled}
    >
      {isLoading ? "ログイン中..." : children}
    </button>
  );
};

export default DynamicButton;
