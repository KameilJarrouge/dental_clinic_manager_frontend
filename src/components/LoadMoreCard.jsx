import React from "react";

function LoadMoreCard({
  setValue = (f) => f,
  by = 5,
  value,
  length,
  className = "",
}) {
  return (
    <div
      onClick={() => {
        if (value <= length) setValue((value) => value + by);
      }}
      className={`${className} bg-secondary w-full select-none h-full text-lg 2xl:text-xl
       bg-secondary/70 shadow-md border border-dark/40 shadow-dark rounded-lg ${
         value <= length ? "cursor-pointer hover:bg-light" : "hidden"
       }
        flex justify-center items-center font-bold`}
    >
      Load More
    </div>
  );
}

export default LoadMoreCard;
