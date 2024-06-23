
import { configureStore } from '@reduxjs/toolkit';
import editableReducer from "./reducer/editableReducer";
import loggedinUserInfoReducer from './reducer/loggedinUserInfoReducer';

export const store = configureStore({
    reducer: {
      counter: editableReducer,
      loggedinUser: loggedinUserInfoReducer
    },
  })
  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
