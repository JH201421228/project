import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //value: 'http://localhost:8080'
  value: "https://i10e103.p.ssafy.io/api/v1",
  // value: "http://mydevlogme.iptime.org:8080",
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    changeUrl: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeUrl } = urlSlice.actions;
export default urlSlice.reducer;
