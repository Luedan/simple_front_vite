import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("../login")),
  },
  {
    path: "/dashboard",
    Component: lazy(() => import("../../containers/layout")),
    children: [
        {
            path: "todo",
            Component: lazy(() => import("../todo")),
        }
    ]
  },
]);
