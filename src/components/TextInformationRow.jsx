import React from "react";

function TextInformationRow({ title, data }) {
  return (
    <div
      className="flex w-full  h-fit gap-1 py-1 px-2 justify-between items-center rounded-md  bg-secondary shadow-md shadow-dark
    border-[1px] border-dark/20"
    >
      <div className="font-bold  w-fit min-w-[6em] ">{title + ":"} </div>
      <div className="w-full">{data}</div>
    </div>
  );
}

export default TextInformationRow;
