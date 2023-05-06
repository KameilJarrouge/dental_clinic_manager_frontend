import moment from "moment";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ToothBadge from "./Teeth/ToothBadge";

function OptionCard({ option = "test", onClick = (f) => f }) {
  return (
    <>
      <div className=" w-full px-1 py-0.5">
        <div
          onClick={onClick}
          className="hover:bg-light/10 px-1 rounded-md cursor-pointer"
        >
          {option}
        </div>
      </div>
    </>
  );
}

export default OptionCard;
