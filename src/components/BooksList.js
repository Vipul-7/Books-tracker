import classes from "./BooksList.module.css";

const BooksList = (props) => {
  return (
    <>
      <ul className={classes.div}>
        <h1>{props.title}</h1>
        <img src={props.image} alt="book-ima" />
      </ul>
    </>
  );
};

export default BooksList;
