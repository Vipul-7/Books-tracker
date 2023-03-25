import { Link } from "react-router-dom";
import classes from "./HomePageComponent.module.css";

const HomePageComponent = () => {
  return (
    <h1 className={classes.text}>
      Welcome to the Book tracker web application 
      <br/>
      <Link to="explore-books">Explore Books</Link>
    </h1>
  );
};

export default HomePageComponent;
