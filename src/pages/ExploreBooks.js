import { useState } from "react";
import BooksList from "../components/BooksListExplore";
import SearchBook from "../components/UI/SearchBook";
import classes from "./ExploreBooks.module.css";
import { json } from "react-router";
import Loading from "../components/Icons/Loading";

const notAvailable = "Not available";

const ExploreBooksPage = () => {
  const [searchedValue, setSearchedVal] = useState("");
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyClick, setIsEmptyClick] = useState(false);

  const searchedValueChangeHandler = (searchedVal) => {
    setSearchedVal(searchedVal);
  };

  const searchClickHandler = async () => {
    if (searchedValue.length === 0) {
      setIsEmptyClick(true);
      return;
    }
    setIsEmptyClick(false);
    setIsLoading(true);
    const searchKey = searchedValue;
    const apiKey = process.env.REACT_APP_API_KEY;
    const reqURL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`;

    const response = await fetch(reqURL);

    if (!response.ok) {
      throw json({ message: "Could not fetch the data" }, { status: 500 });
    }

    const responseData = await response.json();
    console.log(responseData);
    setResData(responseData.items);
    setIsLoading(false);
  };

  return (
    <>
      <section className={classes.searchBook}>
        <SearchBook
          needStateData={searchedValueChangeHandler}
          searchButtonClickHandler={searchClickHandler}
          searchClickHandler={searchClickHandler}
        />
      </section>
      {isEmptyClick && (
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginTop: "0px",
            color: "red",
          }}
        >
          Enter Valid book name
        </p>
      )}
      <hr className={classes.hr} />

      {isLoading && <Loading />}

      {resData.length > 0 &&
        resData.slice(0, resData.length).map((item) => (
          <li key={item.id}>
            <BooksList
              id={item.id}
              title={item.volumeInfo.title}
              authors={
                item.volumeInfo.authors == null
                  ? ["None"]
                  : item.volumeInfo.authors
              }
              categories={
                item.volumeInfo.categories == null
                  ? [notAvailable]
                  : item.volumeInfo.categories
              }
              image={
                item.volumeInfo.imageLinks == null
                  ? "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
                  : item.volumeInfo.imageLinks.thumbnail
              }
              description={
                item.volumeInfo.description == null
                  ? notAvailable
                  : item.volumeInfo.description
              }
              language={
                item.volumeInfo.language == null
                  ? notAvailable
                  : item.volumeInfo.language
              }
              pages={
                item.volumeInfo.pageCount == null
                  ? notAvailable
                  : item.volumeInfo.pageCount
              }
              textSnippet={
                item.searchInfo == null
                  ? notAvailable
                  : item.searchInfo.textSnippet
              }
              previewLink={
                item.volumeInfo.previewLink == null
                  ? notAvailable
                  : item.volumeInfo.previewLink
              }
            />
          </li>
        ))}
    </>
  );
};

export default ExploreBooksPage;
