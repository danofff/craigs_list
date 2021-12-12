import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../../util/variables";
import makeHader from "../../util/makeheaders";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { StyledButton } from "../UI/StyledButton";
import PostInfo from "../Posts/PostInfo";

import classes from "./AddMessagePage.module.css";

const AddMessagePage = ({ user, posts }) => {
  const postId = useParams().id;
  const [post, setPost] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    console.log();
    posts.forEach((post) => {
      if (post._id === postId) {
        setPost({ ...post });
      }
    });
  }, []);

  //controlled textarea
  const onMessageInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  //sending the message
  const onSubmitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/posts/${post._id}/messages`, {
        method: "POST",
        headers: makeHader(user),
        body: JSON.stringify({
          message: {
            content: messageInput,
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        setMessageInput("");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
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
