import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/userSlices";
import "./CSS-Form.css";
const Form = ({ title, handleClick }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="Form-container">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder={"Password"}
      />

      <button onClick={() => handleClick(email, pass)}>{title}</button>
    </div>
  );
};

export { Form };
