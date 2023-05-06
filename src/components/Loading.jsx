import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Spinner from "../assets/Spinner";

function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-dark/25">
      <div className="rounded-lg bg-white w-fit h-fit text-dark flex justify-center items-center p-4 gap-4 font-bold text-2xl select-none">
        <Spinner></Spinner>
        <div>Loading...</div>
      </div>
    </div>
  );
}

export default Loading;
