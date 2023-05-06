import moment from "moment";
import React, { useContext, useState } from "react";
import { FaXRay } from "react-icons/fa";
import { MdOutlineExpandMore, MdRemoveRedEye } from "react-icons/md";
import { BASE_URL } from "../api/api";
import { ModalsContext } from "../context/modalsContext";

function XrayCard({ date, fileName, notes, id }) {
  const [noteIsVisible, setNoteIsVisible] = useState(false);
  const { setCreateXrayModalOn, setSelectedId } = useContext(ModalsContext);

  return (
    <div
      className={`w-full h-fit  bg-light rounded-md  p-1 2xl:p-2 flex flex-col justify-start items-start shadow-md shadow-black/30 transition-[height]
    border-[1px] border-dark/20 ${
      noteIsVisible && "outline-1  outline-none outline-accent"
    } `}
    >
      <div className="w-full flex justify-between">
        <div
          className="flex justify-start items-center gap-4 cursor-pointer"
          onClick={() => {
            setSelectedId(id);
            setCreateXrayModalOn(true);
          }}
        >
          <FaXRay className="w-[20px]   h-fit"></FaXRay>
          <div className="flex gap-2 w-fit items-center  text-sm 2xl:text-base">
            {moment(date).format("yyyy-MM-DD")}
          </div>
        </div>

        {/* commands */}
        <div className="flex gap-2">
          <MdRemoveRedEye
            onClick={() =>
              window.open(`${BASE_URL}/xrays/${fileName}`, "_blank")
            }
            className={`w-[25px] h-fit cursor-pointer transition-all hover:text-green-700 `}
          ></MdRemoveRedEye>
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

export default XrayCard;
