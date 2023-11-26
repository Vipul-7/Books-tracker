import { RouterProvider, redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ExploreBooksPage from "./pages/ExploreBooks";
import HomePage from "./pages/HomePage";
import ReadingNowPage from "./pages/ReadingNow";
import ToReadPage from "./pages/ToRead";
import HaveReadPage from "./pages/HaveRead";
import FavoritesPage from "./pages/Favorites";
import ErrorPage from "./pages/Error";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

function App() {
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

  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>;
}

export default App;
