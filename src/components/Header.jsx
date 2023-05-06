import { NavBarLoginLogoutButton } from "./NavBarLoginLogoutButton";
import { NavBarSearch } from "./NavBarSearch";
import React, { useState } from "react";
import Logo from "./Logo";
import { UpdateUserButton } from "./UpdateUserButton";

function Header() {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex justify-start items-center w-full ">
      {/* logo */}
      <div className="w-[20%] flex justify-start">
        <Logo></Logo>
      </div>
      {/* search */}
      <div className="w-[60%] flex justify-center">
        <NavBarSearch focused={focused} setFocused={setFocused} />
      </div>

      {/* login/logout */}
      <div className="w-[20%] flex justify-end pr-4">
        <UpdateUserButton />
        <NavBarLoginLogoutButton />
      </div>
    </div>
  );
}

export default Header;
