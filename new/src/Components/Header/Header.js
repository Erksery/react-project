import React, { useEffect } from "react";
import "./CSS-Header.css";
import { useDispatch } from "react-redux";
import useAuth from "../../Hooks/use-auth";
import { removeUser } from "../../store/slice/userSlices";
import { Link } from "react-router-dom";

export function Header() {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();

  return (
    <div className="Header-container">
      <div className="Header-Logo-container" style={{ flex: 1 }}></div>
      <div className="Header-Profile-container" style={{ flex: 1 }}>
        <p>{email}</p>
        {isAuth ? (
          <div className="Login">
            <button
              className="RemoveUser"
              onClick={() => {
                dispatch(removeUser());
                window.location.reload();
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="LoginForm">
            <Link to={"/register"}>Регистрация</Link>
            <Link to={"/login"}>Войти</Link>
          </div>
        )}
      </div>
    </div>
  );
}
