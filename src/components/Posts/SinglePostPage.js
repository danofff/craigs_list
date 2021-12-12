import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import PostInfo from "../Posts/PostInfo";
import MessageInfo from "../Messages/MessageInfo";
import Modal from "../UI/Modal";
import classes from "./SinglePostPage.module.css";

const SinglePostPage = ({ user, posts, deletePost }) => {
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shouldDeletePost, setShouldDeletePost] = useState(false);

  const navigate = useNavigate();
  const postId = useParams().id;

  useEffect(() => {
    posts.forEach((post) => {
      if (post._id === postId) {
        setPost({ ...post });
        return;
      }
    });
  }, [user, posts]);

  useEffect(() => {
    if (shouldDeletePost) {
      deletePost(post._id);
      navigate("/posts");
    }
  }, [shouldDeletePost]);

  const onDeleteClickHandler = (event) => {
    setShowModal(true);
  };
  const onEditClickHandler = (event) => {
    navigate(`/posts/edit/${post._id}`);
  };
  let content = <p>Loading...</p>;
  if (post) {
    content = (
      <>
        <Modal
          isModalOpen={showModal}
          setShowModal={setShowModal}
          title={`Delete "${post.title}"?`}
          text="Are you sure you want to delete this post?"
          setShouldDeletePost={setShouldDeletePost}
        />
        <PostInfo data={post} />
        {/* action buttons */}
        <div className={classes.post__actions}>
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
        </div>
        <hr className={classes.singlepost__hr} />
        <h2 className={classes.messages__header}>Messages</h2>
        <div className={classes.messages}>
          {post.messages.map((message) => {
            return <MessageInfo message={message} key={message._id} />;
          })}
        </div>
      </>
    );
  }
  return <>{content}</>;
};

export default SinglePostPage;
