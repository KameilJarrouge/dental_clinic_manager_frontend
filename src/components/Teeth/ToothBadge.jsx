import React, { useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import {
  BsFillCircleFill,
  BsFillSquareFill,
  BsFillTriangleFill,
} from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
export const colors = {
  1: "text-badge-1",
  2: "text-badge-2",
  3: "text-badge-3",
  4: "text-badge-4",
  5: "text-badge-5",
  6: "text-badge-6",
  7: "text-badge-7",
  8: "text-badge-8",
  9: "text-badge-9",
  10: "text-badge-10",
  11: "text-badge-11",
  12: "text-badge-12",
  13: "text-badge-13",
  14: "text-badge-14",
  15: "text-badge-15",
  16: "text-badge-16",
  17: "text-badge-17",
  18: "text-badge-18",
  19: "text-badge-19",
  20: "text-badge-20",
};
function ToothBadge({
  color = 1,
  isOld = false,
  isFinished = true,
  empty = false,
}) {
  const getBadge = () => {
    switch (color) {
      case 1:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-1 `}></div>
        );
      case 2:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-2 `}></div>
        );
      case 3:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-3 `}></div>
        );
      case 4:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-4 `}></div>
        );
      case 5:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-5 `}></div>
        );
      case 6:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-6 `}></div>
        );
      case 7:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-7 `}></div>
        );
      case 8:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-8 `}></div>
        );
      case 9:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-9 `}></div>
        );
      case 10:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-10 `}></div>
        );
      case 11:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-11 `}></div>
        );
      case 12:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-12 `}></div>
        );
      case 13:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-13 `}></div>
        );
      case 14:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-14 `}></div>
        );
      case 15:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-15 `}></div>
        );
      case 16:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-16 `}></div>
        );
      case 17:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-17 `}></div>
        );
      case 18:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-18 `}></div>
        );
      case 19:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-19 `}></div>
        );
      case 20:
        return (
          <div className={`w-[8px] h-[8px] rounded-full bg-badge-20 `}></div>
        );
    }
  };
  return (
    <>
      {empty ? (
        <BiHelpCircle
          className={`w-[24px] h-[24px] text-white `}
        ></BiHelpCircle>
      ) : isOld ? (
        <BsFillSquareFill
          className={`w-[8px] h-[8px]  ${colors[color]} `}
        ></BsFillSquareFill>
      ) : isFinished ? (
        <BsFillCircleFill
          className={`w-[8px] h-[8px]  ${colors[color]} `}
        ></BsFillCircleFill>
      ) : (
        <BsFillTriangleFill
          className={`w-[8px] h-[8px] rotate-90  ${colors[color]} `}
        ></BsFillTriangleFill>
      )}
    </>
  );
}

export default ToothBadge;
