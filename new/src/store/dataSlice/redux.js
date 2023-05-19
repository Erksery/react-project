import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataPeople: [],
  dataBooks: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataPeople: (state, action) => {
      state.dataPeople = action.payload;
    },
    setDataBooks: (state, action) => {
      state.dataBooks = action.payload;
    },
  },
});

export const { setDataPeople, setDataBooks } = dataSlice.actions;
export default dataSlice.reducer;
