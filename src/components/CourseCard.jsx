import React, { useContext } from "react";
import ATCHeader from "./ActiveTreatmentCard/ATCHeader";
import ToothBadge from "./Teeth/ToothBadge";
import Tooth2 from "./Teeth/Tooth2";
import { ModalsContext } from "../context/modalsContext";

function CourseCard({
  id,
  name = "Wisdom Tooth Removal",
  effectName = "Wisdom Tooth Removed",
  colorIndex = 1,
}) {
  const { setSelectedId, setCreateCourseModalOn } = useContext(ModalsContext);
  return (
    <div className="min-h-[10rem] min-w-[18rem] w-[20%]  flex-grow h-fit bg-secondary/70 shadow-md border border-dark/40 shadow-dark rounded-lg flex flex-col justify-between p-2 gap-2">
      <div className="flex flex-col gap-2">
        <ATCHeader
          title={
            <div
              className="cursor-pointer w-full"
              onClick={() => {
                setSelectedId(id);
                setCreateCourseModalOn(true);
              }}
            >
              {name}
            </div>
          }
          dark
          direction="left"
        ></ATCHeader>
        {/* info */}
        <div className="flex gap-1 p-1 rounded-md  bg-secondary shadow-md shadow-dark">
          <div className="font-bold">Effect Name: </div>
          {effectName}
        </div>
        <div className="stroke-black fill-transparent w-full flex flex-wrap justify-start items-center gap-4 mt-4   ">
          {/* old */}
          <div className="flex gap-2 justify-center items-center px-2 py-1 bg-dark/10 rounded-md hover:bg-dark hover:stroke-light hover:text-light ">
            <Tooth2></Tooth2>
            <ToothBadge color={colorIndex} isOld></ToothBadge>
          </div>
          {/* in progress */}
          <div className="flex gap-2 justify-center items-center px-2 py-1 bg-dark/10 rounded-md hover:bg-dark hover:stroke-light hover:text-light">
            <Tooth2></Tooth2>
            <ToothBadge color={colorIndex} isFinished={false}></ToothBadge>
          </div>
          {/* finished */}
          <div className="flex gap-2 justify-center items-center px-2 py-1 bg-dark/10 rounded-md hover:bg-dark hover:stroke-light hover:text-light">
            <Tooth2></Tooth2>
            <ToothBadge color={colorIndex}></ToothBadge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
