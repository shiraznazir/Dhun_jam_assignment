import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContext>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserContext>
  </React.StrictMode>
);
