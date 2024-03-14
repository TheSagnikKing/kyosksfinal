import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { CheckIcon } from '../../icons'
import { useSelector } from 'react-redux'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation } from './dashboardApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import toast from 'react-hot-toast'


const weekdays = [
    {
        _id: 1,
        name: 'Monday'
    },
    {
        _id: 2,
        name: 'Tuesday'
    },
    {
        _id: 3,
        name: 'Wednesday'
    },
    {
        _id: 4,
        name: 'Thursday'
    },
    {
        _id: 5,
        name: 'Friday'
    },
    {
        _id: 6,
        name: 'Saturday'
    },
    {
        _id: 7,
        name: 'Sunday'
    },
]

const weekdatevalue = [
    {
        _id: 1,
        name: '11/03/2024'
    },
    {
        _id: 2,
        name: '11/03/2024'
    },
    {
        _id: 3,
        name: '11/03/2024'
    },
    {
        _id: 4,
        name: '11/03/2024'
    },
    {
        _id: 5,
        name: '11/03/2024'
    },
    {
        _id: 6,
        name: '11/03/2024'
    },
    {
        _id: 7,
        name: '11/03/2024'
    },
]

const timeinvalue = [
    {
        _id: 1,
        name: '08:40:25'
    },
    {
        _id: 2,
        name: '08:40:25'
    },
    {
        _id: 3,
        name: '?'
    },
    {
        _id: 4,
        name: '08:40:25'
    },
    {
        _id: 5,
        name: '?'
    },
    {
        _id: 6,
        name: '08:40:25'
    },
    {
        _id: 7,
        name: '08:40:25'
    },
]

const timeoutvalue = [
    {
        _id: 1,
        name: '19:40:25'
    },
    {
        _id: 2,
        name: '19:40:25'
    },
    {
        _id: 3,
        name: '19:40:25'
    },
    {
        _id: 4,
        name: '?'
    },
    {
        _id: 5,
        name: '?'
    },
    {
        _id: 6,
        name: '?'
    },
    {
        _id: 7,
        name: '?'
    },
]


