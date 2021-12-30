import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostInfo from "../Posts/PostInfo";
import MessageInfo from "../Messages/MessageInfo";
import MyModal from "../UI/MyModal";
import { deletePost } from "../../store/postsActions";

import classes from "./SinglePostPage.module.css";

const SinglePostPage = ({ posts }) => {
  const user = useSelector((state) => state.user.user);

  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  const navigate = useNavigate();
  const postId = useParams().id;

  useEffect(() => {
    if (isPostDeleted) {
      navigate(-1);
    }
  }, [isPostDeleted, navigate]);

  useEffect(() => {
    posts.forEach((post) => {
      if (post._id === postId) {
        setPost({ ...post });
        return;
      }
    });
  }, [user, posts, postId]);

  const onDeleteClickHandler = () => {
    setShowModal(true);
  };

  const onEditClickHandler = (event) => {
    navigate(`/posts/edit/${post._id}`);
  };
  let content = <p>Loading...</p>;
  if (post) {
    content = (
      <>
        <MyModal
          title={`Delete -${post.title}-?`}
          text={"Are you sure you want to delete this post?"}
          onYesClickFunc={() => {
            return deletePost(postId, user);
          }}
          isOpen={showModal}
          setIsOpen={setShowModal}
          setModalResult={setIsPostDeleted}
          yesButtonText="DELETE"
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
