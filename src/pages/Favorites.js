import FavoriteBooksList from "../components/FavoritesBookLists";
import { useSelector } from "react-redux";
import useRetrieveData from "../hooks/use-retrieve-data";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import NotLoggedIn from "../components/NotLoggedIn";

const FavoritesPage = () => {
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveFavoriteData, isLoading } = useRetrieveData();

  useEffect(() => {
    if (user) {
      retrieveFavoriteData("favorite");
    }
  }, []);

  const favBooks = useSelector((state) => state.favorite.favBooks);

  return (
    <>
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}

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
      {!user && <NotLoggedIn pageName="Favorite Books" />}
    </>
  );
};

export default FavoritesPage;
