import React, { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { removeToken } from "../api/token";
import { LoginModalContext } from "../context/loginModalContext";

export function UpdateUserButton({}) {
  const { setUpdateUserModalOn } = useContext(LoginModalContext);

  return (
    <div className="">
      <button
        className="
          w-fit
          flex items-center
          group
          gap-1
          px-2 py-1
          font-bold text-lg
          transition-all
          
        bg-dark  text-accent  
          rounded-xl outline-none
        hover:bg-accent hover:text-dark"
        onClick={() => {
          setUpdateUserModalOn(true);
        }}
      >
        <AiOutlineUser className="w-[25px]   h-[25px] group-hover:animate-wiggle"></AiOutlineUser>

        <div className="hidden group-hover:inline  overflow-hidden scrollbar-none ">
          {"User"}
        </div>
      </button>
    </div>
  );
}
