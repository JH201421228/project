import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: " ",
};
const adminSelectVolSlice = createSlice({
  name: "adminselectvol",
  initialState,
  reducers: {
    adminSelectVol: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { adminSelectVol } = adminSelectVolSlice.actions;
export default adminSelectVolSlice.reducer;
