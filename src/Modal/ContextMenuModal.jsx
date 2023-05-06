import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
  },
};

Modal.setAppElement("#root2");

const ContextMenuModal = ({
  children,
  modalIsOpen,
  afterOpenModal,
  closeModal,
  label,
  className,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel={label}
      className={" min-h-fit   w-fit bg-transparent"}
      overlayClassName={"fixed top-0 bottom-0 right-0 left-0 z-50  "}
      shouldCloseOnOverlayClick={true}
    >
      <div id="contextMenu" className={className}>
        {children}
      </div>
    </Modal>
  );
};

export default ContextMenuModal;
