import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: false,
};
const adminDeleteFriendSlice = createSlice({
  name: "admindeletefriend",
  initialState,
  reducers: {
    adminDeleteFriend: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { adminDeleteFriend } = adminDeleteFriendSlice.actions;
export default adminDeleteFriendSlice.reducer;
