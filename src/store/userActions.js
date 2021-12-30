import makeHeader from "../util/makeheaders";
import { apiBaseUrl } from "../util/variables";
import { userActions } from "./userSlice";
import { fetchPosts } from "./postsActions";
import { uiActions } from "./uiSlice";

export const authUser = (user, type) => {
  return async (dispatch) => {
    //depends form mode should register or login
    const pathChunk = type === "signup" ? "register" : "login";
    async function fetchLoginUser() {
      //sending request
      const response = await fetch(`${apiBaseUrl}/users/${pathChunk}`, {
        method: "POST",
        headers: makeHeader(),
        body: JSON.stringify({
          user: {
            username: user.username,
            password: user.password,
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        const userCreated = {
          username: user.username,
          token: data.data.token,
        };
        return userCreated;
      } else {
        throw new Error(data.error.message);
      }
    }
    try {
      const createdUser = await fetchLoginUser();
      dispatch(userActions.authUser(createdUser));
      dispatch(fetchPosts(createdUser));
      dispatch(
        uiActions.openSnackbar({
          type: "success",
          text: "user successfully authenticated",
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
      return false;
    }
  };
};

export const fetchUserAndPosts = () => {
  return (dispatch) => {
    const userFromStorage = localStorage.getItem("user");
    const user = JSON.parse(userFromStorage);
    dispatch(userActions.fetchUserFromLocal(user));

    dispatch(fetchPosts(user));
  };
};
