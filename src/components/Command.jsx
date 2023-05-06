import React from "react";

function Command({ icon, subtitle, onClick = (f) => f }) {
  return (
    <button
      className="flex flex-col  group items-center text-light hover:text-green-700"
      onClick={onClick}
    >
      {icon}
      <div className="invisible group-hover:visible text-light text-xs 2xl:text-sm text-center  ">
        {subtitle}
      </div>
    </button>
  );
}

export default Command;
