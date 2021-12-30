import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: userSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
