import { useFormikContext } from "formik";
import React from "react";
import Tooth2 from "./Teeth/Tooth2";
import ToothBadge from "./Teeth/ToothBadge";

function ToothBadgePreview({}) {
  const { values } = useFormikContext();

  return (
    <div className="stroke-black fill-transparent w-full flex flex-wrap justify-center items-center gap-4 mt-4  ">
      {/* old */}
      <div className="flex gap-2 justify-center items-center px-1 py-1 bg-secondary rounded-md hover:bg-dark hover:stroke-light hover:text-light  ">
        <Tooth2></Tooth2>
        <ToothBadge color={values["colorIndex"]} isOld></ToothBadge>
      </div>
      {/* in progress */}
      <div className="flex gap-2 justify-center items-center px-1 py-1 bg-secondary rounded-md hover:bg-dark hover:stroke-light hover:text-light ">
        <Tooth2></Tooth2>
        <ToothBadge
          color={values["colorIndex"]}
          isFinished={false}
        ></ToothBadge>
      </div>
      {/* finished */}
      <div className="flex gap-2 justify-center items-center px-1 py-1 bg-secondary rounded-md hover:bg-dark hover:stroke-light hover:text-light ">
        <Tooth2></Tooth2>
        <ToothBadge color={values["colorIndex"]}></ToothBadge>
      </div>
    </div>
  );
}

export default ToothBadgePreview;
