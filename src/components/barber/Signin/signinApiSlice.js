import { apiSlice } from "../../app/api/apiSlice"


export const signinApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetAllBarbersKiosk: builder.query({
            query: (email) => ({
                url: `/kiosk/getAllBarbersKiosk?salonId=1&email=${email}`,
                method: 'GET',
            })
        }),
        BarberLoginKiosk: builder.mutation({
            query: (barberdata) => ({
                url: '/kiosk/barberLoginKiosk',
                method: 'POST',
                body: barberdata
            })
        })
    })
})

export const { useLazyGetAllBarbersKioskQuery, useBarberLoginKioskMutation } = signinApiSlice