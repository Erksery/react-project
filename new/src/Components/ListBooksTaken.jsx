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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { Link } from "react-router-dom";
import { getWordByDigit } from "../String";

export const ListBooksTaken = () => {
  const [nameBook, setNameBook] = useState("");
  const [nameReader, setNameReader] = useState("");

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
      timeStamp: serverTimestamp(),
    });
    setData([
      ...data,
      {
        id: res.id,
        nameBook: { nameBook },
        nameReader: { nameReader },
        timeStamp: serverTimestamp(),
      },
    ]);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "listBooksTaken", id));
    const newData = data.filter((d) => d.id !== id);
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
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
    <div>
      <h1>Список взятых книг</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={nameBook}
          onChange={(e) => setNameBook(e.target.value)}
          placeholder="Название книги"
        />
        <input
          type="text"
          value={nameReader}
          onChange={(e) => setNameReader(e.target.value)}
          placeholder="Фамилия читателя"
        />

        <button type="submit">Добавить</button>
      </form>
      {data.map((item, index) => (
        <div key={index}>
          <li>
            Название книги: {item.nameBook.nameBook} | Фамилия читателя:{" "}
            {item.nameReader.nameReader}
          </li>
          <button onClick={() => handleDelete(item.id)}>Удалить</button>
        </div>
      ))}

      {dataPeople.map((item, index) => (
        <button onClick={() => setNameReader(item.name.name)} key={index}>
          Посетитель: {item.name.name}
        </button>
      ))}

      {dataBooks.map((item, index) => (
        <button onClick={() => setNameBook(item.name.name)} key={index}>
          Книга: {item.name.name}
        </button>
      ))}

      <Link to={"/"}>Главная</Link>

      <button onClick={() => console.log(getCount())} children={"test"} />

      {Object.keys(getCount()).map((key, index) => (
        <li key={index}>
          Книга "{key}" встречается {getCount()[key]}{" "}
          {getWordByDigit(getCount()[key], "раз", "раза", "раз")}
        </li>
      ))}
    </div>
  );
};
