import { createSlice } from "@reduxjs/toolkit";
import { de } from "date-fns/locale";

const initialState = {
    value: ''
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        addWord: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {addWord} = wordsSlice.actions
export default wordsSlice.reducer