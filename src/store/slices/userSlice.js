import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.clear()
        }
    }
})

// ส่งออก actions
export const { login, logout } = userSlice.actions

// ส่งออก reducer
export default userSlice.reducer