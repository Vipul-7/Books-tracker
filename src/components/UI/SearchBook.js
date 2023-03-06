import classes from "./SearchBook.module.css";

const SearchBook = (props) => {
  const searchedValChangeHandler = (event) => {
    props.needStateData(event.target.value);
    // console.log(event.target.value)
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
      {/* <div className={classes.btn}>
        <button onClick={props.searchClickHandler} type="button">Search</button>
      </div>
      <div className={classes.btn}>
        <button>Cancel</button>
      </div> */}
    </section>
  );
};

export default SearchBook;
