import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../Hooks/use-auth";
import { removeUser } from "../../store/slice/userSlices";
import { New } from "../../Components/New";
import { Icon28BookOutline } from "@vkontakte/icons";
import { Icon56BookmarkOutline } from "@vkontakte/icons";
import { Icon56Users3Outline } from "@vkontakte/icons";
import { Icon56NotebookCheckOutline } from "@vkontakte/icons";

import "./CSS-Home.css";
import { Header } from "../../Components/Header/Header";
import { SideMenu } from "../../Components/SideMenu/SideMenu";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();

  const widgetList = [
    {
      link: "/books",
      text: "Количество кfghghfdниг в библиотеке",
      quantity: 10,
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
      link: "/books",
      text: "Количество пользователей",
      quantity: 10,
      icon: <Icon56Users3Outline />,
    },
    {
      link: "/books",
      text: "Количество взятых книг",
      quantity: 10,
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
                <Link to={"/"}>Подробности</Link>
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
