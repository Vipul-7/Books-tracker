import FavoriteBooksList from "../components/FavoritesBookLists";
import { useSelector } from "react-redux";
import useRetrieveData from "../hooks/use-retrieve-data";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import NotLoggedIn from "../components/NotLoggedIn";
import Loading from "../components/Icons/Loading";

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
      {isLoading && <Loading />}

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
            textSnippet={favb.textSnippet}
            previewLink={favb.previewLink}
          />
        </li>
      ))}
      {!user && <NotLoggedIn pageName="Favorite Books" />}
    </>
  );
};

export default FavoritesPage;
