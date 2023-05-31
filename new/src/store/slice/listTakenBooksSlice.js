import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddListBooksTaken: false,
  nameBook: "",
  nameReader: "",
  dateTaken: "",
  data: [],
};

const listTakenBooksSlice = createSlice({
  name: "listTakenBooks",
  initialState,
  reducers: {
    setOpenAddListBooksTaken: (state, action) => {
      state.openAddListBooksTaken = action.payload;
    },
    setNameBook: (state, action) => {
      state.nameBook = action.payload;
    },
    setNameReader: (state, action) => {
      state.nameReader = action.payload;
    },
    setDateTaken: (state, action) => {
      state.dateTaken = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  setOpenAddListBooksTaken,
  setNameBook,
  setDateTaken,
  setNameReader,
  setData,
} = listTakenBooksSlice.actions;

export const listTakenReducer = listTakenBooksSlice.reducer;
