import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteSlice";
const store = configureStore({
  reducer:{
    anecdotes:anecdoteReducer
  }
})
export default store; 