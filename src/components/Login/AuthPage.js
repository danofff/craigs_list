import { useState } from "react";
import Alerts from "../UI/Alerts";

import Switch from "@mui/material/Switch";

import MyForm from "./MyForm";
import classes from "./AuthPage.module.css";

const LoginPage = ({ setAuthUser }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [formType, setFormType] = useState("login");
  const [error, setError] = useState({ isError: false, message: "" });

  const onCheckHandler = (event) => {
    if (event.target.checked) {
      setFormType("signup");
      setIsChecked(true);
    } else {
      setFormType("login");
      setIsChecked(false);
    }
  };
  return (
    <div>
      <Alerts error={error} setError={setError} />
      <MyForm type={formType} setAuthUser={setAuthUser} setIsError={setError} />
      <div className={classes["switch-form"]}>
        <Switch
          color="secondary"
          onChange={onCheckHandler}
          checked={isChecked}
        />
        <label>Do you want to signup first?</label>
      </div>
    </div>
  );
};

export default LoginPage;
