import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}

const imgNumSlice = createSlice({
    name: 'imgNum',
    initialState,
    reducers: {
        nextImgNum : (state, action) => {
            state.value  += 1
        },
    },
})

export const { nextImgNum } = imgNumSlice.actions
export default imgNumSlice.reducer