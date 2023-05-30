import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlices";
import { itemReducer } from "./userSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
  },
});
