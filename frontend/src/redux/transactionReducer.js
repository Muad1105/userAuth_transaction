import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionDone: false,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransationsDone: (state, action) => {
      state.transactionDone = action.payload;
    },
  },
});

export const { setTransationsDone } = transactionSlice.actions;
export default transactionSlice.reducer;
