import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const viewLetterSlice = createSlice({
  name: "viewletter",
  initialState,
  reducers: {
    viewLetter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { viewLetter } = viewLetterSlice.actions;
export default viewLetterSlice.reducer;
