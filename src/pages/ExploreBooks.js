import { useState } from "react";
import BooksList from "../components/BooksListExplore";
import SearchBook from "../components/UI/SearchBook";
import classes from "./ExploreBooks.module.css";
import { json } from "react-router";

const ExploreBooksPage = () => {
  const [searchedValue, setSearchedVal] = useState("");
  const [resData, setResData] = useState([]);

  const searchedValueChangeHandler = (searchedVal) => {
    setSearchedVal(searchedVal);
  };

  const searchClickHandler = async () => {
    const searchKey = searchedValue;
    const apiKey = process.env.REACT_APP_API_KEY;
    const reqURL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`;

    const response = await fetch(reqURL);

    if (!response.ok) {
      throw json({ message: "Could not fetch the data" }, { status: 500 });
    }

    const responseData = await response.json();

    setResData(responseData.items);
    console.log(responseData);
  };
  console.log(resData);

  return (
    <>
      <section className={classes.searchBook}>
        <SearchBook
          needStateData={searchedValueChangeHandler}
          searchButtonClickHandler={searchClickHandler}
        />
        <button
          onClick={searchClickHandler}
          type="button"
          style={{ cursor: "pointer" }}
        >
          Search
        </button>
      </section>
      <hr className={classes.hr} />
      {resData.length > 0 &&
        resData.slice(0, Math.min(resData.length-3 , 12)).map((item) => (
          <li key={item.id}>
            <BooksList
              id={item.id}
              title={item.volumeInfo.title}
              authors={item.volumeInfo.authors}
              categories={item.volumeInfo.categories}
              image={
                item.volumeInfo.imageLinks == null
                  ? "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
                  : item.volumeInfo.imageLinks.thumbnail
              }
              description={item.volumeInfo.description}
              language={item.volumeInfo.language}
              pages={item.volumeInfo.pageCount}
            />
          </li>
        ))}
    </>
  );
};

export default ExploreBooksPage;
