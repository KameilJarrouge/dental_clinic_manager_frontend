import React from "react";
import AppModal from "./AppModal";
import XrayAddForm from "../form/XrayAddFrom";
function CreateXrayModal({ open, onClose, id = 0, viewedPatientId }) {
  return (
    <AppModal
      closeModal={onClose}
      className="outline-none rounded-xl fixed  m-auto left-0 right-0 top-14  h-fit  min-w-[30%] 2xl:min-w-[25%]  w-fit  bg-secondary  shadow-md shadow-black border-[2px] border-primary z-20 "
      modalIsOpen={open}
    >
      <XrayAddForm
        onClose={onClose}
        id={id}
        patientId={viewedPatientId}
      ></XrayAddForm>
    </AppModal>
  );
}

export default CreateXrayModal;
