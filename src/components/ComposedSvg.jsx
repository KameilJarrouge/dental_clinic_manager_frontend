import React from "react";

function ComposedSvg({ title = "", color, link, action, children }) {
  return (
    <div className="flex justify-center items-center group  gap-1 cursor-pointer">
      {children}
      {/* <div className={`hidden 2xl:group-hover:inline ${color} `}>{title}</div> */}
    </div>
  );
}

export default ComposedSvg;
