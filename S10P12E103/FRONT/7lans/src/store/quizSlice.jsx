import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'none'
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        addProblem: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {addProblem} = quizSlice.actions
export default quizSlice.reducer