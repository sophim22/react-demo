import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null
  },
  reducers: {
    userRegester: (state, action) => {
      state.user.push(action.payload);
    },

    login: (state, action) => {
      state.user = (action.payload);
    }
  }
})

export const { userRegester, login, updateUser } = userSlice.actions;
export default userSlice.reducer;