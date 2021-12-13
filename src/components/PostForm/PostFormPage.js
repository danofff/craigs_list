import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { StyledButton } from "../UI/StyledButton";
import Snackbar from "../UI/Snackbar";
import makeheaders from "../../util/makeheaders";
import { apiBaseUrl } from "../../util/variables";

import classes from "./PostFormPage.module.css";

const PostFormPage = ({ user, mode, posts }) => {
  const navigate = useNavigate();
  const editedPostId = useParams();

  function clearFields() {
    setTitleInput("");
    setDescriptionInput("");
    setPriceInput("");
    setLocationInput("");
    setDeliveryCheck(false);
  }

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [deliveryCheck, setDeliveryCheck] = useState(false);

  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(() => {
    clearFields();
    if (mode === "edit") {
      posts.forEach((post) => {
        if (post._id === editedPostId.id) {
          setTitleInput(post.title);
          setDescriptionInput(post.description);
          setPriceInput(Number.parseFloat(post.price.slice(1)) || 0);
          setLocationInput(post.location);
          setDeliveryCheck(post.willDeliver);
        }
      });
    }
  }, [mode, posts, editedPostId.id]);

  const onBackButtonClick = () => {
    navigate("/");
  };

  if (!user) {
    return (
      <>
        <h1>You have no right for this page</h1>
        <button onClick={onBackButtonClick}>Back</button>
      </>
    );
  }

  const onTitleChangeHandler = (event) => {
    setTitleInput(event.target.value);
  };
  const onDescriptionChangeHandler = (event) => {
    setDescriptionInput(event.target.value);
  };
  const onPriceChangeHandler = (event) => {
    setPriceInput(event.target.value);
  };
  const onLocationChangeHandler = (event) => {
    setLocationInput(event.target.value);
  };

  const onDeliveryChangeHandler = (event) => {
    setDeliveryCheck(event.target.checked);
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    if (mode === "add") {
      fetchCreatePost();
    } else {
      fetchEditPost();
    }
  };

  async function fetchCreatePost() {
    try {
      const response = await fetch(`${apiBaseUrl}/posts`, {
        method: "POST",
        headers: makeheaders(user),
        body: JSON.stringify({
          post: {
            title: titleInput,
            description: descriptionInput,
            price: `$${priceInput}`,
            willDeliver: deliveryCheck,
            location: locationInput,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        navigate("/");
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      setError({ isError: true, message: error.message });
      console.log(error);
    }
  }

  async function fetchEditPost() {
    try {
      const response = await fetch(`${apiBaseUrl}/posts/${editedPostId.id}`, {
        method: "PATCH",
        headers: makeheaders(user),
        body: JSON.stringify({
          post: {
            title: titleInput,
            description: descriptionInput,
            price: `$${priceInput}`,
            willDeliver: deliveryCheck,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        navigate("/");
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      setError({ isError: true, message: error.message });
      console.log(error);
    }
  }

  return (
    <>
      <Snackbar
        isOpen={error.isError}
        setError={setError}
        message={error.message}
        type="error"
      />
      <h1 className={classes.header}>
        {mode === "add" ? "Create a Post" : "Edit the Post"}
      </h1>
      <form className={classes["post-form"]} onSubmit={onSubmitFormHandler}>
        <TextField
          label={true ? "Title" : "Error"}
          id="postTitle"
          margin="dense"
          value={titleInput}
          onChange={onTitleChangeHandler}
          required
          autoComplete="false"
        />
        <TextField
          label={true ? "Description" : "Error"}
          id="postDescription"
          margin="dense"
          value={descriptionInput}
          onChange={onDescriptionChangeHandler}
          required
          autoComplete="false"
        />
        <TextField
          label={true ? "Price" : "Error"}
          type="number"
          id="postPrice"
          margin="dense"
          value={priceInput}
          onChange={onPriceChangeHandler}
          inputProps={{
            min: 0,
            step: 0.01,
          }}
          required
          autoComplete="false"
        />
        <TextField
          label={true ? "Location" : "Error"}
          id="postLocation"
          margin="dense"
          value={locationInput}
          onChange={onLocationChangeHandler}
          autoComplete="false"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={deliveryCheck}
                onChange={onDeliveryChangeHandler}
              />
            }
            label="Willing to Deliver?"
          />
        </FormGroup>
        <StyledButton className={classes["post-form__button"]} type="submit">
          {mode === "add" ? "Create Post" : "Edit Post"}
        </StyledButton>
      </form>
    </>
  );
};

export default PostFormPage;
