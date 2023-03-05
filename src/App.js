import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ExploreBooksPage, { loader as booksLoader } from "./pages/ExploreBooks";
import HomePage from "./pages/HomePage";
import ReadingNowPage from "./pages/ReadingNow";
import ToReadPage from "./pages/ToRead";
import HaveReadPage from "./pages/HaveRead";
import FavoritesPage from "./pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        loader: booksLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
