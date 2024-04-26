import { apiSlice } from "../app/api/apiSlice"

export const publicApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetDefaultSalonByAdminKiosk: builder.mutation({
            query: (salondata) => ({
                url: `/kiosk/getDefaultSalonByAdminKiosk`,
                method: 'POST',
                body:salondata
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
        }),
        GerAllAdvertisementsKiosk: builder.mutation({
            query: (salonId) => ({
                url: '/kiosk/getAllAdvertisementsKiosk',
                method:"POST",
                body:{salonId}
            })
        })
    })
})

export const { useGetDefaultSalonByAdminKioskMutation, useAdminConnectKioskMutation,useGetAllSalonsByAdminMutation,useGerAllAdvertisementsKioskMutation } = publicApiSlice