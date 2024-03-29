import { apiSlice } from "../app/api/apiSlice"

export const queueApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetQlistBySalonIdKiosk: builder.query({
            query: (salonId) => ({
                url: `/kiosk/getQlistBySalonIdKiosk?salonId=${salonId}`,
                method: 'GET'
            })
        })
    })
})

export const { useGetQlistBySalonIdKioskQuery } = queueApiSlice