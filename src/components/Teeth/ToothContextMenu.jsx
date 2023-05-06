import React from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { TbDentalOff } from "react-icons/tb";
import TreatmentMenuCard from "../TreatmentMenuCard";

function ToothContextMenu({ onDelete = (f) => f, number, badges = [] }) {
  // console.log(badges);
  return (
    <div className="w-fit min-w-[15rem] 2xl:min-w-[20rem] h-fit flex flex-col gap-2  items-center justify-center text-light">
      <div className="w-full h-fit flex  text-white items-center justify-between">
        <div className=" flex items-center">
          <BiChevronsLeft
            className={"w-[20px]   h-fit text-accent"}
          ></BiChevronsLeft>
          <div className="">{number}</div>
          <BiChevronsRight
            className={"w-[20px]   h-fit text-accent"}
          ></BiChevronsRight>
        </div>
        <div>Treatments</div>
        <TbDentalOff
          onClick={onDelete}
          className="w-[20px]   h-fit cursor-pointer hover:text-red-600 transition-all"
        ></TbDentalOff>
      </div>
      <div className="w-full h-[1px] bg-accent" />
      <div className="w-full px-1 max-h-[20rem]   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin      ">
        {badges.length === 0 && <div>No Treatments Yet </div>}
        <ul>
          {badges.map((badge, index) => (
            <li
              key={index}
              className="flex flex-col  items-center justify-center"
            >
              <TreatmentMenuCard
                key={index}
                createdAt={badge.CoursePatient.createdAt}
                finishedAt={badge.CoursePatient.finishedAt}
                isFinished={badge.CoursePatient.isFinished}
                isOld={badge.CoursePatient.isOld}
                effectName={badge.CoursePatient.Course.effectName}
                colorIndex={badge.CoursePatient.Course.colorIndex}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToothContextMenu;
