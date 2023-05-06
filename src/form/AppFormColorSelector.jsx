import { useFormikContext } from "formik";
import React from "react";
import ToothBadge from "../components/Teeth/ToothBadge";

function AppFormColorSelector({ name, svg = null, title = "" }) {
  const { setFieldValue, touched, errors, values } = useFormikContext();
  let colors = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className={`text-left my-2 flex flex-col shrink w-full`}>
      <div className={`flex flex-col text-light   `}>
        {/* title */}
        <div
          className={`
             font-bold text-sm 2xl:text-base flex justify-start items-center gap-2 border-b-2 border-b-white border-b-transparent`}
        >
          {svg}
          {title}
        </div>
        {/* input */}
        <div className="grid grid-cols-5 grid-rows-4 gap-1 mt-2">
          {colors.map((index) => (
            <div
              key={index}
              onClick={() => setFieldValue(name, index)}
              className={`p-3 bg-dark rounded-lg flex justify-center items-center  ${
                values[name] === index && "bg-secondary"
              } cursor-pointer`}
            >
              <ToothBadge color={index}></ToothBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppFormColorSelector;
