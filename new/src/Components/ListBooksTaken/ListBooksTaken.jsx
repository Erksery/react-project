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
import { db } from "../../firebase";

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
  Icon28EditOutline,
  Icon12Chain,
  Icon20ColumnsSquare,
} from "@vkontakte/icons";
import { Transition } from "react-transition-group";
import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { setItemData } from "../../store/slice/itemSlice";
import {
  setDateTaken,
  setNameBook,
  setNameReader,
  setOpenAddListBooksTaken,
  setData,
} from "../../store/slice/listTakenBooksSlice";
import Modal from "./Modal/Modal";

export const ListBooksTaken = () => {
  const dispatch = useDispatch();
  const { itemData } = useSelector((state) => state.item);

  const openAddListBooksTaken = useSelector(
    (state) => state.listTakenBooks.openAddListBooksTaken
  );
  const nameBook = useSelector((state) => state.listTakenBooks.nameBook);
  const nameReader = useSelector((state) => state.listTakenBooks.nameReader);
  const dateTaken = useSelector((state) => state.listTakenBooks.dateTaken);
  const data = useSelector((state) => state.listTakenBooks.data);

  const [openInfo, setOpenInfo] = useState(false);

  const [openDeleteBook, setOpenDeleteBook] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [modalActive, setModalActive] = useState(0);

  const [deleteItemId, setDeleteItemId] = useState(null);

  // const [nameBook, setNameBook] = useState("");
  // const [nameReader, setNameReader] = useState("");
  // const [dateTaken, setDateTaken] = useState("");
  // const [itemData, setItemData] = useState("");

  // const [data, setData] = useState([]);

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "listBooksTaken", id));
    const newData = data.filter((d) => d.id !== id);
    dispatch(setData(newData));
    setDeleteItemId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "listBooksTaken"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setData(list));
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
                onClick={() =>
                  dispatch(setOpenAddListBooksTaken((prev) => !prev))
                }
              >
                <Icon24Add />
              </button>
            </div>
          </div>

          <Modal />

          {data.map((item, index) => (
            <div key={index} className="ListTaken">
              <li className="takenBooks">
                <h2>
                  Название книги: {item.nameBook.nameBook}
                  <div className="Button-container">
                    <Link
                      onClick={() => dispatch(setItemData(item))}
                      to={`/items/${item.id}`}
                      style={{
                        width: 30,
                        margin: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "gray",
                      }}
                    >
                      <Icon20ColumnsSquare />
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(setOpenAddListBooksTaken((prev) => !prev));
                        dispatch(setItemData(item));
                        dispatch(setNameReader(item.nameReader.nameReader));
                        dispatch(setNameBook(item.nameBook.nameBook));
                        dispatch(setDateTaken(item.dateTaken.dateTaken));
                      }}
                    >
                      <Icon28EditOutline />
                    </button>
                    <button
                      className="DeleteBook"
                      onClick={() => {
                        // window.confirm(item.id) && handleDelete(item.id);
                        setOpenDeleteBook((prev) => !prev);
                        dispatch(setItemData(item));
                        setModalActive(index);
                      }}
                    >
                      <Icon56DeleteOutlineIos width={28} />
                    </button>
                  </div>
                </h2>
                <h3>
                  <strong> Фамилия читателя: </strong>
                  {item.nameReader.nameReader},<strong> Дата выдачи: </strong>
                  {item.dateTaken.dateTaken}
                </h3>
              </li>
            </div>
          ))}

          <Transition in={openDeleteBook} timeout={500}>
            {(open) => (
              <div className={`ModalDelete ${open}`}>
                <h3>
                  Удалить
                  <button onClick={() => setOpenDeleteBook(false)}>
                    <Icon48CancelOutline />
                  </button>
                </h3>
                <div className="Warning-container">
                  <Icon28WarningTriangleOutline width={56} />
                  Это приведет к необратимому удалению всех данных, включая все
                  вложенные данные
                </div>
                <div className="Warning-button-container">
                  <button
                    className="CancelButton"
                    onClick={() => setOpenDeleteBook(false)}
                  >
                    Отмена
                  </button>
                  <button
                    className="ConfirmButton"
                    onClick={() => {
                      handleDelete(itemData.id);
                      setOpenDeleteBook(false);
                    }}
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </div>
    </div>
  );
};
