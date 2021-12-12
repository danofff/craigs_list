import { useState, useEffect } from "react";

import { apiBaseUrl } from "../../util/variables";
import makeHeaders from "../../util/makeheaders";
import Modal from "../UI/Modal";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import Snackbar from "../UI/Snackbar";

import classes from "./PostsPage.module.css";

const PostsPage = ({ user, posts, setPosts, deletePost }) => {
  const [error, setError] = useState({ isError: false, message: "" });
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [showModal, setShowModal] = useState(false);
  const [shouldDeletePost, setShouldDeletePost] = useState(false);

  const [deletedPost, setDeletedPost] = useState(null);

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

  useEffect(() => {
    if (shouldDeletePost) {
      deletePost(deletedPost._id);
    }
  }, [shouldDeletePost]);

  return (
    <div>
      <Snackbar
        type="error"
        message={error.message}
        setError={setError}
        isOpen={error.isOpen}
      />
      {deletedPost ? (
        <Modal
          isModalOpen={showModal}
          setShowModal={setShowModal}
          title={`Delete "${deletedPost.title}"?`}
          text="Are you sure you want to delete this post?"
          setShouldDeletePost={setShouldDeletePost}
          setDeletedPost={setDeletedPost}
        />
      ) : null}
      <h1 className={classes["post-page__header"]}>ALL POSTS</h1>
      <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} />
      <PostList
        posts={filteredPosts}
        setDeletedPost={setDeletedPost}
        user={user}
        setShowModal={setShowModal}
        deletedPost={deletedPost}
      />
    </div>
  );
};

export default PostsPage;
