import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: '',
}

const childSlice = createSlice({
    name: 'child',
    initialState,
    reducers: {
        updateChildInfo: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {updateChildInfo} = childSlice.actions
export default childSlice.reducer