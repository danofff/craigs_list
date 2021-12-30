import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { StyledButton } from "../UI/StyledButton";

import classes from "./PostFormPage.module.css";
import { addPost, editPost } from "../../store/postsActions";

const PostFormPage = ({ mode, posts }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const editedPostId = useParams().id;

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

  useEffect(() => {
    clearFields();
    if (mode === "edit") {
      posts.forEach((post) => {
        if (post._id === editedPostId) {
          setTitleInput(post.title);
          setDescriptionInput(post.description);
          setPriceInput(Number.parseFloat(post.price.slice(1)) || 0);
          setLocationInput(post.location);
          setDeliveryCheck(post.willDeliver);
        }
      });
    }
  }, [mode, posts, editedPostId]);

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

    //create post object
    const createdPost = {
      title: titleInput,
      description: descriptionInput,
      price: `$${priceInput}`,
      willDeliver: deliveryCheck,
      location: locationInput,
    };

    if (mode === "add") {
      const isPostCreated = dispatch(addPost(createdPost, user));
      if (isPostCreated) {
        navigate(-1);
      }
    } else {
      const isPostEdited = dispatch(editPost(editedPostId, createdPost, user));
      if (isPostEdited) {
        navigate(-1);
      }
    }
  };

  return (
    <>
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
