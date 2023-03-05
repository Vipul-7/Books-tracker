import { useLoaderData } from "react-router";
import BooksList from "../components/BooksListExplore";

const ExploreBooksPage = () => {
  const data = useLoaderData();
  return (
    <>
      {data.items.map((item) => (
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

export const loader = async () => {
  const searchKey = "circus";
  const apiKey = "AIzaSyDDyeVHpYrQpNHJk17HlUgwcqpmgbxb0QE";
  const reqURL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`;

  const response = await fetch(reqURL);
  const resData = await response.json();

  console.log(resData);

  return resData;
};
