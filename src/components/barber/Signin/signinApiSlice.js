import { apiSlice } from "../../app/api/apiSlice"


export const signinApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetAllBarbersKiosk: builder.query({
            query: (salonId,name) => ({
                url: '/kiosk/getAllBarbersKiosk?salonId=1&name=',
                method: 'GET',
            })
        })
    })
})

export const { useLazyGetAllBarbersKioskQuery } = signinApiSlice