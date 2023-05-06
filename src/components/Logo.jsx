import React from "react";
import { ReactComponent as MyLogo } from "../assets/logo.svg";
function Logo() {
  return (
    <div className="w-fit h-full py-2 px-4 2xl:px-5 text-secondary flex justify-start items-center gap-2 ">
      <MyLogo className="w-[2rem] 2xl:w-[2.5rem] h-full hover:animate-slowSpinOnce"></MyLogo>
      <div className="font-openSans-bold font-extrabold text-lg select-none">
        Dental Clinic
      </div>
    </div>
  );
}

export default Logo;
