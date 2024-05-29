import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: './no_profile.jpg',
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        updateUserProfile: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {updateUserProfile} = userProfileSlice.actions
export default userProfileSlice.reducer