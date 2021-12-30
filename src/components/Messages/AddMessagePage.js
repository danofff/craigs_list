import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import { StyledButton } from "../UI/StyledButton";
import PostInfo from "../Posts/PostInfo";
import { sendMessage } from "../../store/postsActions";

import classes from "./AddMessagePage.module.css";

const AddMessagePage = () => {
  const postId = useParams().id;
  const [post, setPost] = useState(null);
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.posts.posts);
  const [messageInput, setMessageInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    posts.forEach((post) => {
      if (post._id === postId) {
        setPost({ ...post });
      }
    });
  }, [postId, posts]);

  //controlled textarea
  const onMessageInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  //sending the message
  const onSubmitFormHandler = async (event) => {
    event.preventDefault();
    const result = dispatch(sendMessage(postId, messageInput, user));
    if (result) {
      setMessageInput("");
    }
  };

  return (
    <div className={classes["add-message"]}>
      {!post ? (
        <p>Loading...</p>
      ) : (
        <>
          <PostInfo data={post} />
          <form
            className={classes["add-message__form"]}
            onSubmit={onSubmitFormHandler}
          >
            <h3 className={classes["add-message__header"]}>Send message</h3>
            <TextareaAutosize
              className={classes.textarea}
              id="message"
              value={messageInput}
              onChange={onMessageInputChange}
              required
              style={{ maxWidth: 400, width: "100%", padding: "1rem" }}
              minRows={4}
              placeholder="type your message here..."
            />
            <StyledButton type="submit" className={classes.button}>
              Send
            </StyledButton>
          </form>
        </>
      )}
    </div>
  );
};

export default AddMessagePage;
