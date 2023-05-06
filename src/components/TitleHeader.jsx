import React from "react";

function TitleHeader({
  title = "Header",
  dark = false,
  direction = "center",
  commands = null,
  className,
}) {
  return (
    <div
      className={`${className}   font-bold w-full ${
        direction === "center"
          ? "text-center"
          : direction === "left"
          ? "text-left"
          : "text-right"
      }  text-lg 2xl:text-xl border-b-2 ${
        dark ? "text-dark border-b-dark" : "text-light border-b-light"
      }   `}
    >
      <div className="">{title}</div>
    </div>
  );
}

export default TitleHeader;
