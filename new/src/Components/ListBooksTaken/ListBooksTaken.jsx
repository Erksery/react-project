import React, { useEffect, useState } from "react";
import { getWordByDigit } from "../../String";
import "./CSS-BooksTaken.css";
import "./Transition-TakenBooks.css";
import { SideMenu } from "../SideMenu/SideMenu";
import { Header } from "../Header/Header";
import {
  Icon24Add,
  Icon56DeleteOutlineIos,
  Icon28InfoOutline,
  Icon28EditOutline,
  Icon20ColumnsSquare,
} from "@vkontakte/icons";
import { Transition } from "react-transition-group";
import { Link, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setItemData } from "../../store/slice/itemSlice";
import {
  setDateTaken,
  setNameBook,
  setNameReader,
  setData,
} from "../../store/slice/listTakenBooksSlice";
import Modal from "./Modal/Modal";
import { getTakenBooks } from "../../dataController";
import ModalClose from "./ModalClose";
import ModalDelete from "./Modal/ModalDelete";

export const ListBooksTaken = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.listTakenBooks.data);

  const [openAddListBooksTaken, setOpenAddListBooksTaken] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openDeleteBook, setOpenDeleteBook] = useState(false);

  const [modalActive, setModalActive] = useState(0);

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

  useEffect(() => {
    fetchTakenBooks();
  }, []);

  async function fetchTakenBooks() {
    const takenBooks = await getTakenBooks();
    dispatch(setData(takenBooks));
  }

  return (
    <div className="ListBooksTaken-container">
      {openAddListBooksTaken && (
        <ModalClose
          setOpenDeleteBook={setOpenDeleteBook}
          setOpenAddListBooksTaken={setOpenAddListBooksTaken}
        />
      )}
      {openDeleteBook && (
        <ModalClose
          setOpenDeleteBook={setOpenDeleteBook}
          setOpenAddListBooksTaken={setOpenAddListBooksTaken}
        />
      )}

      <Modal
        setOpenAddListBooksTaken={setOpenAddListBooksTaken}
        openAddListBooksTaken={openAddListBooksTaken}
      />

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
                onClick={() => setOpenAddListBooksTaken((prev) => !prev)}
              >
                <Icon24Add />
              </button>
            </div>
          </div>

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
                        setOpenAddListBooksTaken((prev) => !prev);
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

          <ModalDelete
            openDeleteBook={openDeleteBook}
            setOpenDeleteBook={setOpenDeleteBook}
          />
        </div>
      </div>
    </div>
  );
};
