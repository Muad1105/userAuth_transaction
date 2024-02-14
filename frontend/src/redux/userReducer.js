import { createSlice } from "@reduxjs/toolkit";

const persistedUserId =
  localStorage.getItem("userId") === null ? "" : localStorage.getItem("userId");
const persistedUserName =
  localStorage.getItem("userName") === null
    ? ""
    : localStorage.getItem("userName");
const persistedUserEmail =
  localStorage.getItem("userEmail") === null
    ? ""
    : localStorage.getItem("userEmail");

const initialState = {
  userId: persistedUserId,
  userName: persistedUserName,
  userEmail: persistedUserEmail,
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", state.userName);
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
      localStorage.setItem("userEmail", state.userEmail);
    },
  },
});

export const { setUserId, setUserName, setUserEmail } = userSlice.actions;
export default userSlice.reducer;
