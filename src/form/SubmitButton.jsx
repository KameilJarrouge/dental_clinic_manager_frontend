import { useFormikContext } from "formik";
import React from "react";

function SubmitButton({ title = null, svg = null, before = (f) => f }) {
  const { handleSubmit, errors, isValidating } = useFormikContext();

  return (
    <button
      type="submit"
      className={`w-fit min-w-[1rem]  2xl:min-w-[3rem] px-2 2xl:px-4 py-1 mt-3 rounded-md 2xl:text-lg   border-2  font-bold transition-all 
      flex justify-center gap-1
      hover:text-green-700 focus:border-green-700  border-dark hover:border-primary  hover:bg-gradient-to-bl hover:from-primary hover:to-dark  text-primary bg-light outline-none  `}
      onClick={() => {
        before();
        handleSubmit();
      }}
    >
      {title}
      <div className="flex justify-center items-center gap-1 ">{svg}</div>
    </button>
  );
}

export default SubmitButton;
