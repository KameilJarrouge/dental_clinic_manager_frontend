import React from "react";

function SectionHeader({ title = "", commands, dark = false, className = "" }) {
  return (
    <div
      className={`${className}   font-bold w-full flex justify-between items-center  text-lg 2xl:text-xl border-b-2 ${
        dark ? "text-dark border-b-dark" : "text-light border-b-light"
      }   `}
    >
      <div className="flex items-center">{title}</div>
      <div className="flex items-center justify-end gap-1 flex-wrap  ">
        {commands}
      </div>
    </div>
  );
}

export default SectionHeader;
