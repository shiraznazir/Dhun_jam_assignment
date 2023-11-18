import React, { useRef, useState, useEffect } from "react";
import { IoEye } from "react-icons/io5";
import { loginAPI, adminDetails } from "../../apis/api";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [userDetails, setUserDetails] = useUserData();

  const getAdminDetails = (id) => {
    adminDetails(id)
      .then((res) => {
        if (res?.status === 200) {
          setUserDetails({ ...userDetails, ...res?.data });
          navigate("/admin-dashboard");
        }
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameRef.current.value === "") {
      setError({
        username: true,
        msg: "Username is required",
      });
      const username = document.getElementById("username");
      username.style.borderColor = "red";
      setTimeout(() => {
        setError({});
        username.style.borderColor = "#c2c2c2";
      }, 5000);
    } else if (passwordRef.current.value === "") {
      setError({
        password: true,
        msg: "Password is required",
      });
      const password = document.getElementById("password");
      password.style.borderColor = "red";
      setTimeout(() => {
        setError({});
        password.style.borderColor = "#c2c2c2";
      }, 5000);
    } else {
      setDisable(true);
      loginAPI({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
        .then((res) => {
          if (res?.status === 200) {
            setUserDetails({
              id: res?.data?.id,
              token: res.data.token,
              username: usernameRef.current.value,
            });
            getAdminDetails(res?.data?.id);
            setDisable(false);
          }
        })
        .catch((err) => {
          setDisable(false);
          console.log("Error ", err);
        });
    }
  };

  return (
    <div className="login-container">
      <p className="heading">Venue Admin Login</p>
      <div className="flex-column">
        <input
          id="username"
          ref={usernameRef}
          className="width"
          type="text"
          placeholder="username"
          maxLength={25}
        />
        {error.username && <span className="error">{error.msg}</span>}
      </div>
      <div className="password flex-column">
        <input
          id="password"
          ref={passwordRef}
          className="width"
          type={show ? "text" : "password"}
          placeholder="password"
          maxLength={25}
        />
        <IoEye onClick={() => setShow(!show)} className="eye-icon" />
        {error.password && <span className="error">{error.msg}</span>}
      </div>
      <button
        className="btn cursor-pointer"
        type="button"
        onClick={handleLogin}
        disabled={disable}
      >
        {disable ? "Please wait..." : "Sign in"}
      </button>
      <p className="text">New Registration ?</p>
    </div>
  );
};

export default Login;
