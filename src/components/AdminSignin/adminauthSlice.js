import { createSlice } from '@reduxjs/toolkit'

const adminauthSlice = createSlice({
    name: 'adminauth',
    initialState: { admintoken: null , adminInfo:{} },
    reducers: {
        setAdminCredentials: (state, action) => {
            state.admintoken = action.payload.adminToken
            state.adminInfo = action.payload.user
        },
        setAdminToken: (state,action) => {
            state.admintoken = null
            state.adminInfo = {}
        }
    }
})

export const { setAdminCredentials, setAdminToken } = adminauthSlice.actions

export default adminauthSlice.reducer

export const selectCurrentAdminToken = (state) => state.adminauth.admintoken
export const selectCurrentAdminInfo = (state) => state.adminauth.adminInfo