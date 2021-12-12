import { Link } from "react-router-dom";

import classes from "./MessageInfo.module.css";

const MessageInfo = ({ message, asReferenceToPost }) => {
  //messages don't delete with post deleting, so some references to posts are dead
  // it caused by bad api architecture
  //main idea, if asReferenceToPost is true, post name header becomes reference to this post
  if (asReferenceToPost) {
    return (
      <div className={classes.message}>
        {message.updatedAt ? (
          <h4 className={classes.message__date}>
            {new Date(message.updatedAt).toLocaleDateString("en-Us", {
              month: "short",
              day: "numeric",
              weekday: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </h4>
        ) : (
          <Link to={`/posts/${message.post._id}`}>
            <h4 className={classes.message__post}>
              Post: {message.post.title}
            </h4>
          </Link>
        )}
        <div className={classes["message-info"]}>
          <p className={classes.message__author}>
            <span>Author:</span> {message.fromUser.username}
          </p>
          <p className={classes.message__content}>
            <span>Message:</span> {message.content}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.message}>
        {message.updatedAt ? (
          <h4 className={classes.message__date}>
            {new Date(message.updatedAt).toLocaleDateString("en-Us", {
              month: "short",
              day: "numeric",
              weekday: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </h4>
        ) : (
          <h4 className={classes.message__date}>Post: {message.post.title}</h4>
        )}
        <div className={classes["message-info"]}>
          <p className={classes.message__author}>
            <span>Author:</span> {message.fromUser.username}
          </p>
          <p className={classes.message__content}>
            <span>Message:</span> {message.content}
          </p>
        </div>
      </div>
    );
  }
};

export default MessageInfo;
