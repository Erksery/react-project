import {
  collection,
  getDocs,
  query,
  limitToLast,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getBooks() {
  const books = [];
  const qa = query(collection(db, "books"));
  const querySnapshot = await getDocs(qa);

  querySnapshot.forEach((doc) => {
    books.push({ id: doc.id, ...doc.data() });
  });

  return books;
}

export async function getTakenBooks() {
  const takenBooks = [];
  const querySnapshot = await getDocs(collection(db, "listBooksTaken"));
  querySnapshot.forEach((doc) => {
    takenBooks.push({ id: doc.id, ...doc.data() });
  });

  return takenBooks;
}

export async function getPeople() {
  const listPeople = [];
  const q = query(collection(db, "people"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    listPeople.push({ id: doc.id, ...doc.data() });
  });

  return listPeople;
}
