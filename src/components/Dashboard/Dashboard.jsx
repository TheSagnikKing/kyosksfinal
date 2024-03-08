import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { CheckIcon } from '../../icons'
import { useSelector } from 'react-redux'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation } from './dashboardApiSlice'

const Dashboard = () => {

    const selectCurrentBarberdata = useSelector(selectCurrentBarberInfo)
    const selectCurrentBarberTokendata = useSelector(selectCurrentBarberToken)

    const [
        changeSalonOnlineStatusKiosk,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        }
    ] = useChangeSalonOnlineStatusKioskMutation()

    const [
        ChangeBarberOnlineStatusKiosk,
        {
            data:barberonlinedata,
            isSuccess:barberonlineisSuccess,
            isError:barberonlineisError,
            error:barberonlineerror,
            isLoading:barberonlineisLoading
        }
    ] = useChangeBarberOnlineStatusKioskMutation()

    const [salonbtnCheck, setSalonbtnCheck] = useState(false)
    const [barberbtnCheck, setBarberbtnCheck] = useState(false)

    const salondata = {
        salonId: 1,
        isOnline: salonbtnCheck,
        barberToken: selectCurrentBarberTokendata
    }

    useEffect(() => {
        changeSalonOnlineStatusKiosk(salondata)
    }, [salonbtnCheck])

    const barberdata = {
        salonId: 1,
        barberId: selectCurrentBarberdata?.barberId,
        isOnline: barberbtnCheck,
        barberToken: selectCurrentBarberTokendata
    }

    useEffect(() => {
        console.log(barberdata)
        ChangeBarberOnlineStatusKiosk(barberdata)
    }, [barberbtnCheck])


    const salonOnlineHandler = () => {
        setSalonbtnCheck((prev) => !prev)
    }

    const barberOnlineHandler = () => {
        setBarberbtnCheck((prev) => !prev)
    }

    return (
        <main className='kiyosk__dashboard__main__container'>
            <h1>Welcome To Kiyosk Dashboard</h1>

            <div className='kiyosk__dashboard__main__container_btnbox'>
                <div>
                    <div><h1>Salon Online / Offline</h1> <div onClick={salonOnlineHandler} style={{ background: salonbtnCheck && "limegreen", color: salonbtnCheck && "#fff" }}>{salonbtnCheck && <CheckIcon />}</div></div>
                </div>

                <div>
                    <div><h1>Barber Online / Offline</h1> <div onClick={barberOnlineHandler} style={{ background: barberbtnCheck && "limegreen", color: barberbtnCheck && "#fff" }}>{barberbtnCheck && <CheckIcon />}</div></div>
                </div>
            </div>

            <div className='kiyosk__dashboard__main__barber_detailbox'>
                <h1>Barber Detail</h1>
                <h2>Barber Email: <p>{selectCurrentBarberdata?.email}</p></h2>
                <h2>Barber Mobile Verified: <p>{selectCurrentBarberdata?.mobileVerified === false ? "false" : "true"}</p></h2>
                <h2>Barber SalonId: <p>{selectCurrentBarberdata?.salonId}</p></h2>
                <h2>Barber EWT: <p>{selectCurrentBarberdata?.barberEWT}</p></h2>
            </div>
        </main>
    )
}

export default Dashboard