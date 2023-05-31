import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { getDatabase, ref, set } from "firebase/database";
import { New } from "./Components/AddBooks/New";
import { NewPeople } from "./Components/AddVisitor/NewPeople";
import { ListBooksTaken } from "./Components/ListBooksTaken/ListBooksTaken";
import ItemsPage from "./Pages/ItemsPage/ItemsPage";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  return (
    <>
      <TransitionGroup>
        <CSSTransition key={location.key} className="fade" timeout={500}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/books" element={<New />} />
            <Route path="/people" element={<NewPeople />} />
            <Route path="/booksTaken" element={<ListBooksTaken />} />
            <Route path="/items/:id" element={<ItemsPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
