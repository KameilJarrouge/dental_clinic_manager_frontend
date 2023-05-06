import React from "react";

function ATCVisitNumber({ number = 3 }) {
  return (
    <div className="px-1 rounded-lg border-2 border-dark text-xs 2xl:text-sm text-center  font-bold ">
      {number}
    </div>
  );
}

export default ATCVisitNumber;
