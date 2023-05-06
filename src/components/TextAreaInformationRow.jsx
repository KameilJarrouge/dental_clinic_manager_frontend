import React from "react";

function TextAreaInformationRow({ title, data }) {
  // const [dir, setDir] = useState("rtl");

  return (
    <div
      className="flex flex-col gap-2  w-full  h-fit  py-1 px-2 justify-between items-center rounded-md  bg-secondary shadow-md shadow-dark
    border-[1px] border-dark/20"
    >
      <div className="flex w-full h-fit justify-between">
        <div className="font-bold  w-fit">{title} </div>
      </div>
      <div className="w-full h-[1px] bg-dark"></div>
      <div
        dir={"auto"}
        tabIndex="0"
        // onKeyDown={(e) => e.altKey && changeDirection(e, setDir)}
        className="w-full min-h-[12.5rem] 2xl:min-h-[17.5rem] 2xl:max-h-[25rem] resize-none 2xl:resize-y text-justify  p-2   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin      rounded-sm  "
      >
        {data}
      </div>
    </div>
  );
}

export default TextAreaInformationRow;
