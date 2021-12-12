import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { StyledButton } from "../UI/StyledButton";
import { apiBaseUrl } from "../../util/variables";

import classes from "./MyForm.module.css";

const MyForm = ({ setAuthUser, type, setIsError }) => {
  //state for username and password inputs
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [usernameIsValid, setUsernameIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);

  //create navigate object
  const navigate = useNavigate();

  //check validation on inputs change
  useEffect(() => {
    if (usernameIsValid !== null) {
      userInputValidation();
    }
    if (passwordIsValid !== null) {
      passwordInputValidation();
    }
  }, [usernameInput, passwordInput]);

  //handle inputs change
  const onUsernameInputChange = (event) => {
    setUsernameInput(event.target.value);
  };
  const onPasswrodInputChange = (event) => {
    setPasswordInput(event.target.value);
  };

  // //handle validation with onBlur events
  const onBlurUsernameInputHandler = (event) => {
    userInputValidation();
  };
  const onBlurPasswordInputHandler = (event) => {
    passwordInputValidation();
  };

  const userInputValidation = () => {
    if (usernameInput !== null) {
      usernameInput.length >= 3
        ? setUsernameIsValid(true)
        : setUsernameIsValid(false);
    }
  };
  const passwordInputValidation = () => {
    return passwordInput.length >= 4
      ? setPasswordIsValid(true)
      : setPasswordIsValid(false);
  };

  //handle form submition
  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    //check if inputs are valid, if they are not, return without form submition
    if (!usernameIsValid || !passwordIsValid) {
      return;
    }

    //depends form mode should register or login
    const pathChunk = type === "signup" ? "register" : "login";
    async function fetchLoginUser() {
      //sending request
      try {
        const response = await fetch(`${apiBaseUrl}/users/${pathChunk}`, {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            user: {
              username: usernameInput,
              password: passwordInput,
            },
          }),
        });
        const data = await response.json();
        if (data.success) {
          setAuthUser({
            username: usernameInput,
            token: data.data.token,
          });
          navigate("/");
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        setUsernameInput("");
        setPasswordInput("");
        setIsError({ isError: true, message: error.message });
      }
    }
    fetchLoginUser();
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
          value={usernameInput}
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
          value={passwordInput}
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
