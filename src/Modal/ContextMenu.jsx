import React, { useContext, useEffect, useState } from "react";
import ContextMenuModal from "./ContextMenuModal";
import { ModalsContext } from "../context/modalsContext";
import { isInViewport } from "../helpers/isInViewport";

function ContextMenu({
  open = false,
  onClose,
  onConfirm = (f) => f,
  message = "confirmation message goes here",
}) {
  const { contextOn, setContextOn, contextMenuIsOn, setContextMenuIsOn } =
    useContext(ModalsContext);

  useEffect(() => {
    let content = document.getElementById("content");
    if (content) {
      content.style.left = String(contextOn.left + "px");
      content.style.top = String(contextOn.top + "px");
      let { top, left } = isInViewport(content);
      if (top < 0) content.style.top = String(contextOn.top + top - 10 + "px");
      if (left < 0)
        content.style.left = String(contextOn.left + left - 10 + "px");
    }
  }, [contextOn]);

  return open ? (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (
          document.getElementById("content") &&
          !document.getElementById("content").contains(e.target)
        ) {
          onClose();
        }
      }}
      className="fixed top-0 bottom-0 left-0 right-0  z-30"
    >
      <div
        id="content"
        className={
          "absolute w-fit h-fit bg-dark right-0 shadow-lg border-[2px] m-1 border-black shadow-black rounded-xl p-2 z-40"
        }
      >
        {contextOn.content}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ContextMenu;
