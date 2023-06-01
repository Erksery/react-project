import React, { useState } from "react";
import {
  Icon28WarningTriangleOutline,
  Icon48CancelOutline,
} from "@vkontakte/icons";
import { Transition } from "react-transition-group";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { setData } from "../../../store/slice/listTakenBooksSlice";
import { useDispatch, useSelector } from "react-redux";

function ModalDelete({ openDeleteBook, setOpenDeleteBook }) {
  const dispatch = useDispatch();
  const { itemData } = useSelector((state) => state.item);
  const data = useSelector((state) => state.listTakenBooks.data);

  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "listBooksTaken", id));
    const newData = data.filter((d) => d.id !== id);
    dispatch(setData(newData));
    setDeleteItemId(null);
  };
  return (
    <Transition in={openDeleteBook} timeout={500}>
      {(open) => (
        <div className={`ModalDelete ${open}`}>
          <h3>
            Удалить
            <button onClick={() => setOpenDeleteBook(false)}>
              <Icon48CancelOutline />
            </button>
          </h3>
          <div className="Warning-container">
            <Icon28WarningTriangleOutline width={56} />
            Это приведет к необратимому удалению всех данных, включая все
            вложенные данные
          </div>
          <div className="Warning-button-container">
            <button
              className="CancelButton"
              onClick={() => setOpenDeleteBook(false)}
            >
              Отмена
            </button>
            <button
              className="ConfirmButton"
              onClick={() => {
                handleDelete(itemData.id);
                setOpenDeleteBook(false);
              }}
            >
              Подтвердить
            </button>
          </div>
        </div>
      )}
    </Transition>
  );
}

export default ModalDelete;
