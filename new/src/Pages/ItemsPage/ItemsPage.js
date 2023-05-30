import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ItemsPage() {
  const { itemData } = useSelector((state) => state.item);
  const { id } = useParams();
  return (
    <div>
      <h2>{itemData.nameBook.nameBook}</h2>
      <h3>{id}</h3>
      <Link to="/booksTaken">Назад</Link>
    </div>
  );
}

export default ItemsPage;
