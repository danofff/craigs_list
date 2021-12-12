import Post from "./Post";
import classes from "./PostList.module.css";

import Modal from "../UI/Modal";

const PostList = ({ posts, deletePost, user }) => {
  return (
    <ul className={classes.posts}>
      {posts.map((post) => (
        <Post
          user={user}
          key={post._id}
          data={post}
          deletePost={post.isAuthor ? deletePost : null}
        />
      ))}
    </ul>
  );
};

export default PostList;
