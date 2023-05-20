import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Link } from "react-router-dom";
import "./CSS-NewPeople.css";
import "./Transition-Visitors.css";
import { SideMenu } from "../SideMenu/SideMenu";
import { Header } from "../Header/Header";
import {
  Icon24Add,
  Icon48CancelOutline,
  Icon56DeleteOutlineIos,
} from "@vkontakte/icons";
import { Transition } from "react-transition-group";

export const NewPeople = () => {
  const [name, setName] = useState("");
  const [libraryCard, setLibraryCard] = useState("");
  const [numberPassport, setNumberPassport] = useState("");
  const [numberTelephone, setNumberTelephone] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [education, setEducation] = useState("");
  const [numberHell, setNumberHell] = useState("");

  const [data, setData] = useState([]);

  const [openModalAddVisitor, setOpenModalAddVisitor] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await addDoc(collection(db, "people"), {
      name: { name },
      libraryCard: { libraryCard },
      numberPassport: { numberPassport },
      numberTelephone: { numberTelephone },
      dateBirth: { dateBirth },
      education: { education },
      numberHell: { numberHell },
      timeStamp: serverTimestamp(),
    });
    setData([
      ...data,
      {
        id: res.id,
        name: { name },
        libraryCard: { libraryCard },
        numberPassport: { numberPassport },
        numberTelephone: { numberTelephone },
        dateBirth: { dateBirth },
        education: { education },
        numberHell: { numberHell },
        timeStamp: serverTimestamp(),
      },
    ]);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "people", id));
    const newData = data.filter((d) => d.id !== id);
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      const querySnapshot = await getDocs(collection(db, "people"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    };
    fetchData();
  }, []);

  return (
    <div className="Visitor-container">
      {openModalAddVisitor && (
        <div
          onClick={() => setOpenModalAddVisitor(false)}
          style={{
            position: "fixed",
            height: "100vh",
            width: "100%",
            background: "rgba(0,0,0, 0.30)",
            zIndex: 100,
          }}
        />
      )}
      <SideMenu />
      <div className="Visitors">
        <Header />
        <div className="NamePage-container">
          <h1>Посетители</h1>
        </div>
        <Transition in={openModalAddVisitor} timeout={500}>
          {(openModalAddVisitor) => (
            <form
              onSubmit={handleAdd}
              className={`ModalAddVisitor ${openModalAddVisitor}`}
              style={{ zIndex: 200 }}
            >
              <div className="CloseForm-container">
                <button
                  type="button"
                  onClick={() => setOpenModalAddVisitor(false)}
                >
                  <Icon48CancelOutline />
                </button>
              </div>
              <h1>Добавить посетителя</h1>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Фамилия"
              />
              <input
                type="number"
                value={libraryCard}
                onChange={(e) => setLibraryCard(e.target.value)}
                placeholder="Читательский билет"
              />
              <input
                type="number"
                value={numberPassport}
                onChange={(e) => setNumberPassport(e.target.value)}
                placeholder="Номер паспота"
              />
              <input
                type="tel"
                value={numberTelephone}
                onChange={(e) => setNumberTelephone(e.target.value)}
                placeholder="Номер телефона"
              />
              <input
                type="date"
                value={dateBirth}
                onChange={(e) => setDateBirth(e.target.value)}
                placeholder="Дата рождения"
              />
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Образование"
              />
              <input
                type="number"
                value={numberHell}
                onChange={(e) => setNumberHell(e.target.value)}
                placeholder="Номер зала"
              />

              <button type="submit">Добавить</button>
            </form>
          )}
        </Transition>

        <div className="ListVisitor-container">
          <div className="Editor-container">
            <h3>Количество зарегистрированых посетителей: {data.length}</h3>
            <div className="Editor">
              <input placeholder="Поиск..." />
              <button
                className="AddVisitor"
                onClick={() => setOpenModalAddVisitor((prev) => !prev)}
              >
                <Icon24Add />
              </button>
            </div>
          </div>
          {data.map((item, index) => (
            <div key={index} className="ListVisitor">
              <li className="visitor">
                <h2>
                  Фамилия: {item.name.name}
                  <button onClick={() => handleDelete(item.id)}>
                    <Icon56DeleteOutlineIos width={28} />
                    Удалить
                  </button>
                </h2>
                <h3>
                  <strong>Дата рождения: </strong>
                  {item.dateBirth.dateBirth},
                  <strong> Читательский билет: </strong>
                  {item.libraryCard.libraryCard}
                </h3>
                <h3>
                  <strong> Номер паспорта: </strong>
                  {item.numberPassport.numberPassport},
                  <strong> Номер телефона: </strong>
                  {item.numberTelephone.numberTelephone}
                </h3>
                <h3>
                  <strong>Образование: </strong>
                  {item.education.education},<strong> Номер зала: </strong>
                  {item.numberHell.numberHell}
                </h3>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
