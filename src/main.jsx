import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./App";
import { LinkID } from "./page/LinkID";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />
   },
   {
      path: "/:linkid",
      element: <LinkID />
   }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <RouterProvider router={router} />
);
