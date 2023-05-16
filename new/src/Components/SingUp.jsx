import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "./Form";
import { useDispatch } from "react-redux";
import { setUser } from "store/slice/userSlices";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SingUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegistration = (email, password) => {
    const auth = getAuth();
    console.log(auth);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
      })
      .catch(() => navigate("/login"));
  };

  return (
    <>
      <Form title="Регистрация" handleClick={handleRegistration} />
    </>
  );
};

export default SingUp;
