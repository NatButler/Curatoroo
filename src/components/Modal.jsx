import React, { useState, useRef, useEffect } from 'react';
import Close from '../assets/close.svg?react';
import './Modal.css';

function Modal({ isOpen, hasCloseBtn = true, onClose, children }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (ev) => {
    if (ev.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
      {hasCloseBtn && (
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleCloseModal}
          title="Close"
          aria-label="Close modal"
        >
          <Close />
        </button>
      )}
      {children}
    </dialog>
  );
}

export default Modal;
