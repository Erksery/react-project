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

export const NewPeople = () => {
  const [name, setName] = useState("");
  const [libraryCard, setLibraryCard] = useState("");
  const [numberPassport, setNumberPassport] = useState("");
  const [numberTelephone, setNumberTelephone] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [education, setEducation] = useState("");
  const [numberHell, setNumberHell] = useState("");

  const [data, setData] = useState([]);

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
    // console.log(111, res);
    console.log(res._key.path.length);
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
      <h1>Посетители</h1>
      <form onSubmit={handleAdd}>
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
      {data.map((item, index) => (
        <div key={index}>
          <li>
            Фамилия: {item.name.name} | Дата рождения:{" "}
            {item.dateBirth.dateBirth} | Читательский билет:{" "}
            {item.libraryCard.libraryCard} | Номер паспорта:{" "}
            {item.numberPassport.numberPassport} | Номер телефона:{" "}
            {item.numberTelephone.numberTelephone}
          </li>
          <button onClick={() => handleDelete(item.id)}>Удалить</button>
        </div>
      ))}
      <Link to={"/"}>Главная</Link>
    </div>
  );
};
