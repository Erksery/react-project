import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlices";
import { itemReducer } from "./itemSlice";
import { listTakenReducer } from "./listTakenBooksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    listTakenBooks: listTakenReducer,
  },
});
