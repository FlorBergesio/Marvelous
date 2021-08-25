import React from "react";
import './index.css';
import Button from './../button';
 
const Modal = (props) => {
    return (
        <div className="modal">
            <Button
                handleClick={props.closeModal}
                text="Close this window"
            />
            <div className="modal-body">
                {props.children}
            </div>
        </div>
    );
};

export default Modal;