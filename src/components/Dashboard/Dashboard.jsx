import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { CheckIcon } from '../../icons'
import { useSelector } from 'react-redux'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation } from './dashboardApiSlice'
import { useNavigate } from 'react-router-dom'
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

    console.log('dash', selectCurrentBarberdata)

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
        if(isError){
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
    },[isError])

    useEffect(() => {
        if(barberonlineisError){
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
    },[barberonlineisError])

    useEffect(() => {
        changeSalonOnlineStatusKiosk(salondata)
    }, [salonbtnCheck])

    const barberdata = {
        salonId: adminInfo?.salonId,
        barberId: selectCurrentBarberdata?.barberId,
        isOnline: barberbtnCheck,
        barberToken: selectCurrentBarberTokendata
    }

    useEffect(() => {
        console.log(barberdata)
        ChangeBarberOnlineStatusKiosk(barberdata)
    }, [barberbtnCheck])


    const salonOnlineHandler = () => {
        const confirm = window.confirm("Change Salon Status ?")

        if(confirm){
            setSalonbtnCheck((prev) => !prev)
        }
        
    }

    const barberOnlineHandler = () => {
        const confirm = window.confirm("Change Barber Status ?")

        if(confirm){
            setBarberbtnCheck((prev) => !prev)
        }
        
    }

    return (
        // <main className='kiyosk__dashboard__main__container'>
        //     <h1>Welcome To Kiyosk Dashboard</h1>

        //     <div className='kiyosk__dashboard__main__container_btnbox'>
        //         <div>
        //             <div><h1>Salon Online / Offline</h1> <div onClick={salonOnlineHandler} style={{ background: salonbtnCheck && "limegreen", color: salonbtnCheck && "#fff" }}>{salonbtnCheck && <CheckIcon />}</div></div>
        //         </div>

        //         <div>
        //             <div><h1>Barber Online / Offline</h1> <div onClick={barberOnlineHandler} style={{ background: barberbtnCheck && "limegreen", color: barberbtnCheck && "#fff" }}>{barberbtnCheck && <CheckIcon />}</div></div>
        //         </div>
        //     </div>

        //     <div className='kiyosk__dashboard__main__barber_detailbox'>
        //         <h1>Barber Detail</h1>
        //         <h2>Barber Email: <p>{selectCurrentBarberdata?.foundUser?.email}</p></h2>
        //         <h2>Barber Mobile Verified: <p>{selectCurrentBarberdata?.foundUser?.mobileVerified === false ? "false" : "true"}</p></h2>
        //         <h2>Barber SalonId: <p>{selectCurrentBarberdata?.foundUser?.salonId}</p></h2>
        //         <h2>Barber EWT: <p>{selectCurrentBarberdata?.foundUser?.barberEWT}</p></h2>
        //     </div>
        // </main>

        <main className='kiyosk__dashboard__main__container'>
            <div className='kiyosk__dashboard__main__box'>

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
                            {/* <p>You are currently logged-out!</p> */}
                        </div>
                    </div>
                </div>

                <div className='kiyosk__dashboard__main__body'>
                    <div>
                        <h2>#</h2>
                        <h2>Week Date</h2>
                        <h2>Time-In</h2>
                        <h2>Time-Out</h2>
                    </div>

                    <div>
                        <div className='kiyosk__dashboard__main__body_header'>
                            {
                                weekdays.map((w) => (
                                    <h2 key={w._id}>{w.name}</h2>
                                ))
                            }

                        </div>

                        <div className='kiyosk__dashboard__main__body_weekdate'>
                            {
                                weekdatevalue.map((w) => (
                                    <h2 key={w._id}>{w.name}</h2>
                                ))
                            }

                        </div>

                        <div className='kiyosk__dashboard__main__body_timein'>
                            {
                                timeinvalue.map((w) => (
                                    <h2 key={w._id}>{w.name}</h2>
                                ))
                            }

                        </div>

                        <div className='kiyosk__dashboard__main__body_timeout'>
                            {
                                timeoutvalue.map((w) => (
                                    <h2 key={w._id}>{w.name}</h2>
                                ))
                            }

                        </div>
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
                        >{barberbtnCheck ? "Check-In" : "Check-Out"}</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard