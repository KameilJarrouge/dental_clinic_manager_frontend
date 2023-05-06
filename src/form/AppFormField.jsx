import { useFormikContext } from "formik";
import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, title = "", svg = null, ...otherProps }) {
  const [focused, setFocuesd] = useState(false);
  // const [dir, setDir] = useState("ltr");

  const { handleChange, setFieldTouched, values, touched, errors } =
    useFormikContext();

  return (
    <div className={`text-left my-2 flex flex-col shrink w-full`}>
      <div className={`flex flex-col text-light   `}>
        {/* title */}
        <div
          className={`
             font-bold text-sm 2xl:text-base flex justify-start items-center gap-2 border-b-2 
          ${
            focused
              ? "border-b-light   transition-all duration-500  font-bold   "
              : "border-b-transparent"
          }`}
        >
          {svg}
          {title}
        </div>
        {/* input */}
        <input
          dir={"auto"}
          onFocus={() => {
            setFocuesd(true);
          }}
          // onKeyDown={(e) => changeDirection(e, setDir)}
          className={`mt-2 bg-light text-primary rounded-sm px-2 py-0.5 border-none  outline-none`}
          onChange={handleChange(name)}
          onBlur={() => {
            setFieldTouched(name);
            setFocuesd(false);
          }}
          {...otherProps}
          value={values[name]}
        />
      </div>
      <ErrorMessage visible={touched[name]} error={errors[name]}></ErrorMessage>
    </div>
  );
}

export default AppFormField;
