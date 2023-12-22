import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useState } from "react";
import { ModalsActions } from "../../store/modals-slice";
import ExploreIcon from "../Icons/ExploreIcon";
import NowIcon from "../Icons/NowIcon";
import ToReadIcon from "../Icons/ToReadIcon";
import HaveReadIcon from "../Icons/HaveReadIcon";
import FavoritesIcon from "../Icons/FavoritesIcon";
import BookLogo from "../Icons/BookLogo";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../util/http";
import Loading from "../Icons/Loading";


const MainNavigation = () => {
  const { data: userData, isPending, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: ({ signal }) => fetchUser({ signal })
  })

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
          {!userData?.data && (
            <div className={classes.login}>
              {!isPending && <NavLink to="auth/login">
                <button>Sign-In</button>
              </NavLink>}
              {isPending && <div className={classes.loading}><Loading /></div>}
            </div>
          )}
          {/* {isPending && <div className={classes.loading}><Loading /></div>} */}
          {isError && <p>{error}</p>}
          {userData?.data && (
            <div className={classes["login-photo"]}>
              <button onClick={showMyProfileHandler}>
                <img
                  src={userData?.data.getUser.profilePic ? userData?.data.getUser.profilePic : ""}
                  alt={userData?.data.getUser.name}
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
