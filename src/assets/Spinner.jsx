import React from "react";

function Spinner() {
  return (
    <div className="stroke-dark fill-transparent w-[40px] h-[40px]">
      <svg className="animate-spin " viewBox="0 0 50 50" stroke="current">
        <circle
          className="animate-dash "
          cx="25"
          cy="25"
          r="20"
          fill="current"
          stroke="current"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}

export default Spinner;
