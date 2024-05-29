import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

const volsSlice = createSlice({
    name: 'vols',
    initialState,
    reducers: {
        updateVolsInfo: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {updateVolsInfo} = volsSlice.actions
export default volsSlice.reducer