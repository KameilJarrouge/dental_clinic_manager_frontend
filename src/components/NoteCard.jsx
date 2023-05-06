import moment from "moment";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

function NoteCard({
  id = 0,
  title = "Title",
  date = "2020-09-09",
  action = (f) => f,
}) {
  return (
    <div className="flex flex-col items-center w-full h-fit mt-3 mb-2">
      {/* title */}
      <div className=" text-justify px-1 text-sm text-light w-full bg-dark/90 rounded-md py-1">
        {title}
      </div>
      <div className="flex items-center justify-between w-full h-fit text-light text-xs py-2 px-1">
        {moment(date).format("yyyy-MM-DD hh:mm a")}
        {
          <AiOutlineArrowRight
            className="w-[20px] h-[20px] text-lg text-light cursor-pointer hover:text-secondary "
            onClick={action}
          ></AiOutlineArrowRight>
        }
      </div>
      <div className="flex w-6/12 h-[1px]">
        <div className="w-6/12 h-[1px] bg-gradient-to-l from-light to-dark"></div>
        <div className="w-6/12 h-[1px] bg-gradient-to-r from-light to-dark"></div>
      </div>
    </div>
  );
}

export default NoteCard;
