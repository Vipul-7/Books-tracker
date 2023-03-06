import { useEffect, useState } from "react";
import BooksList from "../components/BooksListExplore";
import SearchBook from "../components/UI/SearchBook";
import classes from "./ExploreBooks.module.css";

let intial = false;

const ExploreBooksPage = () => {
  const [searchedValue, setSearchedVal] = useState("");
  // const [resDatax, setResDatax] = useState({ items: [] });
  let resDatax;

  const searchedValueChangeHandler = (searchedVal) => {
    setSearchedVal(searchedVal);
    console.log(searchedVal);
  };

  // useEffect(() => {
  //   const sendReqToApi = async () => {
  //     if (searchedValue.trim() === "") {
  //       return;
  //     }
  //     setTimeout(async () => {
  //       // console.log(resData);
  //       setResDatax(resData);
  //     }, 1000);
  //   };
  //   sendReqToApi();
  // }, [searchedValue]);

  const searchClickHandler = async () => {
    const searchKey = searchedValue;
    const apiKey = "AIzaSyDDyeVHpYrQpNHJk17HlUgwcqpmgbxb0QE";
    const reqURL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`;

    const response = await fetch(reqURL);
    // const resData = await response.json();
    // setResDatax(await response.json());
    resDatax = await response.json();
    intial = true;
    console.log(resDatax);
  };

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
      {console.log("hey")}
      {intial &&
        resDatax.items.map((item,idx) => (
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
        ))}
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
