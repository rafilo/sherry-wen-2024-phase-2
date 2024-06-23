import { createSlice } from '@reduxjs/toolkit';
interface userInfo {
    userEmail: string
}
const initialState: userInfo = {
    userEmail: ''
}

export const loggedinUserInfoSlice = createSlice({
    name: 'loggedinUserInfo',
    initialState,
    reducers: {
        setCurrentUserEmail: (state, action) => {
            state.userEmail = action.payload
        }
    }
})
export default loggedinUserInfoSlice.reducer
export const { setCurrentUserEmail} = loggedinUserInfoSlice.actions