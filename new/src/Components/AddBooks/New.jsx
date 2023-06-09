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
import { db, storage } from "../../firebase";
import { SideMenu } from "../SideMenu/SideMenu";
import "./CSS-Books.css";
import "./Transition-Books.css";
import { Header } from "../Header/Header";
import { Icon24Add, Icon56DeleteOutlineIos } from "@vkontakte/icons";
import { Icon48CancelOutline } from "@vkontakte/icons";
import { Transition } from "react-transition-group";
import { getBooks } from "../../dataController";
import { setData } from "../../store/slice/listTakenBooksSlice";
export const New = () => {
  const [openModalAddBook, setOpenModalAddBook] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [numberCopies, setNumberCopies] = useState(0);

  const [data, setData] = useState([]);
  const [isOrder, setIsOrder] = useState(true);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await addDoc(collection(db, "books"), {
      name: { name },
      author: { author },
      publisher: { publisher },
      publicationYear: { publicationYear },
      numberCopies: { numberCopies },
      timeStamp: serverTimestamp(),
    });
    setData([
      {
        id: res.id,
        name: { name },
        author: { author },
        publisher: { publisher },
        publicationYear: { publicationYear },
        numberCopies: { numberCopies },
        timeStamp: serverTimestamp(),
      },
      ...data,
    ]);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "books", id));
    const newData = data.filter((d) => d.id !== id);
    setData(newData);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const books = await getBooks();
    books.sort((a, b) => {
      if (a.timeStamp > b.timeStamp) {
        return -1;
      }
      if (a.timeStamp < b.timeStamp) {
        return 1;
      }
      return 0;
    });
    setData(books);
  }

  const handleSortByName = () => {
    setData(
      [...data].sort((a, b) => {
        if (a.timeStamp > b.timeStamp) {
          return isOrder ? 1 : -1;
        }
        if (a.timeStamp < b.timeStamp) {
          return isOrder ? -1 : 1;
        }
        return 0;
      })
    );
    setIsOrder(!isOrder);
  };

  return (
    <div className="Books-container">
      {openModalAddBook && (
        <div
          onClick={() => setOpenModalAddBook(false)}
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
      <div className="Books">
        <Header />
        <div className="NamePage-container">
          <h1>Книги</h1>
        </div>
        <div className="ListBooks-container">
          <div className="Editor-container">
            <h3>Количество добавленных книг: {data.length}</h3>
            <div className="Editor">
              <button
                onClick={() => {
                  handleSortByName();
                }}
              >
                {isOrder ? "По убыванию" : "По возрастанию"}
              </button>
              <input placeholder="Поиск..." />
              <button
                className="AddButton"
                onClick={() => setOpenModalAddBook((prev) => !prev)}
              >
                <Icon24Add />
              </button>
            </div>
          </div>

          <Transition in={openModalAddBook} timeout={500}>
            {(openModalAddBook) => (
              <form
                onSubmit={handleAdd}
                className={`ModalAddButton ${openModalAddBook}`}
                style={{ zIndex: 200 }}
              >
                <div className="CloseForm-container">
                  <button
                    type="button"
                    onClick={() => setOpenModalAddBook(false)}
                  >
                    <Icon48CancelOutline />
                  </button>
                </div>

                <h1>Добавить книгу</h1>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    {
                      e.target.value.length === 0
                        ? setDisabled(true)
                        : setDisabled(false);
                    }
                  }}
                  placeholder="Название"
                />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Автор"
                />
                <input
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="Издатель"
                />
                <input
                  type="date"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(e.target.value)}
                  placeholder="Год издания"
                />
                <input
                  type="number"
                  value={numberCopies}
                  onChange={(e) => setNumberCopies(e.target.value)}
                  placeholder="Число экземпляров"
                />

                <button type="submit" disabled={disabled}>
                  Добавить
                </button>
              </form>
            )}
          </Transition>

          {data.map((item, index) => (
            <div key={index} className="ListBooks">
              <li className="books">
                <h2>
                  Название: {item.name.name}
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ height: 40 }}
                  >
                    <Icon56DeleteOutlineIos width={28} />
                    Удалить
                  </button>
                </h2>
                <h3>
                  <strong>Автор: </strong>
                  {item.author.author},<strong> Дата выхода: </strong>
                  {item.publicationYear.publicationYear}
                </h3>
                <h3>
                  <strong>Издатель: </strong>
                  {item.publisher.publisher},
                  <strong> Количество копий: </strong>
                  {item.numberCopies.numberCopies}
                </h3>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
