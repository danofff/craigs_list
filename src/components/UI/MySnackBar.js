import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import { uiActions } from "../../store/uiSlice";

import classes from "./MySnackBar.module.css";
const MySnackBar = () => {
  const snackbar = useSelector((state) => state.ui.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (snackbar.isSnackbarOpen) {
      timer = setTimeout(() => {
        dispatch(uiActions.closeSnackbar());
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [snackbar.isSnackbarOpen, dispatch]);

  const onClickCloseHandler = () => {
    dispatch(uiActions.closeSnackbar());
  };
  return createPortal(
    <div
      className={`${classes.snackbar} ${classes[snackbar.type]} ${
        snackbar.isSnackbarOpen ? "" : classes.hidden
      }`}
    >
      <p>{snackbar.text}</p>
      <span onClick={onClickCloseHandler}>&#10006;</span>
    </div>,
    document.getElementById("snackbar-root")
  );
};

export default MySnackBar;
