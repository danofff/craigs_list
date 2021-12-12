import Post from "./Post";
import classes from "./PostList.module.css";

const PostList = ({
  posts,
  setShowModal,
  user,
  setDeletedPost,
  deletedPost,
}) => {
  return (
    <ul className={classes.posts}>
      {posts.map((post) => (
        <Post
          user={user}
          key={post._id}
          data={post}
          setShowModal={setShowModal}
          setDeletedPost={setDeletedPost}
          deletedPost={deletedPost}
        />
      ))}
    </ul>
  );
};

export default PostList;
