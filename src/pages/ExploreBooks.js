import { useLoaderData } from "react-router";
import BooksList from "../components/BooksList";

const ExploreBooksPage = () => {
  const data = useLoaderData();
  return (
    <>
      {data.items.map((item) => (
        <li key={item.id}>
          <BooksList
            title={item.volumeInfo.title}
            image={item.volumeInfo.imageLinks.thumbnail}
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
