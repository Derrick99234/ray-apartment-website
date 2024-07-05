import React from "react";

const CheckboxComponent = () => {
  return (
    <div className="flex items-center">
      <input type="checkbox" className="peer hidden" id="customCheckbox" />
      <label
        htmlFor="customCheckbox"
        className="cursor-pointer border-2 border-slate-800 p-2 mr-3 bg-slate-800 w-10 h-10 flex items-center justify-center peer-checked:bg-green-500"
      >
        <svg
          className="hidden w-6 h-6 text-white peer-checked:block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </label>
    </div>
  );
};

export default CheckboxComponent;
