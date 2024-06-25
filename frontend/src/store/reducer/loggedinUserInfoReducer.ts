import { createSlice } from '@reduxjs/toolkit';
interface userInfo {
    userEmail: string,
    userWebsite: string
}
const initialState: userInfo = {
    userEmail: '',
    userWebsite: ''
}

export const loggedinUserInfoSlice = createSlice({
    name: 'loggedinUserInfo',
    initialState,
    reducers: {
        setCurrentUserInfo: (state, action) => {
            state = action.payload
        }
    }
})
export default loggedinUserInfoSlice.reducer
export const { setCurrentUserInfo} = loggedinUserInfoSlice.actions