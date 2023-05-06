import React, { useRef, useState } from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { CiSquareCheck, CiSquareMinus, CiSquareRemove } from "react-icons/ci";

function ToothAddForm({
  id = 0,
  onCheck = (f) => f,
  onDelete = (f) => f,
  originalValue = "",
  title = "",
  number,
}) {
  const [note, setNote] = useState(originalValue);
  const noteAreaRef = useRef("");
  return (
    <div className="w-fit h-fit flex flex-col gap-2  items-center justify-center">
      <div className="w-full h-fit flex  text-white items-center justify-between">
        <div className=" flex items-center">
          <BiChevronsLeft
            className={"w-[20px]   h-fit text-accent"}
          ></BiChevronsLeft>
          <div>{number}</div>
          <BiChevronsRight
            className={"w-[20px]   h-fit text-accent"}
          ></BiChevronsRight>
        </div>
        {title && <div>{title}</div>}
        <div className="flex">
          <CiSquareCheck
            onClick={() => onCheck(note)}
            className="w-[25px] 2xl:w-[30px] h-fit hover:text-green-700 transition-all  cursor-pointer"
          ></CiSquareCheck>
          <CiSquareRemove
            onClick={() => {
              onDelete();
              setNote("");
            }}
            className="w-[25px] 2xl:w-[30px] h-fit hover:text-red-500 transition-all cursor-pointer"
          ></CiSquareRemove>
        </div>
      </div>
      <div className="w-full h-[1px] bg-accent"></div>
      <textarea
        onChange={(e) => {
          setNote(e.target.value);
        }}
        ref={noteAreaRef}
        name=""
        id=""
        rows="5"
        placeholder="Notes about the tooth"
        value={note}
        className="text-white outline-none w-[15rem] 2xl:w-[20rem] p-1 bg-transparent max-h-[20rem] min-h-[10rem] text-lg"
      ></textarea>
    </div>
  );
}

export default ToothAddForm;
