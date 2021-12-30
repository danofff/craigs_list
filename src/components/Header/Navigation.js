import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userActions } from "../../store/userSlice";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigator = useNavigate();

  const onClickLogOutHandler = (event) => {
    dispatch(userActions.logoutUser());
    // maybe you need navigation logic;
    navigator("/");
  };

  return (
    <nav className={classes.navigation}>
      <NavLink end to="/posts" activeclassname="active">
        All Posts
      </NavLink>
      {user && (
        <NavLink to="/posts/add" activeclassname="active">
          + Add Post
        </NavLink>
      )}
      {user && (
        <NavLink end to="/profile" activeclassname="active">
          Profile
        </NavLink>
      )}
      {!user && (
        <NavLink to="/auth" activeclassname="active">
          Login/Singup
        </NavLink>
      )}
      {user && <button onClick={onClickLogOutHandler}>Logout</button>}
    </nav>
  );
};

export default Navigation;
