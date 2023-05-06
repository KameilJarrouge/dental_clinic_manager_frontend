import React from "react";

function Action({ children, title, cursor = "cursor-pointer", ...otherProps }) {
  return (
    <div
      {...otherProps}
      className={`flex group items-center justify-between mx-1 bg-accent rounded-lg border-[2px] border-primary  text-dark min-h-fit  hover:bg-accent/90 transition-all  ${cursor}`}
    >
      {children}
      <div className="w-0 h-0 group-hover:w-fit group-hover:h-fit font-bold text-primary overflow-hidden scrollbar-none  group-hover:px-1 transition-all  ">
        {title}
      </div>
    </div>
  );
}

export default Action;
