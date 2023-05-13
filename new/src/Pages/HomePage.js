import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import useAuth from "../Hooks/use-auth";
import {removeUser} from "../store/slice/userSlices";

const HomePage = () => {
    const dispatch = useDispatch()

    const [state, setstate] = useState(0)
    const {isAuth, email} = useAuth()

    return (
        <div>
            <h1>Home</h1>
            <h3>{email}</h3>
            {isAuth ?  <button onClick={() => {
                dispatch(removeUser())
                window.location.reload()}}>Выйти</button> : null}

            <Link to={"/register"}>
                Register
            </Link>

            <Link to={"/login"}>
                Login
            </Link>

        </div>
    );
};

export default HomePage;