import { useSelector } from "react-redux";
import HaveReadLists from "../components/HaveReadLists";

const HaveReadPage = () => {
  const completedBooks = useSelector((state) => state.haveRead.completedBooks);
  return (
    <>
      {completedBooks.map((done) => (
        <li key={done.id}>
          <HaveReadLists
            id={done.id}
            image={done.image}
            image_alt={done.title}
            title={done.title}
            authors={done.authors}
            categories={done.categories}
            language={done.language}
            pages={done.pages}
            description={done.description}
          />
        </li>
      ))}
    </>
  );
};

export default HaveReadPage;
