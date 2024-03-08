import { createSlice } from '@reduxjs/toolkit'

const barberauthSlice = createSlice({
    name: 'barberauth',
    initialState: { barbertoken: null , barberInfo:{} },
    reducers: {
        setCredentials: (state, action) => {
            state.barbertoken = action.payload.barberToken
            state.barberInfo = action.payload.foundUser
        }
    }
})

export const { setCredentials } = barberauthSlice.actions

export default barberauthSlice.reducer

export const selectCurrentBarberToken = (state) => state.barberauth.barbertoken
export const selectCurrentBarberInfo = (state) => state.barberauth.barberInfo