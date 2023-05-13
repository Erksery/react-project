import React from 'react';
import {Link} from "react-router-dom";
import SingUp from "../Components/SingUp";

const RegisterPage = () => {
    return (
        <div>
            <h1>Регистрация</h1>
            <SingUp/>
            <h3>Уже есть аккаунт
                ?<Link to={"/login"}>Войти</Link>
            </h3>
            <Link to={"/"}>Главная</Link>
        </div>
    );
};

export default RegisterPage;