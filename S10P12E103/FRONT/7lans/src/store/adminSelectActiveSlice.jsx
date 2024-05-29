import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activityId: null,
  relationId: null
};
const adminSelectActiveSlice = createSlice({
  name: "adminselectactive",
  initialState,
  reducers: {
    adminSelectAcitve: (state, action) => {
      state.activityId = action.payload.activityId
      state.relationId = action.payload.relationId;
    },
  },
});

export const { adminSelectAcitve } = adminSelectActiveSlice.actions;
export default adminSelectActiveSlice.reducer;