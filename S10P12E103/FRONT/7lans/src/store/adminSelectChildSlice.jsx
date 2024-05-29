import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: " ",
};
const adminSelectChildSlice = createSlice({
  name: "adminselectchild",
  initialState,
  reducers: {
    adminSelectChild: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { adminSelectChild } = adminSelectChildSlice.actions;
export default adminSelectChildSlice.reducer;
