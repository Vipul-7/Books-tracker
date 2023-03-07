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
    console.log(searchedVal);
  };

  const searchClickHandler = async () => {
    const searchKey = searchedValue;
    const apiKey = "AIzaSyDDyeVHpYrQpNHJk17HlUgwcqpmgbxb0QE";
    const reqURL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`;

    const response = await fetch(reqURL);

    if (!response.ok) {
      throw json({ message: "Could not fetch the data" }, { status: 500 });
    }

    const responseData = await response.json();
    setResData(responseData.items);
  };
  console.log(resData);
  const sliceEndingLength = Math.min(resData.length - 1, 15);

  if (resData === undefined) {
    throw json({ message: "array is undefined" }, { status: 500 });
  }

  return (
    <>
      <section className={classes.searchBook}>
        <SearchBook
          needStateData={searchedValueChangeHandler}
          searchButtonClickHandler={searchClickHandler}
        />
        <button onClick={searchClickHandler} type="button">
          Search
        </button>
      </section>
      <hr className={classes.hr} />
      {Array.isArray(resData) &&
        resData.map(
          (item, index) =>
            index < 7 && (
              <li key={item.id}>
                <BooksList
                  id={item.id}
                  title={item.volumeInfo.title}
                  authors={item.volumeInfo.authors}
                  categories={item.volumeInfo.categories}
                  image={item.volumeInfo.imageLinks.thumbnail}
                  description={item.volumeInfo.description}
                  language={item.volumeInfo.language}
                  pages={item.volumeInfo.pageCount}
                />
              </li>
            )
        )}
    </>
  );
};

export default ExploreBooksPage;

// export const loader = async () => {
//   const searchKey = "circus";
//   const apiKey = "AIzaSyDDyeVHpYrQpNHJk17HlUgwcqpmgbxb0QE";
//   const reqURL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`;

//   const response = await fetch(reqURL);
//   const resData = await response.json();

//   console.log(resData);

//   return resData;
// };
