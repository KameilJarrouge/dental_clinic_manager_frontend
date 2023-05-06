import { useFormikContext } from "formik";
import React from "react";

function ClearButton({ title = null, svg = null }) {
  const { resetForm } = useFormikContext();

  return (
    <button
      type="button"
      className={`w-fit min-w-[1rem]  2xl:min-w-[3rem] px-2 2xl:px-4 py-1 mt-3 rounded-md 2xl:text-lg   border-2  font-bold transition-all 
      flex justify-center gap-1
      hover:text-red-600  focus:border-red-900 border-dark hover:border-primary  hover:bg-gradient-to-bl hover:from-primary hover:to-dark  text-red-900 bg-light outline-none  `}
      onClick={resetForm}
    >
      {title}
      {svg}
    </button>
  );
}

export default ClearButton;
