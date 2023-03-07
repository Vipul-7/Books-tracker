import FavoriteBooksList from "../components/FavoritesBookLists";
import { useSelector } from "react-redux";

const FavoritesPage = () => {
  const favBooks = useSelector((state) => state.favorite.favBooks);
  return (
    <>
      {favBooks.map((favb) => (
        <li key={favb.id}>
          <FavoriteBooksList
            id={favb.id}
            image={favb.image}
            image_alt={favb.title}
            title={favb.title}
            authors={favb.authors}
            categories={favb.categories}
            language={favb.language}
            pages={favb.pages}
            description={favb.description}
          />
        </li>
      ))}
    </>
  );
};

export default FavoritesPage;
