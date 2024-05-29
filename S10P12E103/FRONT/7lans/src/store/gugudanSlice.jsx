import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'none'
}

const gugudanSlice = createSlice({
    name: 'gugudan',
    initialState,
    reducers: {
        changeDan: (state, action) => {
            state.value = action.payload
        }
    },
})

export const {changeDan} = gugudanSlice.actions
export default gugudanSlice.reducer