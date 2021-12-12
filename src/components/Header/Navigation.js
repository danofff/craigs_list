import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = ({ logUserOut, user }) => {
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
      {user && <button onClick={logUserOut}>Logout</button>}
    </nav>
  );
};

export default Navigation;
