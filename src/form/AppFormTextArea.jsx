import { useFormikContext } from "formik";
import React, { useState } from "react";

function AppFormTextArea({ name, title = "", svg = null, ...otherProps }) {
  const [focused, setFocuesd] = useState(false);
  // const [dir, setDir] = useState("rtl");
  const { handleChange, setFieldTouched, values } = useFormikContext();

  return (
    <div className={`text-left my-2 flex flex-col shrink w-full`}>
      <div className={`flex flex-col text-light   `}>
        {/* title */}
        <div
          className={`
             font-bold text-sm 2xl:text-base flex justify-start items-center gap-2  border-b-2 
          ${
            focused
              ? "border-b-light  transition-all duration-500  font-bold   "
              : "border-b-transparent"
          }`}
        >
          {svg}
          {title}
        </div>
        {/* input */}
        <textarea
          dir="auto"
          // onKeyDown={(e) => e.altKey && changeDirection(e, setDir)}
          onFocus={() => {
            setFocuesd(true);
          }}
          className={`mt-2 bg-light  text-primary min-h-[5rem] max-h-[10rem] 2xl:min-h-[10rem] 2xl:max-h-[20rem]  rounded-sm px-2 py-1   outline-none  resize-y`}
          onChange={handleChange(name)}
          onBlur={() => {
            setFieldTouched(name);
            setFocuesd(false);
          }}
          maxLength={1000}
          {...otherProps}
          value={values[name]}
        />
      </div>
    </div>
  );
}

export default AppFormTextArea;
