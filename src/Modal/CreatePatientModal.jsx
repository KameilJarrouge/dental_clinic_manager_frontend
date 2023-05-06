import React from "react";
import AppModal from "./AppModal";
import PatientAddForm from "../form/PatientAddForm";
function CreatePatientModal({ open, onClose }) {
  return (
    <AppModal
      closeModal={onClose}
      className="outline-none rounded-xl fixed  m-auto left-0 right-0 top-0 bottom-0 max-h-[90%]  w-fit min-w-[50%]  bg-secondary  shadow-md shadow-black border-[2px] border-primary z-20 "
      modalIsOpen={open}
    >
      <PatientAddForm afterSubmit={onClose}></PatientAddForm>
    </AppModal>
  );
}

export default CreatePatientModal;
