import React from "react";
export function BinarySwitchInput({
  setValue,
  value,
  onFocus = (f) => f,
  onBlur = (f) => f,
  displayOn,
  displayOff,
  className,
}) {
  return (
    <div
      onKeyDown={(e) => {
        if (e.code === "Space") {
          setValue(!value);
        }
      }}
      tabIndex={0}
      onFocus={() => {
        onFocus();
      }}
      className={`${className}  transition-all cursor-pointer ${
        value ? "bg-light text-primary  " : "bg-primary text-light  "
      } rounded-sm px-2  ring-0 outline-none select-none text-center 2xl:font-bold `}
      onClick={() => {
        setValue(!value);
      }}
      onBlur={() => {
        onBlur();
      }}
    >
      {value ? displayOn : displayOff}
    </div>
  );
}
