import makeHeader from "../util/makeheaders";
import { apiBaseUrl } from "../util/variables";
import { postsActions } from "./postsSlice";
import { uiActions } from "./uiSlice";

//get all posts
export const fetchPosts = (user) => {
  console.log("fetch posts action is working");
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${apiBaseUrl}posts`, {
        method: "GET",
        headers: makeHeader(user),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error("Something went wrong, try again later");
      }
      return result.data.posts;
    };
    try {
      const posts = await fetchData();
      dispatch(postsActions.fetchPosts(posts));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions({
          type: "error",
          text: "something went wrong, try again later",
        })
      );
    }
  };
};

//add post
export const addPost = (post, user) => {
  console.log("add post action is working");
  return async (dispatch) => {
    const fetchAddPost = async () => {
      const response = await fetch(`${apiBaseUrl}/posts`, {
        method: "POST",
        headers: makeHeader(user),
        body: JSON.stringify({
          post,
        }),
      });

      const result = await response.json();
      if (result.success) {
        return result.data.post;
      } else {
        throw new Error(result.error.message);
      }
    };
    try {
      const addedPost = await fetchAddPost();
      dispatch(postsActions.addPost(addedPost));
      dispatch(
        uiActions.openSnackbar({
          type: "success",
          text: "post added successfully",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.openSnackbar({
          type: "error",
          text: error.message,
        })
      );
    }
  };
};

//edit post
export const editPost = (id, post, user) => {
  console.log("edit post action is working");
  return async (dispatch) => {
    const fetchEditPost = async () => {
      const response = await fetch(`${apiBaseUrl}/posts/${id}`, {
        method: "PATCH",
        headers: makeHeader(user),
        body: JSON.stringify({
          post,
        }),
      });

      const result = await response.json();
      if (result.success) {
        return result.data.post;
      } else {
        throw new Error(result.error.message);
      }
    };
    try {
      const editedPost = await fetchEditPost();
      dispatch(postsActions.editPost(editedPost));
      dispatch(
        uiActions.openSnackbar({
          type: "success",
          text: "post edited successfully",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.openSnackbar({
          type: "error",
          text: error.message,
        })
      );
    }
  };
};

//delete post
export const deletePost = (id, user) => {
  console.log("delete post action is working");
  return async (dispatch) => {
    const fetchDeletePost = async () => {
      const response = await fetch(`${apiBaseUrl}/posts/${id}`, {
        method: "DELETE",
        headers: makeHeader(user),
      });

      const result = await response.json();
      if (result.success) {
        return true;
      } else {
        throw new Error(result.error.message);
      }
    };
    try {
      const result = await fetchDeletePost();
      dispatch(postsActions.deletePost(id));
      dispatch(
        uiActions.openSnackbar({
          type: "success",
          text: "post successfully deleted",
        })
      );
      return result;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.openSnackbar({
          type: "error",
          text: error.message,
        })
      );
    }
  };
};

//send message
export const sendMessage = (postId, message, user) => {
  console.log("send message action is working");
  return async (dispatch) => {
    const fetchSendMessage = async () => {
      const response = await fetch(`${apiBaseUrl}/posts/${postId}/messages`, {
        method: "POST",
        headers: makeHeader(user),
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
      } else {
        throw new Error(data.error.message);
      }
    };
    try {
      await fetchSendMessage();
      dispatch(
        uiActions.openSnackbar({
          type: "success",
          text: "message successfully sended",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.openSnackbar({
          type: "error",
          text: error.message,
        })
      );
    }
  };
};
