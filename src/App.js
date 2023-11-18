import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useUserData } from "./context/UserContext";
import { Outlet } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails] = useUserData();
  const loggedIn = userDetails?.id ? true : false;

  useEffect(() => {
    if (
      (location.pathname === "/" || location.pathname === "/admin-dashboard") &&
      !loggedIn
    ) {
      navigate("/login");
    } else if (loggedIn) {
      navigate("/admin-dashboard");
    }
  }, [loggedIn, location.pathname, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
