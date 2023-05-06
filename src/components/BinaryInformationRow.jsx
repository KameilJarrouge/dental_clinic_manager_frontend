import React, { useState } from "react";
import { BiEdit, BiReset, BiSave } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { BinarySwitchInput } from "./BinarySwitchInput";

function BinaryInformationRow({ title, data, displayOn, displayOff }) {
  // const [value, setValue] = useState(data);
  return (
    <div
      className="flex w-full  h-fit gap-1 py-1 px-2  items-center rounded-md  bg-secondary shadow-md shadow-dark
    border-[1px] border-dark/20"
    >
      <div className="font-bold w-fit min-w-[6em]">{title + ":"} </div>
      <div className="w-full">{data ? displayOn : displayOff}</div>
    </div>
  );
}

export default BinaryInformationRow;
