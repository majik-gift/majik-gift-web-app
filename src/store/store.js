"use client";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import filterReducer from './filterSlice';


export const store = configureStore({
  reducer: { appReducer: reducer, filters: filterReducer },
});

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
