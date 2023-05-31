import React, { useEffect, useState } from "react";
import { Icon24Dropdown, Icon48CancelOutline } from "@vkontakte/icons";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAddListBooksTaken,
  setNameBook,
  setNameReader,
  setDateTaken,
  setData,
} from "../../../store/slice/listTakenBooksSlice";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
function Modal() {
  const dispatch = useDispatch();

  const openAddListBooksTaken = useSelector(
    (state) => state.listTakenBooks.openAddListBooksTaken
  );
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
    setData([
      ...data,
      {
        id: res.id,
        nameBook: { nameBook },
        nameReader: { nameReader },
        dateTaken: { dateTaken },
      },
    ]);
    console.log("111");
  };

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
              onClick={() => dispatch(setOpenAddListBooksTaken(false))}
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
