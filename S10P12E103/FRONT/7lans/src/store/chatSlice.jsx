import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChat: (state, action) => {
            state.value.push(action.payload)
        },
    },
})

export const {addChat} = chatSlice.actions
export default chatSlice.reducer