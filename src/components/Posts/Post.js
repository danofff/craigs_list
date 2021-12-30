import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { StyledButton } from "../UI/StyledButton";

import MyModal from "../UI/MyModal";
import PostInfo from "./PostInfo";
import { deletePost } from "../../store/postsActions";

import classes from "./Post.module.css";

const Post = ({ data }) => {
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  //set delete Post
  const onDeleteClickHandler = (event) => {
    setShowModal(true);
  };

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
      <MyModal
        title={`Delete -${data.title}-?`}
        text={"Are you sure you want to delete this post?"}
        onYesClickFunc={() => {
          return deletePost(data._id, user);
        }}
        isOpen={showModal}
        setIsOpen={setShowModal}
        yesButtonText="DELETE"
      />
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
          {data.isAuthor && user ? (
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
