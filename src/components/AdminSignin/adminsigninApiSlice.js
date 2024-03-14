import { apiSlice } from "../app/api/apiSlice"

export const adminsigninApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        AdminLoginKiosk: builder.mutation({
            query: (admindata) => ({
                url: `/kiosk/adminLoginKiosk`,
                method: 'POST',
                body: admindata
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

export const { useAdminLoginKioskMutation,useGoogleAdminLoginKioskMutation } = adminsigninApiSlice