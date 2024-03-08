import { apiSlice } from "../app/api/apiSlice"

export const adminsigninApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        AdminLoginKiosk: builder.mutation({
            query: (admindata) => ({
                url: `/kiosk/adminLoginKiosk`,
                method: 'POST',
                body: admindata
            })
        })
    })
})

export const { useAdminLoginKioskMutation } = adminsigninApiSlice