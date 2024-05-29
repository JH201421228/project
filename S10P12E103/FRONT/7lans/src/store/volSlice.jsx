import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: '',
}

const volSlice = createSlice({
    name: 'vol',
    initialState,
    reducers: {
        updateVolInfo: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {updateVolInfo} = volSlice.actions
export default volSlice.reducer