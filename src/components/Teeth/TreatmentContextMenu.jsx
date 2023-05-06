import React from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { TbDentalOff } from "react-icons/tb";
import OptionCard from "../OptionCard";
import TreatmentMenuCard from "../TreatmentMenuCard";

function TreatmentContextMenu({ number, options = [] }) {
  // console.log(badges);
  return (
    <div className="w-fit min-w-fit 2xl:min-w-fit h-fit flex flex-col gap-2  items-center justify-center text-light">
      <div className="w-full h-fit flex  text-white items-center justify-center">
        <div className=" flex items-center">
          <BiChevronsLeft
            className={"w-[20px]   h-fit text-accent"}
          ></BiChevronsLeft>
          <div className="">{number}</div>
          <BiChevronsRight
            className={"w-[20px]   h-fit text-accent"}
          ></BiChevronsRight>
        </div>
      </div>
      <div className="w-full h-[1px] bg-accent" />
      <div className="w-full px-1 max-h-[20rem]   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin      ">
        {options.length === 0 && <div>No Treatments Yet </div>}
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className="flex flex-col  items-center justify-center"
            >
              <OptionCard option={option.name} onClick={option.onClick} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TreatmentContextMenu;
