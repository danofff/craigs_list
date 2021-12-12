import { useState, useEffect } from "react";
import classes from "./Backdrop.module.css";

const Backdrop = ({ setActive, isActive }) => {
  const [isActiveBackdrop, setIsActiveBackdrop] = useState(isActive);

  useEffect(() => {
    setIsActiveBackdrop(isActive);
  }, [isActive]);

  return (
    <div
      className={`${classes.backdrop} ${
        isActiveBackdrop ? classes.active : ""
      }`}
      onClick={() => {
        setActive(false);
        setIsActiveBackdrop(false);
      }}
    ></div>
  );
};

export default Backdrop;
