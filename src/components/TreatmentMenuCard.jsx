import moment from "moment";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ToothBadge from "./Teeth/ToothBadge";

function TreatmentMenuCard({
  id = 0,
  colorIndex = 1,
  effectName = "",
  createdAt = "",
  finishedAt = "",
  isFinished = false,
  isOld = false,
}) {
  return (
    <>
      <div className="flex gap-4 w-full justify-start items-center">
        <ToothBadge color={colorIndex} isFinished={isFinished} isOld={isOld} />
        {effectName}
      </div>
      <div className="w-full text-sm flex justify-end items-center gap-1 text-white">
        <div>{moment(createdAt).format("yyyy-MM-DD")}</div>
        {!isOld && (
          <>
            <BsArrowRight></BsArrowRight>
            <div className="text-red-500">
              {finishedAt ? moment(finishedAt).format("yyyy-MM-DD") : "?"}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TreatmentMenuCard;
