import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useState } from "react";
import { ModalsActions } from "../../store/modals-slice";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import ExploreIcon from "../Icons/ExploreIcon";
import NowIcon from "../Icons/NowIcon";
import ToReadIcon from "../Icons/ToReadIcon";
import HaveReadIcon from "../Icons/HaveReadIcon";
import FavoritesIcon from "../Icons/FavoritesIcon";
import BookLogo from "../Icons/BookLogo";

const MainNavigation = () => {
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const showLoginModalHandler = () => {
    dispatch(ModalsActions.changeShowLoginModal());
  };

  const showMyProfileHandler = () => {
    dispatch(ModalsActions.showProfileModal());
  };

  const responsiveHandler = () => {
    setIsClicked(!isClicked);
  };
  return (
    <header>
      <nav>
        <ul className={isClicked ? classes["active"] : classes["list"]}>
          <Link to="/" className={classes["logo"]}>
            <BookLogo />
          </Link>
          <li>
            <ExploreIcon />
            <NavLink
              to="explore-books"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NowIcon />
            <NavLink
              to="reading-now"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Reading now
            </NavLink>
          </li>
          <li>
            <ToReadIcon />
            <NavLink
              to="to-read"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              To read
            </NavLink>
          </li>
          <li>
            <HaveReadIcon />
            <NavLink 
              to="have-read"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Have read
            </NavLink>
          </li>
          <li>
            <FavoritesIcon />
            <NavLink
              to="favorites"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Favorites
            </NavLink>
          </li>
          {!user && (
            <div className={classes.login}>
              <NavLink to="auth/login">
                <button>Sign-In</button>
              </NavLink>
            </div>
          )}
          {user && (
            <div className={classes["login-photo"]}>
              <button onClick={showMyProfileHandler}>
                <img
                  src={user.photoURL ? user.photoURL : ""}
                  alt={user.displayName}
                />
              </button>
            </div>
          )}
        </ul>
        <div className={classes.small} onClick={responsiveHandler}>
          <span>&nbsp;</span>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
