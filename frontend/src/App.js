import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
// import ExploreBooksPage, { loader as booksLoader } from "./pages/ExploreBooks";
import ExploreBooksPage from "./pages/ExploreBooks";
import HomePage from "./pages/HomePage";
import ReadingNowPage from "./pages/ReadingNow";
import ToReadPage from "./pages/ToRead";
import HaveReadPage from "./pages/HaveRead";
import FavoritesPage from "./pages/Favorites";
import ErrorPage from "./pages/Error";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { CurrentReadActions } from "./store/current-read-slice";
import { ToReadActions } from "./store/to-read-slice";
import { haveReadActions } from "./store/have-read-slice";
import { favActions } from "./store/favorite-slice";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import Signup from "./pages/Signup";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "reading-now",
        element: <ReadingNowPage />,
      },
      {
        path: "to-read",
        element: <ToReadPage />,
      },
      {
        path: "have-read",
        element: <HaveReadPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "explore-books",
        element: <ExploreBooksPage />,
        // loader: booksLoader,
      },
      {
        path: "auth",
        children: [
          { path: "signup", element: <SignupPage /> },
          { path: "login", element: <LoginPage /> },
        ]
      },
    ],
  },
]);

function App() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  // when user logout clear all the data
  if (!user) {
    dispatch(CurrentReadActions.replaceCurrentReadBooks([]));
    dispatch(ToReadActions.replaceToReadBooks([]));
    dispatch(haveReadActions.replaceCompletedBooks([]));
    dispatch(favActions.replaceFavoriteBooks([]));
  }

  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>;
}

export default App;