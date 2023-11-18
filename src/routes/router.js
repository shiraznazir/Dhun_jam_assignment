import {
    createBrowserRouter,
  } from "react-router-dom";
  import App from "../App";
  import Login from "../components/Login";
  import AdminDashboard from "../components/AdminDashboard";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
    },
  ]);