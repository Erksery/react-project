import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDocs,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db} from "../../firebase";

import { getWordByDigit } from "../../String";

import "./CSS-BooksTaken.css";
import "./Transition-TakenBooks.css";
import { SideMenu } from "../SideMenu/SideMenu";
import { Header } from "../Header/Header";
import {
  Icon24Add,
  Icon48CancelOutline,
  Icon56DeleteOutlineIos,
  Icon28InfoOutline,
  Icon24Dropdown,
  Icon28WarningTriangleOutline,
} from "@vkontakte/icons";
import { Transition } from "react-transition-group";


export const ListBooksTaken = () => {
  const [modalActive, setModalActive] = useState(0)

  const [openAddListBooksTaken, setOpenAddListBooksTaken] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openHelpTwo, setOpenHelpTwo] = useState(false);
  const [openDeleteBook, setOpenDeleteBook] = useState(false);


  const [deleteItemId, setDeleteItemId] = useState(null);

  const [nameBook, setNameBook] = useState("");
  const [nameReader, setNameReader] = useState("");
  const [dateTaken, setDateTaken] = useState("");

  const [data, setData] = useState([]);
  const [dataPeople, setDataPeople] = useState([]);
  const [dataBooks, setDataBooks] = useState([]);

  const getCount = () => {
    const copy = structuredClone(data);
    const dublicates = {};

    for (let book of copy) {
      const validateBook = dublicates[book.nameBook.nameBook];

      if (validateBook) {
        dublicates[book.nameBook.nameBook] = validateBook + 1;
      } else {
        dublicates[book.nameBook.nameBook] = 1;
      }
    }

    return dublicates;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await addDoc(collection(db, "listBooksTaken"), {
      nameBook: { nameBook },
      nameReader: { nameReader },
      dateTaken: { dateTaken },
      timeStamp: serverTimestamp(),
    });
    setData([
      ...data,
      {
        id: res.id,
        nameBook: { nameBook },
        nameReader: { nameReader },
        dateTaken: { dateTaken },
        timeStamp: serverTimestamp(),
      },
    ]);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "listBooksTaken", id));
    const newData = data.filter((d) => d.id !== id);
    setData(newData);
    setDeleteItemId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "listBooksTaken"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataBooks = async () => {
      const listBooks = [];
      const qa = query(collection(db, "books"));

      const querySnapshot = await getDocs(qa);
      querySnapshot.forEach((doc) => {
        listBooks.push({ id: doc.id, ...doc.data() });
      });
      setDataBooks(listBooks);
    };
    fetchDataBooks();
  }, []);

  useEffect(() => {
    const fetchPeopleData = async () => {
      const listPeople = [];
      const q = query(collection(db, "people"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        listPeople.push({ id: doc.id, ...doc.data() });
      });
      setDataPeople(listPeople);
    };
    fetchPeopleData();
  }, []);

  return (
    <div className="ListBooksTaken-container">
      {openAddListBooksTaken && (
        <div
          onClick={() => setOpenAddListBooksTaken(false)}
          style={{
            position: "fixed",
            height: "100vh",
            width: "100%",
            background: "rgba(0,0,0, 0.30)",
            zIndex: 100,
          }}
        />
      )}

      {openDeleteBook && (
        <div
          onClick={() => setOpenDeleteBook(false)}
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
      <div className="ListBooks">
        <Header />
        <div className="NamePage-container">
          <h1>Список взятых книг</h1>
        </div>
        <div className="ListBooksTaken">
          <div className="Editor-container">
            <div className="info">
              <h3>Количество взятых книг: {data.length}</h3>
              <div className="DropOpenInfo">
                <button
                  onMouseEnter={() => setOpenInfo((prev) => !prev)}
                  onMouseLeave={() => setOpenInfo(false)}
                >
                  <Icon28InfoOutline />
                </button>

                <Transition in={openInfo} timeout={500}>
                  {(openInfo) => (
                    <div className={`InfoModal-container ${openInfo}`}>
                      {Object.keys(getCount()).map((key, index) => (
                        <li key={index}>
                          Книга <strong>"{key}"</strong> встречается{" "}
                          {getCount()[key]}{" "}
                          {getWordByDigit(
                            getCount()[key],
                            "раз",
                            "раза",
                            "раз"
                          )}
                        </li>
                      ))}
                    </div>
                  )}
                </Transition>
              </div>
            </div>

            <div className="Editor">
              <input placeholder="Поиск..." />
              <button
                className="AddTakenBooks"
                onClick={() => setOpenAddListBooksTaken((prev) => !prev)}>
                <Icon24Add />
              </button>
            </div>
          </div>

          <Transition in={openAddListBooksTaken} timeout={500}>
            {(openAddListBooksTaken) => (
              <form
                onSubmit={handleAdd}
                className={`ModalAddTakenBooks ${openAddListBooksTaken}`}
                style={{ zIndex: 200 }}
              >
                <div className="CloseForm-container">
                  <button
                    type="button"
                    onClick={() => setOpenAddListBooksTaken(false)}
                  >
                    <Icon48CancelOutline />
                  </button>
                </div>
                <h1>Добавить взятую книгу</h1>
                <div className="InputModal">
                  <input
                    type="text"
                    value={nameBook}
                    onChange={(e) => setNameBook(e.target.value)}
                    placeholder="Название книги"
                  />
                  <div className="DropModal">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenHelpTwo((prev) => !prev);
                        setOpenHelp(false);
                      }}
                    >
                      <Icon24Dropdown />
                    </button>
                    {openHelpTwo && (
                      <div className="Modal">
                        {dataBooks.map((item, index) => (
                          <button
                            type="button"
                            className="ModalHelp-button"
                            onClick={() => {
                              setOpenHelpTwo(false);
                              setNameBook(item.name.name);
                            }}
                            key={index}
                          >
                            {item.name.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="InputModal">
                  <input
                    type="text"
                    value={nameReader}
                    onChange={(e) => setNameReader(e.target.value)}
                    placeholder="Фамилия читателя"
                  />
                  <div className="DropModal">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenHelp((prev) => !prev);
                        setOpenHelpTwo(false);
                      }}
                    >
                      <Icon24Dropdown />
                    </button>

                    {openHelp && (
                      <div className="Modal">
                        {dataPeople.map((item, index) => (
                          <button
                            type="button"
                            className="ModalHelp-button"
                            onClick={() => {
                              setOpenHelp(false);
                              setNameReader(item.name.name);
                            }}
                            key={index}
                          >
                            {item.name.name} ({item.libraryCard.libraryCard})
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <input
                  type="date"
                  value={dateTaken}
                  onChange={(e) => setDateTaken(e.target.value)}
                  placeholder="Дата выдачи"
                />

                <button type="submit">Добавить</button>
              </form>
            )}
          </Transition>

          {data.map((item, index) => (
            <div key={index} className="ListTaken">
              <li className="takenBooks">
                <h2>
                  Название книги: {item.nameBook.nameBook}
                  <div className="Button-container">
                    <button onClick={() => {
                      setOpenDeleteBook(prev => !prev)
                      setModalActive(index)
                    }}>Редактировать</button>
                    <button
                        className="DeleteBook"
                        onClick={() => {
                          window.confirm(item.id) && handleDelete(item.id);
                        }}
                        style={{ height: 40 }}
                    >
                      <Icon56DeleteOutlineIos width={28} />
                      Удалить
                    </button>
                  </div>

                  <Transition in={openDeleteBook} timeout={500}>
                    {(openDeleteBook) => (
                      <div
                        key={item.nameBook.nameBook}
                        className={`ModalDelete ${openDeleteBook}`}
                      >
                        <h3>
                          Удалить {item[modalActive]}
                          <button onClick={() => setOpenDeleteBook(false)}>
                            <Icon48CancelOutline />
                          </button>
                        </h3>
                        <div className="Warning-container">
                          <Icon28WarningTriangleOutline width={56} />
                          Это приведет к необратимому удалению всех данных,
                          включая все вложенные данные
                        </div>
                        <div className="Warning-button-container">
                          <button className="CancelButton" onClick={() => setOpenDeleteBook(false)}>{index}</button>
                          <button
                            className="ConfirmButton"
                            onClick={() => {
                              handleDelete(item.id);
                              setOpenDeleteBook(false);
                            }}
                          >
                            {item.id}
                          </button>
                        </div>
                      </div>
                    )}
                  </Transition>
                </h2>
                <h3>
                  <strong> Фамилия читателя: </strong>
                  {item.nameReader.nameReader},<strong> Дата выдачи: </strong>
                  {item.dateTaken.dateTaken}
                </h3>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
