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
        })
    })
})

export const { useGetDefaultSalonByAdminKioskMutation, useAdminConnectKioskMutation } = publicApiSlice