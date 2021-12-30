import React from "react";
import { createPortal } from "react-dom";

import { useDispatch } from "react-redux";

import Backdrop from "./Backdrop";
import classes from "./MyModal.module.css";

const MyModal = ({
  title,
  text,
  onYesClickFunc,
  yesButtonText = "YES",
  isOpen,
  setIsOpen,
  setModalResult,
}) => {
  const dispatch = useDispatch();

  const onClickYesButton = async () => {
    setIsOpen(false);
    const result = await dispatch(onYesClickFunc());
    if (setModalResult) {
      setModalResult(result);
    }
  };

  return createPortal(
    <div className={`${classes.modal} ${isOpen ? "" : classes.disable}`}>
      <Backdrop isActive={isOpen} setActive={setIsOpen} />
      <div className={classes["modal-window"]}>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.text}>{text}</p>
        <div className={classes.actions}>
          <button
            className={classes.cancel}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            CANCEL
          </button>
          <button className={classes.yes} onClick={onClickYesButton}>
            {yesButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default MyModal;
