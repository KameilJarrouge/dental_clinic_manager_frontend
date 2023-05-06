import React from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

function ATCHeader({
  title,
  dark,
  direction = "center",
  expandable = false,
  expanded,
  className = "",
  expand = (f) => f,
}) {
  return (
    <div
      className={`${className}  font-bold flex justify-between items-center  w-full ${
        direction === "center"
          ? "text-center"
          : direction === "left"
          ? "text-left"
          : "text-right"
      }  2xl:text-lg border-b-2 ${
        dark ? "text-dark border-b-dark" : "text-light border-b-light"
      }   `}
    >
      {title}
      {expandable && (
        <MdOutlineExpandMore
          onClick={() => {
            expand();
          }}
          className={`w-[25px] h-fit cursor-pointer ${
            expanded && "rotate-180"
          } transition-all `}
        />
      )}
    </div>
  );
}

export default ATCHeader;
