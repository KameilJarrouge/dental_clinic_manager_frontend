import React, { useContext, useEffect, useState } from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { CiSquareCheck, CiSquareMinus } from "react-icons/ci";
import { ModalsContext } from "../../context/modalsContext";
import numberToTooth from "../../helpers/numberToTooth";
import { CREATE_MODE, SELECT_MODE, VIEW_MODE } from "./Jaw";
import Tooth1 from "./Tooth1";
import Tooth2 from "./Tooth2";
import Tooth3 from "./Tooth3";
import Tooth4 from "./Tooth4";
import Tooth5 from "./Tooth5";
import Tooth6 from "./Tooth6";
import Tooth7 from "./Tooth7";
import Tooth8 from "./Tooth8";
import ToothBadge from "./ToothBadge";
import ToothNote from "./ToothNote";

function ToothTest({
  id = 0,
  number = 51,
  className,
  mode,
  selectedTeeth,
  note,
  badges,
  onClick = (f) => f,
  onContextMenu = (f) => f,
}) {
  let { index, rotation, coords } = numberToTooth(number);

  // array of Teeth jsx tags
  let teeth = [
    <Tooth1 />,
    <Tooth2 />,
    <Tooth3 />,
    <Tooth4 />,
    <Tooth5 />,
    <Tooth6 />,
    <Tooth7 />,
    <Tooth8 />,
  ];
  const [selected, setselected] = useState(
    mode !== CREATE_MODE && selectedTeeth.hasOwnProperty(number)
  );
  useEffect(() => {
    setselected(mode !== CREATE_MODE && selectedTeeth.hasOwnProperty(number));
  }, [selectedTeeth]);

  return (
    <>
      <div
        onContextMenu={(e) =>
          onContextMenu(id, number, e, selected, note, badges, setselected)
        }
        className={`${className} relative group ${coords.tooth}`}
        onClick={(e) =>
          onClick(selected, setselected, id, number, e, note, badges)
        }
      >
        <div
          className={`absolute   
          ${
            selected
              ? mode === CREATE_MODE
                ? id === 0
                  ? "stroke-green-700"
                  : "stroke-black"
                : id !== 0
                ? "stroke-blue-600"
                : "stroke-none"
              : id === 0
              ? "stroke-none"
              : "stroke-black"
          } fill-secondary ${id === 0 && "hover:stroke-green-600"}`}
        >
          {teeth[index - 1]}
        </div>
        <div
          className={`absolute ${rotation} ${coords.badge}  flex gap-1 flex-wrap  items-center invisible  group-hover:visible  `}
        >
          {id !== 0 && mode !== CREATE_MODE && (
            <>
              {badges.length === 0 && <ToothBadge empty />}
              {badges.map((badge, index) => (
                <ToothBadge
                  key={index}
                  isFinished={badge.CoursePatient.isFinished}
                  isOld={badge.CoursePatient.isOld}
                  color={badge.CoursePatient.Course.colorIndex}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ToothTest;
