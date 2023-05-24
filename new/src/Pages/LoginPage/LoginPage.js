import React from "react";
import { Link } from "react-router-dom";
import { Login } from "../../Components/Login/Login";
import "./CSS-LoginPage.css";
import { Icon36ChevronLeftOutline } from "@vkontakte/icons";
const LoginPage = () => {
  return (
    <div className="LoginPage-container">
      <div className="LoginPage">
        <div className="CloseLogin-container">
          <Link to={"/"}>
            <Icon36ChevronLeftOutline width={24} /> Главная
          </Link>
        </div>
        <h1>Войти</h1>
        <Login />
        <h3>
          Нету аккаунта?
          <Link to={"/register"}>Зарегистрироваться</Link>
        </h3>
      </div>
    </div>
  );
};

export default LoginPage;
