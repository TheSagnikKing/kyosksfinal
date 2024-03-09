import { apiSlice } from "../../app/api/apiSlice"

export const adminprotectedAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        AdminloggedinKiosk: builder.query({
            query: () => ({
                url: `/kiosk/adminloggedinKiosk`,
                method: 'GET',
            })
        })
    })
})

export const { useLazyAdminloggedinKioskQuery } = adminprotectedAuthSlice