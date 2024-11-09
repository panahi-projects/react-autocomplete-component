import { createBrowserRouter } from "react-router-dom";

import TestPage from "./test";

const router = createBrowserRouter([
  {
    path: "/",
    Component: TestPage,
  },
]);

export default router;
