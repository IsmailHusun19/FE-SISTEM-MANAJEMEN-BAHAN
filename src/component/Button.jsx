import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-6 py-3 rounded-lg font-semibold tracking-wide
  bg-gradient-to-r from-amber-700 to-amber-600
  hover:from-amber-600 hover:to-amber-500
  text-white shadow-[0_0_18px_-4px_rgba(217,119,6,0.35)]
  hover:shadow-[0_0_25px_-3px_rgba(245,158,11,0.45)]
  transition-all duration-300 active:scale-95
  ${className}`}
    >
      {children}
    </button>
  );
}
