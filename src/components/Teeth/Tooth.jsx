import React, { useState } from "react";
import numberToTooth from "../../helpers/numberToTooth";
import Tooth1 from "./Tooth1";
import Tooth2 from "./Tooth2";
import Tooth3 from "./Tooth3";
import Tooth4 from "./Tooth4";
import Tooth5 from "./Tooth5";
import Tooth6 from "./Tooth6";
import Tooth7 from "./Tooth7";
import Tooth8 from "./Tooth8";
import ToothBadge from "./ToothBadge";

function Tooth({
  id = 0,
  number = 51,
  className,
  selectable = true,
  selfRotate = false,
  ...otherProps
}) {
  const [selected, setselected] = useState(false);
  const selectTooth = () => {
    if (selectable) {
      setselected(!selected);
    }
  };
  const getTooth = (badges) => {
    let { index, rotation, isBabyTooth } = numberToTooth(number);
    switch (Number(index)) {
      case 1:
        return (
          <Tooth1
            className={`${className}  ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            } ${isBabyTooth ? "fill-red-200" : "fill-secondary"}`}
            selfRotate={selfRotate}
            number={number}
            onClick={() => {
              selectTooth();
            }}
            children={badges}
            rotation={rotation}
            {...otherProps}
          />
        );

      case 2:
        return (
          <Tooth2
            className={`${className}  ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            } ${isBabyTooth ? "fill-red-200" : "fill-secondary"}`}
            selfRotate={selfRotate}
            number={number}
            rotation={rotation}
            onClick={() => {
              selectTooth();
            }}
            children={badges}
            {...otherProps}
          />
        );

      case 3:
        return (
          <Tooth3
            className={`${className}  ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            } ${isBabyTooth ? "fill-red-200" : "fill-secondary"}`}
            selfRotate={selfRotate}
            number={number}
            rotation={rotation}
            onClick={() => {
              selectTooth();
            }}
            children={badges}
            {...otherProps}
          />
        );

      case 4:
        return (
          <Tooth4
            className={`${className}  fill-secondary ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            }`}
            selfRotate={selfRotate}
            number={number}
            rotation={rotation}
            children={badges}
            onClick={() => {
              selectTooth();
            }}
            {...otherProps}
          />
        );

      case 5:
        return (
          <Tooth5
            className={`${className}  fill-secondary ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            }`}
            selfRotate={selfRotate}
            number={number}
            rotation={rotation}
            children={badges}
            onClick={() => {
              selectTooth();
            }}
            {...otherProps}
          />
        );

      case 6:
        return (
          <Tooth6
            className={`${className}  ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            } ${isBabyTooth ? "fill-red-200" : "fill-secondary"}`}
            selfRotate={selfRotate}
            number={number}
            rotation={rotation}
            children={badges}
            onClick={() => {
              selectTooth();
            }}
            {...otherProps}
          />
        );

      case 7:
        return (
          <Tooth7
            className={`${className}  ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            } ${isBabyTooth ? "fill-red-200" : "fill-secondary"}`}
            selfRotate={selfRotate}
            number={number}
            rotation={rotation}
            children={badges}
            onClick={() => {
              selectTooth();
            }}
            {...otherProps}
          />
        );

      case 8:
        return (
          <Tooth8
            className={`${className}  fill-secondary ${
              selected
                ? "stroke-blue-600"
                : id === 0
                ? "stroke-none"
                : "stroke-black"
            }`}
            selfRotate={selfRotate}
            number={number}
            rotation={rotation}
            children={badges}
            onClick={() => {
              selectTooth();
            }}
            {...otherProps}
          />
        );
    }
  };
  return getTooth(
    <>
      <ToothBadge color={1}></ToothBadge>
      <ToothBadge color={2}></ToothBadge>
      <ToothBadge color={3}></ToothBadge>
      <ToothBadge color={4}></ToothBadge>
      <ToothBadge color={5}></ToothBadge>
      <ToothBadge color={6}></ToothBadge>
      <ToothBadge color={7}></ToothBadge>
      <ToothBadge color={8}></ToothBadge>
      <ToothBadge color={9}></ToothBadge>
    </>
  );
}

export default Tooth;
