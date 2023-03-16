import { useSelector } from "react-redux";
import ToReadLists from "../components/ToReadLists";

const ToReadPage = () => {
  const ToReadBooks = useSelector((state) => state.toRead.ToReadBooks);
  return (
    <>
      {ToReadBooks.map((book) => (
        <li key={book.id}>
          <ToReadLists
            id={book.id}
            image={book.image}
            image_alt={book.title}
            title={book.title}
            authors={book.authors}
            categories={book.categories}
            language={book.language}
            pages={book.pages}
            description={book.description}
          />
        </li>
      ))}
    </>
  );
};

export default ToReadPage;
