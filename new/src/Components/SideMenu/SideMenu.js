import React from "react";
import "./CSS-SideMenu.css";
import { Icon56DataStackLockOutline } from "@vkontakte/icons";
import { Icon36HomeOutline } from "@vkontakte/icons";
import { Icon28BookSpreadOutline } from "@vkontakte/icons";
import { Icon28UsersOutline } from "@vkontakte/icons";
import { Icon56NotePenOutline } from "@vkontakte/icons";
import { Link } from "react-router-dom";
export function SideMenu() {
  const LinksButton = [
    { link: "/books", icon: <Icon28BookSpreadOutline />, text: "Список книг" },
    { link: "/people", icon: <Icon28UsersOutline />, text: "Посетители" },
    {
      link: "/booksTaken",
      icon: <Icon56NotePenOutline width={28} />,
      text: "Список взятых книг",
    },
  ];

  return (
    <div className="SideMenu">
      <div className="Name-container">
        <span>
          <Icon56DataStackLockOutline width={36} />
        </span>
        MyData
      </div>
      <div className="Home-button-container">
        <Link to={"/"}>
          <span>
            <Icon36HomeOutline width={28} />
          </span>
          Главная
        </Link>
      </div>
      <div className="Links-container">
        {LinksButton.map((item, index) => (
          <Link to={item.link} key={index}>
            <span>{item.icon}</span>
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
