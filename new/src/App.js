import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { getDatabase, ref, set } from "firebase/database";
import { New } from "./Components/New";
import { NewPeople } from "./Components/NewPeople";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/books" element={<New />} />
      <Route path="/people" element={<NewPeople />} />
    </Routes>
  );
}

export default App;
