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
import { db, storage } from "../firebase";
import { Link } from "react-router-dom";
export const New = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const [data, setData] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await addDoc(collection(db, "books"), {
      name: { name },
      author: { author },
      publisher: { publisher },
      publicationYear: { publicationYear },
      timeStamp: serverTimestamp(),
    });
    setData([
      ...data,
      {
        id: res.id,
        name: { name },
        author: { author },
        publisher: { publisher },
        publicationYear: { publicationYear },
        timeStamp: serverTimestamp(),
      },
    ]);
    // console.log(111, res);
    console.log(res._key.path.length);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "books", id));
    const newData = data.filter((d) => d.id !== id);
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
      // console.log(1, list);
      // setTimeout(() => console.log(2, data), 2000);
    };
    fetchData();
  }, []);

  // for (let item of data) {
  //   // console.log(item.id);
  //   console.log(item);
  // }

  return (
    <div>
      <h1>Книги</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button type="submit">Добавить</button>
      </form>
      {data.map((item, index) => (
        <div key={index}>
          <li>
            {item.author.author}, {item.name.name}, {item.publisher.publisher}
          </li>
          <button onClick={() => handleDelete(item.id)}>Удалить</button>
        </div>
      ))}

      <Link to={"/"}>Главная</Link>
    </div>
  );
};
