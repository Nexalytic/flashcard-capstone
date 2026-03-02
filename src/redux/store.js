import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "./flashcardSlice";

const store = configureStore({
  reducer: flashcardReducer
});

export default store;