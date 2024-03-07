import { apiSlice } from "../../app/api/apiSlice"


export const signinApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetAllBarbersKiosk: builder.query({
            query: (email) => ({
                url: `/kiosk/getAllBarbersKiosk?salonId=1&email=${email}`,
                method: 'GET',
            })
        })
    })
})

export const { useLazyGetAllBarbersKioskQuery } = signinApiSlice