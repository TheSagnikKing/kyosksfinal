// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import { MdClose } from "react-icons/md";
import { ClickAwayListener } from '@mui/material';

const Modal = ({ isOpen, setIsOpen, setModal1, setModal2, setModal3, setModal4, setSelectedServices, setSelectedBarber, children }) => {

  const closeModal = () => {

    setIsOpen(false)
    setModal1(false)
    setModal2(false)
    setModal3(false)
    setModal4(false)
    setSelectedServices([])
    setSelectedBarber(false)
  }

  return ReactDOM.createPortal(
    <>

      <div className={style.main__modal__container}>
        <ClickAwayListener onClickAway={closeModal}>
          <div>
            <div className={style.modal__content}>
              <button onClick={closeModal} className={style.main__modal__close} style={{ cursor: "pointer" }}><MdClose /></button>
              <br />
              {children}
            </div>
          </div>
        </ClickAwayListener>
      </div>

    </>,
    document.getElementById('overlays')
  );
};

export default Modal;