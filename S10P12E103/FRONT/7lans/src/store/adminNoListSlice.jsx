import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredListLen: 0,
  filteredApproveListLen: 0
};

const adminNoListSlice = createSlice({
  name: "adminNoList",
  initialState,
  reducers: {
    adminNoList: (state, action) => {
      state.filteredListLen = action.payload.filteredListLen;
      state.filteredApproveListLen = action.payload.filteredApproveListLen;
    },
  },
});

export const { adminNoList } = adminNoListSlice.actions;
export default adminNoListSlice.reducer;
