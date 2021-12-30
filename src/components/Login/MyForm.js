import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { StyledButton } from "../UI/StyledButton";
import { authUser } from "../../store/userActions";

import classes from "./MyForm.module.css";

const MyForm = ({ type }) => {
  const dispatch = useDispatch();
  //state for username and password inputs
  const [usernameInput, setUsernameInput] = useState({
    text: "",
    touched: false,
  });
  const [passwordInput, setPasswordInput] = useState({
    text: "",
    touched: false,
  });

  const [usernameIsValid, setUsernameIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);

  //create navigate object
  const navigate = useNavigate();

  //handle inputs change
  const onUsernameInputChange = (event) => {
    setUsernameInput((prevState) => {
      return { ...prevState, text: event.target.value };
    });
  };
  const onPasswrodInputChange = (event) => {
    if (passwordIsValid !== null) {
      passwordInputValidation();
    }
    setPasswordInput((prevState) => {
      return { ...prevState, text: event.target.value };
    });
  };

  // //handle validation with onBlur events
  const onBlurUsernameInputHandler = (event) => {
    setUsernameInput((prevState) => {
      return { ...prevState, touched: true };
    });
  };
  const onBlurPasswordInputHandler = (event) => {
    setPasswordInput((prevState) => {
      return { ...prevState, touched: true };
    });
  };

  const userInputValidation = useCallback(() => {
    if (usernameInput !== null) {
      usernameInput.text.length >= 3
        ? setUsernameIsValid(true)
        : setUsernameIsValid(false);
    }
  }, [usernameInput]);

  const passwordInputValidation = useCallback(() => {
    return passwordInput.text.length >= 4
      ? setPasswordIsValid(true)
      : setPasswordIsValid(false);
  }, [passwordInput]);

  useEffect(() => {
    if (usernameInput.touched) {
      userInputValidation();
    }
    if (passwordInput.touched) {
      passwordInputValidation();
    }
  }, [
    usernameInput,
    passwordInput,
    userInputValidation,
    passwordInputValidation,
  ]);

  //handle form submition
  const onSubmitFormHandler = async (event) => {
    event.preventDefault();

    //check if inputs are valid, if they are not, return without form submition
    if (!usernameIsValid || !passwordIsValid) {
      setUsernameInput((prevState) => {
        return { ...prevState, touched: true };
      });
      setPasswordInput((prevState) => {
        return { ...prevState, touched: true };
      });
      return;
    }

    //DISPATCHIN ACTION IN USER ACTIONS
    const isSuccess = await dispatch(
      authUser(
        { username: usernameInput.text, password: passwordInput.text },
        type
      )
    );
    if (isSuccess) {
      navigate("/posts");
    } else {
      setUsernameInput({
        text: "",
        touched: true,
      });
      setPasswordInput({
        text: "",
        touched: true,
      });
    }
  };

  return (
    <>
      <h1 className={classes["auth-form__header"]}>
        {type === "signup" ? "Sign Up" : "Log In"}
      </h1>
      <form
        onSubmit={onSubmitFormHandler}
        disabled={true}
        className={classes["auth-form"]}
      >
        <TextField
          error={usernameIsValid === false}
          label={"Username"}
          id="username"
          margin="dense"
          value={usernameInput.text}
          onChange={onUsernameInputChange}
          required
          autoComplete="false"
          onBlur={onBlurUsernameInputHandler}
          helperText={
            usernameIsValid !== false ? "" : "Should be at least 3 charachter"
          }
        />
        <TextField
          error={passwordIsValid === false}
          label={"Password"}
          type="password"
          id="password"
          margin="dense"
          value={passwordInput.text}
          onChange={onPasswrodInputChange}
          required
          autoComplete="false"
          onBlur={onBlurPasswordInputHandler}
          helperText={
            passwordIsValid !== false ? "" : "Should be at least 4 charachter"
          }
        />
        <StyledButton className={classes.button} type="submit">
          {type === "signup" ? "Sign Up" : "Log In"}
        </StyledButton>
      </form>
    </>
  );
};

export default MyForm;