const Dashboard = () => {

    const selectCurrentBarberdata = useSelector(selectCurrentBarberInfo)
    const selectCurrentBarberTokendata = useSelector(selectCurrentBarberToken)
    const adminInfo = useSelector(selectCurrentAdminInfo)

    console.log('barber', selectCurrentBarberdata)

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
            data: barberonlinedata,
            isSuccess: barberonlineisSuccess,
            isError: barberonlineisError,
            error: barberonlineerror,
            isLoading: barberonlineisLoading
        }
    ] = useChangeBarberOnlineStatusKioskMutation()

    const [
        getAttendenceByBarberIdKiosk,
        {
            data: getAttendenceByBarberIdKioskdata,
            isSuccess: getAttendenceByBarberIdKioskisSuccess,
            isError: getAttendenceByBarberIdKioskisError,
            error: getAttendenceByBarberIdKioskerror,
            isLoading: getAttendenceByBarberIdKioskisLoading
        }
    ] = useGetAttendenceByBarberIdKioskMutation()


    const [salonbtnCheck, setSalonbtnCheck] = useState(selectCurrentBarberdata?.isSalonOnline)
    const [barberbtnCheck, setBarberbtnCheck] = useState(selectCurrentBarberdata?.foundUser?.isOnline)

    console.log(salonbtnCheck, "sdvdv")

    const navigate = useNavigate()

    // useEffect(() => {
    //     if(selectCurrentBarberTokendata === null){
    //         navigate('/barbersignin')
    //     }
    // },[selectCurrentBarberTokendata])

    const salondata = {
        salonId: adminInfo?.salonId,
        isOnline: salonbtnCheck,
        barberToken: selectCurrentBarberTokendata
    }

    useEffect(() => {
        if (getAttendenceByBarberIdKioskisError) {
            toast.error(getAttendenceByBarberIdKioskerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    },[getAttendenceByBarberIdKioskisError])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setBarberbtnCheck(selectCurrentBarberdata?.isSalonOnline)
        }
    }, [isError])

    useEffect(() => {
        if (barberonlineisError) {
            toast.error(barberonlineerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setBarberbtnCheck(selectCurrentBarberdata?.foundUser?.isOnline)
        }
    }, [barberonlineisError])

    useEffect(() => {
        changeSalonOnlineStatusKiosk(salondata)
    }, [salonbtnCheck])

    const barberdata = {
        salonId: adminInfo?.salonId,
        barberId: selectCurrentBarberdata?.foundUser?.barberId,
        isOnline: barberbtnCheck,
        barberToken: selectCurrentBarberTokendata
    }

    useEffect(() => {
        console.log(barberdata)
        ChangeBarberOnlineStatusKiosk(barberdata)
    }, [barberbtnCheck])


    const salonOnlineHandler = () => {
        const confirm = window.confirm("Change Salon Status ?")

        if (confirm) {
            setSalonbtnCheck((prev) => !prev)
        }

    }

    const barberOnlineHandler = () => {
        const confirm = window.confirm("Change Barber Status ?")

        if (confirm) {
            setBarberbtnCheck((prev) => !prev)
        }

    }


    useEffect(() => {
        getAttendenceByBarberIdKiosk({
            salonId: selectCurrentBarberdata?.foundUser?.salonId,
            barberId: selectCurrentBarberdata?.foundUser?.barberId
        })
    }, [selectCurrentBarberdata])



    const attendanceexample = [
        {
            day: "Monday",
            date: "2024-03-11",
            signInTime: "16:55:04",
            _id: "65eeea10c731552642ea8880",
            signOutTime: "16:57:13"
        },
        {
            day: "Wednesday",
            date: "2024-03-13",
            signInTime: "18:17:46",
            _id: "65f1a07207a860bac4e1c14c",
            signOutTime: "18:18:05"
        }
    ]

    return (
        <main className='kiyosk__dashboard__main__container'>
            <div className='kiyosk__dashboard__main__box'>
                <Link to="/barbersignin" className='cross_dashboard_icon'>X</Link>

                <div className='kiyosk__dashboard__main__header'>
                    <div className='kiyosk__dashboard__main__header__left'>
                        <div>
                            <div><img src="./no-profile-img.webp" alt="profile" /></div>
                            <h2>Sagnik Nandy</h2>
                        </div>
                    </div>

                    <div className='kiyosk__dashboard__main__header__right'>
                        <div>
                            <p><b>Email ID :</b> {selectCurrentBarberdata?.foundUser?.email}</p>
                            <p><b>Contact No :</b> {selectCurrentBarberdata?.foundUser?.mobileNumber}</p>
                            <p><b>Barber Salon ID :</b> {selectCurrentBarberdata?.foundUser?.salonId}</p>
                            <p><b>Barber EWT :</b> {selectCurrentBarberdata?.foundUser?.barberEWT}</p>
                            {barberbtnCheck ? <p style={{color:"green",fontWeight:"500"}}>You are currently logged-in!</p> : <p>You are currently logged-out!</p>}
                        </div>
                    </div>
                </div>

                <div className='kiyosk__dashboard__main__body'>
                    <div>
                        <div>
                            <h2>Days</h2>
                            <h2>Week Date</h2>
                            <h2>Time-In</h2>
                            <h2>Time-Out</h2>
                        </div>
                    </div>

                    <div>
                        {
                            getAttendenceByBarberIdKioskisSuccess && getAttendenceByBarberIdKioskdata.response.attendance.map((b) => (
                                <div className='kiyosk__dashboard__main__body__item' key={b._id}>
                                    <h2>{b.day}</h2>
                                    <h2>{b.date}</h2>
                                    <h2>{b.signInTime}</h2>
                                    <h2>{b.signOutTime}</h2>
                                </div>
                            ))
                        }

                    </div>
                </div>

                <div className='kiyosk__dashboard__main__btngrp'>
                    <div>
                        <button
                            onClick={salonOnlineHandler}
                            style={{
                                background: salonbtnCheck ? "limegreen" : "red",
                                color: "#fff"
                            }}
                        >{salonbtnCheck ? "Open Salon" : "Close Salon"}</button>
                        <button
                            onClick={barberOnlineHandler}
                            style={{
                                background: barberbtnCheck ? "limegreen" : "red",
                                color: "#fff"
                            }}
                        >{barberbtnCheck ? "Clock-In" : "Clock-Out"}</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard