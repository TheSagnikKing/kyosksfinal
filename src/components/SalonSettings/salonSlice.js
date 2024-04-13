import { apiSlice } from "../app/api/apiSlice"

export const salonApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        SalonAccountLogin: builder.mutation({
            query: (admindata) => ({
                url: `/kiosk/salonAccountLogin`,
                method: 'POST',
                body: admindata
            })
        }),
    })
})

export const {useSalonAccountLoginMutation} = salonApiSlice