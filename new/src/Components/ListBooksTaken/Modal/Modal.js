import React, { useEffect, useState } from "react";
import { Icon24Dropdown, Icon48CancelOutline } from "@vkontakte/icons";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import {
  setNameBook,
  setNameReader,
  setDateTaken,
  setData,
} from "../../../store/slice/listTakenBooksSlice";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { getBooks, getPeople, getTakenBooks } from "../../../dataController";
function Modal({ openAddListBooksTaken, setOpenAddListBooksTaken }) {
  const dispatch = useDispatch();

  const nameBook = useSelector((state) => state.listTakenBooks.nameBook);
  const nameReader = useSelector((state) => state.listTakenBooks.nameReader);
  const dateTaken = useSelector((state) => state.listTakenBooks.dateTaken);
  const data = useSelector((state) => state.listTakenBooks.data);

  const [openHelp, setOpenHelp] = useState(false);
  const [openHelpTwo, setOpenHelpTwo] = useState(false);

  const [dataPeople, setDataPeople] = useState([]);
  const [dataBooks, setDataBooks] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await addDoc(collection(db, "listBooksTaken"), {
      nameBook: { nameBook },
      nameReader: { nameReader },
      dateTaken: { dateTaken },
    });
    dispatch(
      setData([
        ...data,
        {
          id: res.id,
          nameBook: { nameBook },
          nameReader: { nameReader },
          dateTaken: { dateTaken },
        },
      ])
    );
  };

  useEffect(() => {
    fetchBooks();
    fetchTakenBooks();
    fetchPeopleData();
  }, []);

  async function fetchBooks() {
    const books = await getBooks();
    setDataBooks(books);
  }

  async function fetchPeopleData() {
    const people = await getPeople();
    setDataPeople(people);
  }
  async function fetchTakenBooks() {
    const takenBooks = await getTakenBooks();
    dispatch(setData(takenBooks));
  }

  return (
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
              onChange={(e) => dispatch(setNameBook(e.target.value))}
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
                        dispatch(setNameBook(item.name.name));
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
              onChange={(e) => dispatch(setNameReader(e.target.value))}
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
                        dispatch(setNameReader(item.name.name));
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
            onChange={(e) => dispatch(setDateTaken(e.target.value))}
            placeholder="Дата выдачи"
          />

          <button type="submit">Добавить</button>
        </form>
      )}
    </Transition>
  );
}

export default Modal;
