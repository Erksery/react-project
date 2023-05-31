import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: { itemData: "" },
  reducers: {
    setItemData: (state, action) => {
      state.itemData = action.payload;
    },
  },
});

export const { setItemData } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
