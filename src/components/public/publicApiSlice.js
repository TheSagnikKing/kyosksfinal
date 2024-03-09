import { apiSlice } from "../app/api/apiSlice"

export const publicApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetDefaultSalonByAdminKiosk: builder.mutation({
            query: (adminEmail) => ({
                url: `/kiosk/getDefaultSalonByAdminKiosk`,
                method: 'POST',
                body:{adminEmail:adminEmail}
            })
        }),
        AdminConnectKiosk: builder.mutation({
            query: (admidata) => ({
                url: '/kiosk/adminConnectKiosk',
                method:'POST',
                body: admidata
            }),
            invalidatesTags: ['adminloggin']
        }),
        GetAllSalonsByAdmin: builder.mutation({
            query: (adminEmail) => ({
                url: '/kiosk/getAllSalonsByAdmin',
                method: 'POST',
                body: {adminEmail}
            })
        })
    })
})

export const { useGetDefaultSalonByAdminKioskMutation, useAdminConnectKioskMutation,useGetAllSalonsByAdminMutation } = publicApiSlice