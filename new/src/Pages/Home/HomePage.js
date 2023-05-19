import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Icon56BookmarkOutline,
  Icon56Users3Outline,
  Icon56NotebookCheckOutline,
} from "@vkontakte/icons";
import "./CSS-Home.css";
import { Header } from "../../Components/Header/Header";
import { SideMenu } from "../../Components/SideMenu/SideMenu";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [dataPeople, setDataPeople] = useState([]);
  const [dataBooks, setDataBooks] = useState([]);

  const widgetList = [
    {
      link: "/books",
      text: "Количество книг в библиотеке",
      quantity: dataBooks.length,
      icon: (
        <Icon56BookmarkOutline
          style={{
            color: "DarkViolet",
            backgroundColor: "rgba(238, 130, 238, 0.69)",
          }}
        />
      ),
    },
    {
      link: "/people",
      text: "Количество пользователей",
      quantity: dataPeople.length,
      icon: <Icon56Users3Outline />,
    },
    {
      link: "/booksTaken",
      text: "Количество взятых книг",
      quantity: data.length,
      icon: (
        <Icon56NotebookCheckOutline
          style={{
            color: "DarkGreen",
            backgroundColor: "rgba(0, 128, 0, 0.69)",
          }}
        />
      ),
    },
  ];

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
    <div className="Home-container">
      <SideMenu />
      <div className="Home">
        <Header />
        <div className="NamePage-container">
          <h1>Главная страница</h1>
        </div>
        <div className="Widgets-container">
          {widgetList.map((item, index) => (
            <div key={index} className="Widget">
              <div className="info">
                <h2>{item.text}</h2>
                <h1>{item.quantity}</h1>
                <Link to={item.link}>Подробности</Link>
              </div>
              <div className="icon">{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
