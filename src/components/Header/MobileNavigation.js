import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { userActions } from "../../store/userSlice";

import classes from "./MobileNavigation.module.css";

const MobileNavigation = ({ isMobileNavActive, setMobileNavActive }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigator = useNavigate();

  const onClickLogOutHandler = (event) => {
    setMobileNavActive(false);
    dispatch(userActions.logoutUser());
    // maybe you need navigation logic;

    navigator("/");
  };

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
        {user && <button onClick={onClickLogOutHandler}>Logout</button>}
      </nav>
    </>
  );
};

export default MobileNavigation;
