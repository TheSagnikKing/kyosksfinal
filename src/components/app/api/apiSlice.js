import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    credentials: 'include',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://iqb-kiosk.onrender.com' }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://iqb-final.onrender.com' }),
    tagTypes: ['adminloggin'],
    endpoints: builder => ({})
})

export const { useLoginQuery } = apiSlice