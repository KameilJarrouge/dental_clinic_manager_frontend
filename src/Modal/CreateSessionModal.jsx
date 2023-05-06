import React from "react";
import AppModal from "./AppModal";
import CheckupAddForm from "../form/CheckupAddForm";
import SessionAddForm from "../form/SessionAddForm";
function CreateSessionModal({ open, onClose, id = 0, viewedTreatmentId }) {
  return (
    <AppModal
      closeModal={onClose}
      className="outline-none rounded-xl fixed  m-auto left-0 right-0 top-14  h-fit  min-w-[30%] 2xl:min-w-[25%]  w-fit  bg-secondary  shadow-md shadow-black border-[2px] border-primary z-20 "
      modalIsOpen={open}
    >
      <SessionAddForm
        onClose={onClose}
        id={id}
        treatmentId={viewedTreatmentId}
      />
    </AppModal>
  );
}

export default CreateSessionModal;
