import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import newsReducer from "../features/newsSlice";

const rootReducer = combineReducers({
  news: newsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
