import React from 'react';
import {Link} from "react-router-dom";
import {Login} from "../Components/Login";

const LoginPage = () => {
    return (
        <div>
            <h1>Войти</h1>
            <Login/>
            <h3>Нету аккаунта?
                <Link to={"/register"}>Зарегистрироваться</Link>
            </h3>
            <Link to={"/"}>Главная</Link>

        </div>
    );
};

export default LoginPage;