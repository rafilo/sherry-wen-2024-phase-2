
import { configureStore } from '@reduxjs/toolkit';
import editableReducer from "./reducer/editableReducer";

export const store = configureStore({
    reducer: {
      counter: editableReducer,
    },
  })
  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
