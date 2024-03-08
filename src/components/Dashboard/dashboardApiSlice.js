import {apiSlice} from '../app/api/apiSlice'

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        ChangeSalonOnlineStatusKiosk: builder.mutation({
            query: (salondata) => ({
                url: `/kiosk/changeSalonOnlineStatusKiosk`,
                method: 'POST',
                body:salondata
            })
        }),
        ChangeBarberOnlineStatusKiosk: builder.mutation({
            query: (barberdata) => ({
                url: '/kiosk/changeBarberOnlineStatusKiosk',
                method: 'POST',
                body: barberdata
            })
        })
    })
})

export const { useChangeSalonOnlineStatusKioskMutation, useChangeBarberOnlineStatusKioskMutation } = dashboardApiSlice