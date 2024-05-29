import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 1
}

const dinoSlice = createSlice({
    name: 'dino',
    initialState,
    reducers: {
        changeDino: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {changeDino} = dinoSlice.actions
export default dinoSlice.reducer