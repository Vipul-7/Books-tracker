import { useSelector } from "react-redux";
import Card from "../components/UI/Card";

const FavoritesPage = () => {
  const favBooks = useSelector((state) => state.favorite.favBooks);
  return (
    <div>
      {favBooks.map((favb) => (
        <li key={favb.id}>
          <Card
            id={favb.id}
            image={favb.image}
            image_alt={favb.title}
            title={favb.title}
            authors={favb.authors}
            categories={favb.categories}
            language={favb.language}
            pages={favb.pages}
          />
        </li>
      ))}
    </div>
  );
};

export default FavoritesPage;
