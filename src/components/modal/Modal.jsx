// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, setIsOpen, setModal1,setModal2, setModal3,setModal4,setSelectedServices,setSelectedBarber,children }) => {

  const closeModal = () => {

    setIsOpen(false)
    setModal1(false)
    setModal2(false)
    setModal3(false)
    setModal4(false)
    setSelectedServices([])
    setSelectedBarber(null)
  }

  return ReactDOM.createPortal(
    <div className="main__modal__container">
      <div>
        <div className="modal__content">
            <button onClick={closeModal} className='main__modal__close' style={{cursor:"pointer"}}><MdClose /></button>
            <br/>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('overlays') // Ensure you have a div with id="modal-root" in your HTML file
  );
};

export default Modal;