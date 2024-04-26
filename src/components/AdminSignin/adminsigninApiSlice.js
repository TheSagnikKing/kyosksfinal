import { apiSlice } from "../app/api/apiSlice"

export const adminsigninApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        LoginKiosk: builder.mutation({
            query: (data) => ({
                url: `/kiosk/loginKiosk`,
                method: 'POST',
                body: data
            })
        }),
        GoogleAdminLoginKiosk: builder.mutation({
            query: (admindata) => ({
                url:`/kiosk/googleAdminLoginKiosk?token=${admindata}`,
                method: 'POST',
                body: {}
            })
        })

    })
})

export const { useLoginKioskMutation,useGoogleAdminLoginKioskMutation } = adminsigninApiSlice