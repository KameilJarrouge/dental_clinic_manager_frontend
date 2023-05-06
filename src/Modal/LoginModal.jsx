import React from "react";
import AppModal from "./AppModal";
import LoginForm from "../components/LoginForm";

function LoginModal({ open, onClose }) {
  return (
    <AppModal
      closeModal={onClose}
      className="outline-none rounded-lg fixed top-0 left-0 ml-auto min-h-fit  right-0 mr-auto w-96  bg-primary  shadow-md shadow-black border-[2px] border-primary z-20 "
      modalIsOpen={open}
    >
      <LoginForm next={onClose}></LoginForm>
    </AppModal>
  );
}

export default LoginModal;
