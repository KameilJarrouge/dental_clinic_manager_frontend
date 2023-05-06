import moment from "moment";
import React, { useContext, useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { TbCheckupList } from "react-icons/tb";
import { ModalsContext } from "../context/modalsContext";

function CheckupCard({ id, date = "", notes = "" }) {
  const [noteIsVisible, setNoteIsVisible] = useState(false);
  const { setCreateCheckupModalOn, setSelectedId } = useContext(ModalsContext);
  return (
    <div
      className={`w-full h-fit  bg-light rounded-md  p-1 2xl:p-2 flex flex-col justify-start items-start shadow-md shadow-black/30 transition-[height]
    border-[1px] border-dark/20 ${
      noteIsVisible && "outline-1  outline-none outline-accent"
    } `}
    >
      <div className="w-full flex justify-between">
        <div
          onClick={() => {
            // console.log("id:", id);
            setSelectedId(id);
            setCreateCheckupModalOn(true);
          }}
          className="flex justify-start items-center gap-4 cursor-pointer"
        >
          <TbCheckupList className="w-[20px]   h-fit"></TbCheckupList>
          <div className="flex gap-2 w-fit items-center text-sm 2xl:text-base">
            {moment(date).format("yyyy-MM-DD")}
          </div>
        </div>

        {/* commands */}
        <div className="flex gap-2">
          <MdOutlineExpandMore
            onClick={() => setNoteIsVisible(!noteIsVisible)}
            className={`w-[25px] h-fit cursor-pointer ${
              noteIsVisible && "rotate-180"
            } transition-all `}
          ></MdOutlineExpandMore>
        </div>
      </div>
      {/* notes */}
      {noteIsVisible && (
        <div dir="auto" className="flex flex-col w-full">
          <div className="w-full h-[1px] bg-dark my-1 px-1"></div>
          {notes}
        </div>
      )}
    </div>
  );
}

export default CheckupCard;
