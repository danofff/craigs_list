import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    fetchPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      //some adding logic
      console.log("adding post is working");
      state.posts = [...state.posts, action.payload];
    },
    deletePost(state, action) {
      //some deleting logic
      console.log("deleting post is working");
      state.posts = state.posts.filter((post) => {
        return post._id !== action.payload;
      });
    },
    editPost(state, action) {
      //some editing logic
      console.log("editing post is working");
      const postIdx = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      const messages = state.posts[postIdx].messages.slice();
      const post = { ...action.payload, messages };
      state.posts[postIdx] = post;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice;
