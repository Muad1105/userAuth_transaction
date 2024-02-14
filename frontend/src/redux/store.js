import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userReducer";
import transactionsReducer from "./transactionReducer";

export const store = configureStore({
  reducer: { userData: userDataReducer, transactionsData: transactionsReducer },
});
