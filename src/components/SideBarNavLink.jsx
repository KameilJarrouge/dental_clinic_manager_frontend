import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

function SideBarNavLink({ to, icon, subtitle }) {
  return (
    <NavLink
      to={"/" + to}
      className={(isActive) => {
        return isActive.isActive ? "text-accent " : "text-light ";
      }}
    >
      <div className="flex flex-col  group items-center ">
        {icon}
        <div className="invisible group-hover:visible text-xs 2xl:text-sm text-center transition-all ">
          {subtitle}
        </div>
      </div>
    </NavLink>
  );
}

export default SideBarNavLink;
