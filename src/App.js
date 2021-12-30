import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

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

import { fetchUserAndPosts } from "./store/userActions";
import MySnackBar from "./components/UI/MySnackBar";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.posts.posts);

  //fetching user from localStorage and posts on first App load
  useEffect(() => {
    dispatch(fetchUserAndPosts());
  }, [dispatch]);

  return (
    <>
      <MySnackBar />
      <Header />
      <MainContainer>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/posts" element={<PostsPage user={user} />} />
          <Route path="/" element={<Navigate replace to="/posts" />} />
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
              element={<SinglePostPage user={user} posts={posts} />}
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
