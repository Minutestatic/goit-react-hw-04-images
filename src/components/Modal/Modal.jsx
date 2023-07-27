import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;
