import React from "react";

const TextArea = ({
  placeholder, className, size = "normal", rows, resize, ...props
}) => {
  const resizeStyle = resize ? `resize-${resize}` : "resize-none";
  const sizeClasses = {
    normal: "py-3 px-5", large: "py-4 px-6", medium: "py-2 px-5", small: "py-1.5 px-3",  };
  const sizeClass = size ? sizeClasses[size] : "";
  return (
    <textarea
      className={`block w-full ${sizeClass} border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${resizeStyle} ${className}`}
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
