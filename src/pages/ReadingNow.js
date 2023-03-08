import CurrentRead from "../components/Current-read";
import { useSelector } from "react-redux";

const ReadingNowPage = () => {
  const CurrentReadBooks = useSelector((state) => state.Current.books);

  return (
    <>
      <div>
        {CurrentReadBooks.map((book) => (
          <li key={book.id}>
            <CurrentRead
              id={book.id}
              title={book.title}
              image={book.image}
              image_alt={book.title}
              authors={book.authors}
              categories={book.categories}
              Totalpages={book.Totalpages}
            />
          </li>
        ))}
      </div>
    </>
  );
};

export default ReadingNowPage;
