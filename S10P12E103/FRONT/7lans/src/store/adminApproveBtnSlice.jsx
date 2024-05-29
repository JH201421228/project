import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: false,
};
const adminApproveBtnSlice = createSlice({
  name: "adminapprovebtn",
  initialState,
  reducers: {
    adminApproveBtn: (state) => {
      state.value = !state.value;
    },
  },
});

export const { adminApproveBtn } = adminApproveBtnSlice.actions;
export default adminApproveBtnSlice.reducer;
