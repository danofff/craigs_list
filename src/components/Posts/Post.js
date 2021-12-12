import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { StyledButton } from "../UI/StyledButton";

import PostInfo from "./PostInfo";

import classes from "./Post.module.css";

const Post = ({ data, setShowModal, user, setDeletedPost, deletedPost }) => {
  const navigate = useNavigate();

  //set delete Post
  const onDeleteClickHandler = (event) => {
    setDeletedPost(data);
  };

  //then show Modal
  useEffect(() => {
    if (deletedPost) {
      setShowModal(true);
    }
  }, [deletedPost]);

  const onEditClickHandler = (event) => {
    navigate(`/posts/edit/${data._id}`);
  };
  const onClickGoToPostHandler = (event) => {
    navigate(`/posts/${data._id}`);
  };
  const onClickAddMessageHandler = (event) => {
    navigate(`/posts/${data._id}/addmessage`);
  };

  return (
    <>
      <Paper elevation={3} className={classes.post}>
        <PostInfo data={data} />
        {/* should be another component */}
        <div className={classes.post__actions}>
          {user && !data.isAuthor ? (
            <>
              <StyledButton onClick={onClickAddMessageHandler}>
                Send message
              </StyledButton>
            </>
          ) : null}
          {data.isAuthor ? (
            <>
              {/* action buttons for isAuthor = true */}
              <Button variant="contained" onClick={onClickGoToPostHandler}>
                Go to Post
              </Button>
              <div className={classes["post__actions-buttons"]}>
                <Tooltip title="edit post">
                  <button
                    className={`${classes["post__actions-button"]} ${classes.edit}`}
                    onClick={onEditClickHandler}
                  >
                    <EditIcon />
                  </button>
                </Tooltip>

                <Tooltip title="delete post">
                  <button
                    className={`${classes["post__actions-button"]} ${classes.delete}`}
                    onClick={onDeleteClickHandler}
                  >
                    <DeleteIcon />
                  </button>
                </Tooltip>
              </div>
            </>
          ) : null}
        </div>
      </Paper>
    </>
  );
};

export default Post;
