import { createSlice } from "@reduxjs/toolkit";

export const keywordSlice = createSlice({
  name: "keyword",
  initialState: {
    value: "",
  },
  reducers: {
    setKeyword: (state, action) => {
      return action.payload;
    },
    restartKeyword: (state, action) => {
      return "";
    },
  },
});

export const { setKeyword, restartKeyword } = keywordSlice.actions;

export default keywordSlice.reducer;
