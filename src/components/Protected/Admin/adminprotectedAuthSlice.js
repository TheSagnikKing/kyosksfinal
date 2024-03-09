import { apiSlice } from "../../app/api/apiSlice"

export const adminprotectedAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        AdminloggedinKiosk: builder.mutation({
            query: (adminToken) => ({
                url: `/kiosk/adminloggedinKiosk`,
                method: 'POST',
                body:{adminToken:adminToken}
            }),
            providesTags: ['adminloggin'] //GET API KORTE HBE POST HBENA
        })
    })
})

export const { useAdminloggedinKioskMutation } = adminprotectedAuthSlice