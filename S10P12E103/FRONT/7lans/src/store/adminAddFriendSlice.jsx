import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: false,
};
const adminAddFriendSlice = createSlice({
  name: "adminaddfriend",
  initialState,
  reducers: {
    adminAddFriend: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { adminAddFriend } = adminAddFriendSlice.actions;
export default adminAddFriendSlice.reducer;
