import { useState, useEffect } from "react";

import { apiBaseUrl } from "../../util/variables";
import makeHeaders from "../../util/makeheaders";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import Alerts from "../UI/Alerts";

import classes from "./PostsPage.module.css";

const PostsPage = ({ user, posts, setPosts, deletePostHandler }) => {
  const [error, setError] = useState({ isError: false, message: "" });
  const [filteredPosts, setFilteredPosts] = useState(posts);

  //fetch all posts
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}posts`, {
          method: "GET",
          headers: makeHeaders(user),
        });
        const data = await response.json();

        //check if success request
        if (data.success) {
          //set post data if success
          setPosts(data.data.posts);
        } else {
          //throw error
          throw new Error(data.error.message);
        }
      } catch (error) {
        //set error message
        console.log(error.message);
        setError({
          isError: true,
          message: "Something went wrong, try again later.",
        });
      }
    };

    fetchAllPosts();
  }, [user]); // added user as a dependency for fetching with token

  return (
    <div>
      <Alerts error={error} setError={setError} />
      <h1 className={classes["post-page__header"]}>ALL POSTS</h1>
      <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} />
      <PostList
        posts={filteredPosts}
        deletePost={deletePostHandler}
        user={user}
      />
    </div>
  );
};

export default PostsPage;
