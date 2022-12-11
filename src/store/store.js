import { configureStore } from "@reduxjs/toolkit";
import giftsSlice from "../features/gifts/giftsSlice";
import keywordSlice from "../features/keyword/keywordSlice";

export default configureStore({
  reducer: {
    gifts: giftsSlice,
    keyword: keywordSlice,
  },
});
