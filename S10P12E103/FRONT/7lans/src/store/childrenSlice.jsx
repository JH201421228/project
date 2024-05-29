import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

const childrenSlice = createSlice({
    name: 'children',
    initialState,
    reducers: {
        updateChildrenInfo: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {updateChildrenInfo} = childrenSlice.actions
export default childrenSlice.reducer