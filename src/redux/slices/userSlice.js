import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      const { name, email } = action.payload;
      state.user = { name, email };
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
