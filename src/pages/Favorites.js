import FavoriteBooksList from "../components/FavoritesBookLists";
import { useDispatch, useSelector } from "react-redux";
import useRetrieveData from "../hooks/use-retrieve-data";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { LoginActions } from "../store/login-slice";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveFavoriteData } = useRetrieveData();

  // if not logged in then show login modal
  if (!user) {
    dispatch(LoginActions.changeShowLoginModal());
  }

  useEffect(() => {
    retrieveFavoriteData("favorite");
  }, []);

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
