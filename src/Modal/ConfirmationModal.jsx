import React from "react";
import AppModal from "./AppModal";
import LoginForm from "../components/LoginForm";

function ConfirmationModal({
  open,
  onClose,
  onConfirm = (f) => f,
  message = "confirmation message goes here",
}) {
  return (
    <AppModal
      closeModal={onClose}
      className="outline-none rounded-lg fixed top-0 left-0 ml-auto min-h-fit  right-0 mr-auto w-96  bg-primary  shadow-md shadow-black border-[2px] border-primary "
      modalIsOpen={open}
    >
      <div className=" w-full h-full flex flex-col p-1 mt-2">
        <span className="w-full flex justify-center items-center text-light font-bold">
          {message}
        </span>
        <div className="flex justify-center items-center w-full mt-4 mb-2">
          <button
            className={`w-1/3  py-1 mx-1 rounded-md  font-bold hover:text-light  hover:bg-gradient-to-bl hover:from-primary hover:to-dark  text-primary bg-light outline-none`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            OK
          </button>
          <button
            className={`w-1/3  py-1 mx-1 rounded-md  font-bold hover:text-light  hover:bg-gradient-to-bl hover:from-primary hover:to-dark  text-primary bg-light outline-none`}
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default ConfirmationModal;
