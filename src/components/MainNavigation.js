import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useState } from "react";
// import bookLogo from "../assests/Book-logo.png";

const MainNavigation = () => {
  const [isClicked, setIsClicked] = useState(false);

  const responsiveHandler = () => {
    setIsClicked(!isClicked);
  };
  return (
    <header>
      <nav>
        
        <ul
          id={classes.list}
          className={isClicked ? classes["active"] : classes["#list"]}
        >
          <img src="images\logo.png" alt="logo" className={classes.logo} />
          <li>
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
            <NavLink
              to="favorites"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Favorites
            </NavLink>
          </li>
        </ul>
        <div className={classes.mobile} onClick={responsiveHandler}>
          <i
            id="bar"
            className={isClicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
