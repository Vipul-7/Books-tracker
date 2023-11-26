import { Link } from "react-router-dom";
import classes from "./HomePageComponent.module.css";

const HomePageComponent = () => {
  return (
    <div className={classes.text}>
      <h1>Welcome to the Book tracker web application :)</h1>
      <Link to="explore-books">Find Books</Link>
    </div>
  );
};

export default HomePageComponent;
