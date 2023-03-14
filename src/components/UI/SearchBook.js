import classes from "./SearchBook.module.css";

const SearchBook = (props) => {
  const searchedValChangeHandler = (event) => {
    props.needStateData(event.target.value);
  };

  return (
    <section className={classes.main}>
      <div className={classes.input}>
        <input
          type="text"
          onChange={searchedValChangeHandler}
          placeholder="Search any book"
          className={classes.input}
        />
      </div>
    </section>
  );
};

export default SearchBook;
