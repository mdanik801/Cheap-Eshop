import React from "react";
import { allroute } from "./components/Route/allroute";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

export default function App() {
   const router = createBrowserRouter(allroute);
   return <RouterProvider className="container" router={router} />;
}
