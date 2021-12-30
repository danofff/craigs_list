import { useState } from "react";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import PostList from "./PostList";

import classes from "./PostsPage.module.css";

const PostsPage = ({ setPosts }) => {
  const [deletedPost, setDeletedPost] = useState(null);

  //redux posts
  const posts = useSelector((store) => store.posts.posts);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  return (
    <div>
      <h1 className={classes["post-page__header"]}>ALL POSTS</h1>
      <SearchBar setFilteredPosts={setFilteredPosts} />
      <PostList
        posts={filteredPosts}
        setDeletedPost={setDeletedPost}
        setShowModal={() => {}}
        deletedPost={deletedPost}
      />
    </div>
  );
};

export default PostsPage;
