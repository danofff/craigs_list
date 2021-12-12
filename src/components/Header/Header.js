import { useState } from "react";
import { Link } from "react-router-dom";

import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import Backdrop from "../UI/Backdrop";

import classes from "./Header.module.css";

const Header = ({ logUserOut, user }) => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  return (
    <div className={classes.container}>
      <Backdrop setActive={setIsMobileNavActive} isActive={isMobileNavActive} />
      <header className={classes.header}>
        <Link to="/" className={classes["header__logo-link"]}>
          <div className={classes.header__logo}>
            <span>Stranger</span>
            <span>Things</span>
          </div>
        </Link>
        <div
          className={classes["toggle-button"]}
          onClick={() => setIsMobileNavActive(true)}
        >
          <div></div>
          <div className={classes.middle}></div>
          <div></div>
        </div>
        <Navigation logUserOut={logUserOut} user={user} />
        <MobileNavigation
          logUserOut={logUserOut}
          user={user}
          isMobileNavActive={isMobileNavActive}
          setMobileNavActive={setIsMobileNavActive}
        />
      </header>
    </div>
  );
};

export default Header;
