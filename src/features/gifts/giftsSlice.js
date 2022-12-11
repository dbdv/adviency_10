import { createSlice } from "@reduxjs/toolkit";

export const giftsSlice = createSlice({
  name: "gifts",
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      return [...state, action.payload];
    },
    remove: (state, action) => {
      return state.filter((gf) => gf.id !== action.payload);
    },
    update: (state, action) => {
      const prev = state.filter((gf) => gf.id !== action.payload.id);
      return [...prev, action.payload];
    },
    init: (state, action) => {
      return action.payload;
    },
  },
});

export const { add, remove, init, update } = giftsSlice.actions;

export default giftsSlice.reducer;
