import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true
}

const isPlayGameNowSlice = createSlice({
    name: 'isPlayGameNow',
    initialState,
    reducers: {
        gameChange: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {gameChange} = isPlayGameNowSlice.actions
export default isPlayGameNowSlice.reducer