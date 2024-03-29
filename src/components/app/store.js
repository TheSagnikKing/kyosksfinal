import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import barberReducer from '../barber/Signin/barberauthSlice'
import adminReducer from '../AdminSignin/adminauthSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        barberauth: barberReducer,
        adminauth:adminReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
    ),
    devTools: true
})

setupListeners(store.dispatch)