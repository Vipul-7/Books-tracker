import FavoriteBooksList from "../components/favorite/FavoritesBookLists";
import { useEffect } from "react";
import Loading from "../components/Icons/Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteBooks } from "../util/http";
import { useNavigate } from "react-router";
import isValidToken from "../util/validateToken";

const FavoritesPage = () => {
  const navigate = useNavigate();

  const { data: favBooks, isPending, isError, error } = useQuery({
    queryKey: ["favorite"],
    queryFn: ({ signal }) => fetchFavoriteBooks({ signal })
  })

  useEffect(() => {
    if (!isValidToken()) {
      console.log("Not authenticated");
      navigate("/auth/login");
    }
  }, [])

  let content;
  if (favBooks) {
    content = favBooks.data?.favoriteBooks.map((favb) => (
      <li key={favb.id}>
        <FavoriteBooksList
          id={favb.id}
          bookId={favb.bookId}
          image={favb.image}
          image_alt={favb.title}
          title={favb.title}
          authors={favb.author}
          categories={favb.categories}
          language={favb.language}
          pages={favb.pages}
          description={favb.description}
          textSnippet={favb.textSnippet}
          previewLink={favb.previewLink}
        />
      </li>
    ))
  }
  if (isError) {
    content = <h1>{error}</h1>
  }
  if (isPending) {
    content = <Loading />
  }

  return (
    <>
      {content}
      {/* {!user && <NotLoggedIn pageName="Favorite Books" />} */}
    </>
  );
};

export default FavoritesPage;
