import React from "react";
import {
  AiOutlineHome,
  AiOutlineMacCommand,
  AiOutlineMedicineBox,
  AiOutlineUser,
} from "react-icons/ai";
import SideBarNavLink from "./SideBarNavLink";
import SmartCommandList from "./SmartCommandList";
function Sidebar() {
  return (
    <div
      className={`w-fit h-full  flex flex-col justify-start py-5 2xl:py-10 gap-5  `}
    >
      {/* nav */}
      <div
        className={`w-fit px-1 min-w-[4em] h-fit mx-2 2xl:mx-3 bg-dark/90 rounded-xl  flex flex-col items-center gap-2 2xl:gap-5 py-5 border-l-4 border-accent `}
      >
        <SideBarNavLink
          to={"home"}
          icon={
            <AiOutlineHome className="w-[1.7rem] 2xl:w-[1.9rem] h-fit "></AiOutlineHome>
          }
          subtitle="Home"
        ></SideBarNavLink>

        <SideBarNavLink
          to={"patients"}
          icon={
            <AiOutlineUser className="w-[1.7rem] 2xl:w-[1.9rem] h-fit "></AiOutlineUser>
          }
          subtitle="Patients"
        ></SideBarNavLink>

        <SideBarNavLink
          to={"courses"}
          icon={
            <AiOutlineMedicineBox className="w-[1.7rem] 2xl:w-[1.9rem] h-fit "></AiOutlineMedicineBox>
          }
          subtitle="Courses"
        ></SideBarNavLink>
      </div>
      {/* commands */}
      <SmartCommandList></SmartCommandList>
    </div>
  );
}

export default Sidebar;
