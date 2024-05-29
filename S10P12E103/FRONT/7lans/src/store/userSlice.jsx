import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {updateUserInfo} = userSlice.actions
export default userSlice.reducer