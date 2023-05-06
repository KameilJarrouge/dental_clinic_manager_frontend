import React, { useContext } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { removeToken } from "../api/token";
import { LoginModalContext } from "../context/loginModalContext";

export function NavBarLoginLogoutButton({}) {
  const { loginModal, loggedIn, setLoggedIn } = useContext(LoginModalContext);

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
          if (loggedIn) {
            removeToken();
            loginModal(false);
            setLoggedIn(false);
          } else {
            loginModal(true);
          }
        }}
      >
        {!loggedIn ? (
          <FiLogIn className="w-[25px]   h-[25px] group-hover:animate-wiggle"></FiLogIn>
        ) : (
          <FiLogOut className="w-[25px]   h-[25px] group-hover:animate-wiggle"></FiLogOut>
        )}
        <div className="hidden group-hover:inline  overflow-hidden scrollbar-none ">
          {!loggedIn ? "Login" : "Logout"}
        </div>
      </button>
    </div>
  );
}
