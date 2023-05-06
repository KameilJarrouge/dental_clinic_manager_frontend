import React from "react";

function TwoPanels({ left = null, right = null }) {
  return (
    <div className="w-full h-full flex gap-2">
      <div className="w-1/2 h-full">{left}</div>
      <div className="w-1/2 h-full">{right}</div>
    </div>
  );
}

export default TwoPanels;
