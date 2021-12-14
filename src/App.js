import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { apiBaseUrl } from "./util/variables";
import makeHeaders from "./util/makeheaders";

import PostsPage from "./components/Posts/PostsPage";
import AuthPage from "./components/Login/AuthPage";
import MainContainer from "./components/UI/MainContainer";
import Header from "./components/Header/Header";
import PostFormPage from "./components/PostForm/PostFormPage";
import ProfilePage from "./components/Profile/ProfilePage";
import PageNotFound from "./components/UI/PageNotFound";

import "./App.css";
import SinglePostPage from "./components/Posts/SinglePostPage";
import AddMessagePage from "./components/Messages/AddMessagePage";
import Snackbar from "./components/UI/Snackbar";

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState({ isError: false, message: "" });

  const navigate = useNavigate();

  //retrive user from local storage  and posts fetching from api with firs application download
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const retrivedUser = JSON.parse(userFromStorage);
      setUser(retrivedUser);
    }
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
  }, []);

  //store user in state and in localstorage
  const storeUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  //delete user from state and from localstrotage
  const onLogoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  //delete post
  const deletePostHandler = async (postId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: makeHeaders(user),
      });
      const result = await response.json();
      if (result.success) {
        setPosts((prev) => {
          return prev.filter((post) => {
            return post._id !== postId;
          });
        });
      } else {
        throw Error(result.error.message);
      }
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  };

  return (
    <>
      <Snackbar
        type="error"
        message={error.message}
        setError={setError}
        isOpen={error.isError}
      />
      <Header logUserOut={onLogoutHandler} user={user} />
      <MainContainer>
        <Routes>
          <Route path="/auth" element={<AuthPage setAuthUser={storeUser} />} />
          <Route
            path="/posts"
            element={
              <PostsPage
                user={user}
                posts={posts}
                setPosts={setPosts}
                deletePost={deletePostHandler}
              />
            }
          />
          <Route
            path="/"
            element={
              <PostsPage
                user={user}
                posts={posts}
                setPosts={setPosts}
                deletePost={deletePostHandler}
              />
            }
          />
          {user ? (
            <Route
              path="/posts/add"
              element={<PostFormPage user={user} mode="add" posts={posts} />}
            />
          ) : null}

          {user ? (
            <Route
              path="/posts/edit/:id"
              element={<PostFormPage user={user} mode="edit" posts={posts} />}
            />
          ) : null}

          {user ? (
            <Route
              path="/posts/:id"
              element={
                <SinglePostPage
                  user={user}
                  posts={posts}
                  deletePost={deletePostHandler}
                />
              }
            />
          ) : null}

          {user ? (
            <Route
              path="/posts/:id/addmessage"
              element={<AddMessagePage user={user} posts={posts} />}
            />
          ) : null}
          {user ? (
            <Route path="/profile" element={<ProfilePage user={user} />} />
          ) : null}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;
