import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../Hooks/use-auth";
import { removeUser } from "../store/slice/userSlices";
import { New } from "../Components/New";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <h3>{email}</h3>

      {isAuth ? (
        <div className="Auth">
          <button
            onClick={() => {
              dispatch(removeUser());
              window.location.reload();
            }}
          >
            Выйти
          </button>
          <Link to={"/books"}>Книги</Link>
          <Link to={"/people"}>Посетители</Link>
        </div>
      ) : (
        <div className="LoginForm">
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
