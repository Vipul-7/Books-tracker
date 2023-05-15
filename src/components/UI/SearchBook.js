import classes from "./SearchBook.module.css";

const SearchBook = (props) => {
  const searchedValChangeHandler = (event) => {
    props.needStateData(event.target.value);
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
    props.searchButtonClickHandler();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      searchClickHandler(e);
    }
  };

  return (
    <section className={classes.main}>
      <input
        type="text"
        onChange={searchedValChangeHandler}
        placeholder="Search any book"
        className={classes.input}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={searchClickHandler}
        type="submit"
        style={{ cursor: "pointer" }}
        className={classes["search-button"]}
      >
        Search
      </button>
    </section>
  );
};

export default SearchBook;
