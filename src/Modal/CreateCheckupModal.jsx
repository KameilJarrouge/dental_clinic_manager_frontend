import React from "react";
import AppModal from "./AppModal";
import CheckupAddForm from "../form/CheckupAddForm";
function CreateCheckupModal({ open, onClose, id = 0, viewedPatientId }) {
  return (
    <AppModal
      closeModal={onClose}
      className="outline-none rounded-xl fixed  m-auto left-0 right-0 top-14  h-fit  min-w-[30%] 2xl:min-w-[25%]  w-fit  bg-secondary  shadow-md shadow-black border-[2px] border-primary z-20 "
      modalIsOpen={open}
    >
      <CheckupAddForm
        onClose={onClose}
        id={id}
        patientId={viewedPatientId}
      ></CheckupAddForm>
    </AppModal>
  );
}

export default CreateCheckupModal;
