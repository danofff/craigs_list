import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MobileNavigation.module.css";

const MobileNavigation = ({
  logUserOut,
  user,
  isMobileNavActive,
  setMobileNavActive,
}) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(isMobileNavActive);
  }, [isMobileNavActive]);
  return (
    <>
      <nav
        className={`${classes["mobile-navigation"]} ${
          isActive ? classes.active : ""
        }`}
      >
        <NavLink
          end
          to="/posts"
          activeclassname="active"
          onClick={() => {
            setMobileNavActive(false);
          }}
        >
          All Posts
        </NavLink>
        {user && (
          <NavLink
            to="/posts/add"
            activeclassname="active"
            onClick={() => {
              setMobileNavActive(false);
            }}
          >
            + Add Post
          </NavLink>
        )}
        {user && (
          <NavLink
            end
            to="/profile"
            activeclassname="active"
            onClick={() => {
              setMobileNavActive(false);
            }}
          >
            Profile
          </NavLink>
        )}
        {!user && (
          <NavLink
            to="/auth"
            activeclassname="active"
            onClick={() => {
              setMobileNavActive(false);
            }}
          >
            Login/Singup
          </NavLink>
        )}
        {user && (
          <button
            onClick={(event) => {
              setMobileNavActive(false);
              logUserOut(event);
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </>
  );
};

export default MobileNavigation;
