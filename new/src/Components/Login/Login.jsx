import React, { useState } from "react";
import { Form } from "../Form/Form";
import { useDispatch } from "react-redux";
import { setUser } from "store/slice/userSlices";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CSS-Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({ email: user.email, id: user.uid, token: user.refreshToken })
        );
        console.log(user);
        navigate("/");
      })
      .catch((e) => {
        if (e) {
          setError("Неверный пароль или логин");
        }
      });
  };

  return (
    <div className="Login-container">
      <Form title="Войти" handleClick={handleLogin} />
      <span>{error}</span>
    </div>
  );
};

export { Login };
