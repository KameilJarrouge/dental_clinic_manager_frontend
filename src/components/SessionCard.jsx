import moment from "moment";
import React, { useContext, useState } from "react";
import { GiEntryDoor } from "react-icons/gi";
import { MdOutlineExpandMore } from "react-icons/md";
import { TbCheckupList } from "react-icons/tb";
import { ModalsContext } from "../context/modalsContext";

function SessionCard({ id, date = "", details = "" }) {
  const [noteIsVisible, setNoteIsVisible] = useState(false);
  const { setCreateSessionModalOn, setSelectedId } = useContext(ModalsContext);
  return (
    <div
      className="w-full h-fit  bg-light rounded-md  p-1 2xl:p-2 flex flex-col justify-start items-start shadow-md shadow-black/30 transition-[height]
      border-[1px] border-dark/20"
    >
      <div className="w-full flex justify-between">
        <div
          onClick={() => {
            // console.log("id:", id);
            setSelectedId(id);
            setCreateSessionModalOn(true);
          }}
          className="flex justify-start items-center gap-4 cursor-pointer"
        >
          <GiEntryDoor className="w-[20px]   h-fit"></GiEntryDoor>
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
          {details}
        </div>
      )}
    </div>
  );
}

export default SessionCard;
