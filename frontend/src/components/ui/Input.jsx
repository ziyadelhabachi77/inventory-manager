import React from "react";

function Input({ value, type, onChange, placeholder, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 w-full dark:text-white text-sm focus:ring-blue-500 placeholder:text-gray-300 rounded-md focus:outline-none ring ring-gray-500/60 border-none ${className}`}
    />
  );
}

export default Input;
