import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://iqb-kiosk.onrender.com' }),
    tagTypes: [],
    endpoints: builder => ({})
})

export const {useLoginQuery} = apiSlice