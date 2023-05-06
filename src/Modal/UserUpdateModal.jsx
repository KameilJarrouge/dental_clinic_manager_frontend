import React from "react";
import AppModal from "./AppModal";
import UserUpdateForm from "../components/UserUpdateForm";

function UserUpdateModal({ open, onClose }) {
  return (
    <AppModal
      closeModal={onClose}
      className="outline-none rounded-lg fixed top-0 left-0 ml-auto min-h-fit  right-0 mr-auto w-96  bg-primary  shadow-md shadow-black border-[2px] border-primary z-20 "
      modalIsOpen={open}
    >
      <UserUpdateForm next={onClose}></UserUpdateForm>
    </AppModal>
  );
}

export default UserUpdateModal;
