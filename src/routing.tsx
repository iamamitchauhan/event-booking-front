import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Show from "./pages/events/Show";
import BookEvent from "./pages/events/BookEvent";
import PageNotFound from "./pages/page-not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book-event",
    element: <BookEvent />,
  },
  {
    path: "/events",
    element: <Show />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

export default router;
