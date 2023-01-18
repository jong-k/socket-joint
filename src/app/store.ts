import { configureStore } from "@reduxjs/toolkit";
import { commentsReducer } from "../features/Comments/commentsSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});
