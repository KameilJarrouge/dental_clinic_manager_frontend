import { useFormikContext } from "formik";
import React, { useState } from "react";

import DateTimePicker from "react-datetime-picker";
import ErrorMessage from "./ErrorMessage";

function AppFormDatePicker({
  name,
  className = "",
  title = "",
  svg = null,
  ...otherProps
}) {
  const { setFieldValue, touched, errors, values, setFieldTouched } =
    useFormikContext();
  const [focused, setFocuesd] = useState(false);

  return (
    <div className={`text-left my-2 flex flex-col  shrink w-full`}>
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
        <div className=" mt-2 w-full bg-light text-center">
          <DateTimePicker
            onFocus={() => {
              setFocuesd(true);
            }}
            onKeyDown={(e) => changeDirection(e, setDir)}
            className={`w-full  h-full p-1 text-primary rounded-sm  border-none  outline-none`}
            onChange={(value) => setFieldValue(name, value)}
            onBlur={() => {
              setFieldTouched(name);
              setFocuesd(false);
            }}
            value={values[name]}
            format="yyyy/MM/dd"
            disableClock={true}
            maxDate={new Date("2099-12-31")}
            calendarIcon={null}
            clearIcon={null}
          />
        </div>
      </div>
      <ErrorMessage visible={touched[name]} error={errors[name]}></ErrorMessage>
    </div>
  );
}

export default AppFormDatePicker;
