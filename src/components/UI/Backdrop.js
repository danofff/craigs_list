import classes from "./Backdrop.module.css";

const Backdrop = ({ setActive, isActive }) => {
  return (
    <div
      className={`${classes.backdrop} ${isActive ? classes.active : ""}`}
      onClick={() => {
        setActive(false);
      }}
    ></div>
  );
};

export default Backdrop;
