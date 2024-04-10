import React, { useEffect, useState } from 'react'
import './Dashboard2.css'
import { CrossIcon } from '../../icons'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeBarberClockedInStatusKioskMutation, useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation } from './dashboardApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Dashboard2 = () => {

    const selectCurrentBarberdata = useSelector(selectCurrentBarberInfo)
    const selectCurrentBarberTokendata = useSelector(selectCurrentBarberToken)
    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [
        changeBarberClockedInStatusKiosk,
        {
            data: barberclockonlinedata,
            isSuccess: barberclockonlineisSuccess,
            isError: barberclockonlineisError,
            error: barberclockonlineerror,
            isLoading: barberclockonlineisLoading
        }
    ] = useChangeBarberClockedInStatusKioskMutation()

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


    const [barberbtnCheck, setBarberbtnCheck] = useState(selectCurrentBarberdata?.foundUser?.isOnline)


    const navigate = useNavigate()

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
    }, [getAttendenceByBarberIdKioskisError])


    const barberdata = {
        salonId: adminInfo?.salonId,
        barberId: selectCurrentBarberdata?.foundUser?.barberId,
        isClockedIn: barberbtnCheck,
        barberToken: selectCurrentBarberTokendata
    }

    useEffect(() => {
        if (barberclockonlineisError) {
            toast.error(barberclockonlineerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setBarberbtnCheck(barberclockonlinedata?.response?.isClockedIn)
        }
    }, [barberclockonlineisError])


    useEffect(() => {
        if (barberclockonlineisSuccess) {
            toast.success(barberclockonlinedata?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setBarberbtnCheck(barberclockonlinedata?.response?.isClockedIn)

            getAttendenceByBarberIdKiosk({
                salonId: selectCurrentBarberdata?.foundUser?.salonId,
                barberId: selectCurrentBarberdata?.foundUser?.barberId
            })
        }
    }, [barberclockonlineisSuccess, selectCurrentBarberdata])

    useEffect(() => {
        console.log(barberdata)
        changeBarberClockedInStatusKiosk(barberdata)
    }, [barberbtnCheck])


    const clockHandler = () => {
        const confirm = window.confirm("Change Clock Status ?")

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

    const logoutClicked = () => {
        navigate("/barbersignin")
    }


    const [barberOnlineCheck, setBarberOnlineCheck] = useState(selectCurrentBarberdata?.foundUser?.isOnline)

    const [
        changeBarberOnlineStatusKiosk,
        {
            data: barberonlinedata,
            isSuccess: barberonlineisSuccess,
            isError: barberonlineisError,
            error: barberonlineerror,
            isLoading: barberonlineisLoading
        }
    ] = useChangeBarberOnlineStatusKioskMutation()


    const barberOnlinedata = {
        salonId: adminInfo?.salonId,
        barberId: selectCurrentBarberdata?.foundUser?.barberId,
        isOnline: barberOnlineCheck,
        barberToken: selectCurrentBarberTokendata
    }

    useEffect(() => {
        if (barberonlineisSuccess) {
            toast.success(barberonlinedata?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [barberonlineisSuccess])

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
            setBarberOnlineCheck(selectCurrentBarberdata?.foundUser?.isOnline)
        }
    }, [barberonlineerror])

    useEffect(() => {
        changeBarberOnlineStatusKiosk(barberOnlinedata)
    }, [barberOnlineCheck])


    const barberOnlineHandler = () => {
        const confirm = window.confirm("Change Salon Status ?")

        if (confirm) {
            setBarberOnlineCheck((prev) => !prev)
        }

    }

    return (
        <main className='dash_main_container'>
            <div>
                <div className='dash_div_header'>
                    <div>
                        <p>{selectCurrentBarberdata?.foundUser?.name}</p>
                        <div />
                    </div>
                    <div onClick={logoutClicked}><CrossIcon /></div>
                </div>

                <div className='dash_div_profile'>
                    <div><img src="./no-profile-img.webp" alt="profile" /></div>

                    <div>
                        <p>Email Id: {selectCurrentBarberdata?.foundUser?.email}</p>
                        <p>Contact Number: {selectCurrentBarberdata?.foundUser?.mobileNumber}</p>
                        <p>Barber Salon Id: {selectCurrentBarberdata?.foundUser?.salonId}</p>
                        <p>Barber EWT: {selectCurrentBarberdata?.foundUser?.barberEWT}</p>
                        {barberOnlineCheck ? <p style={{ color: "#03A100" }}>You are currently Online</p> : <p style={{ color: "red" }}>You are currently Offline</p>}
                    </div>
                </div>

                <div className='kiyosk__dashboard__main__body'>
                    <div>
                        <div>
                            <div>
                                <h2>Days</h2>
                                <h2>Week Date</h2>
                                <h2>Time-In</h2>
                                <h2>Time-Out</h2>
                            </div>
                        </div>
                    </div>

                    <div>
                        {
                            getAttendenceByBarberIdKioskisSuccess && getAttendenceByBarberIdKioskdata.response.attendance.map((b) => (
                                <div className='kiyosk__dashboard__main__body__item' key={b._id}>
                                    <div>
                                        <h2>{b.day === "" ? "-" : b.day}</h2>
                                        <h2>{b.date === "" ? "-" : b.date}</h2>
                                        <h2>{b.signInTime === "" ? "-" : b.signInTime}</h2>
                                        <h2>{b.signOutTime === "" ? "-" : b.signOutTime}</h2>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                </div>

                <div className='dash_div_btn_box'>
                    <div className='dash_div_btn_group'>
                        <button
                            onClick={barberOnlineHandler}
                            style={{
                                background: barberOnlineCheck ? "red" : "limegreen",
                                color: "#fff"
                            }}
                        >{barberOnlineCheck ? "Barber Offline" : "Barber Online"}</button>
                        <button
                            onClick={clockHandler}
                            style={{
                                background: barberbtnCheck ? "red" : "limegreen",
                                color: "#fff"
                            }}
                        >{barberbtnCheck ? "Clock-Out" : "Clock-In"}</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard2

// const adminInfo = useSelector(selectCurrentAdminInfo)

// const [salonbtnCheck, setSalonbtnCheck] = useState(selectCurrentBarberdata?.isSalonOnline)


// const salondata = {
//     salonId: adminInfo?.salonId,
//     isOnline: salonbtnCheck,
//     barberToken: selectCurrentBarberTokendata
// }

// const [
//     changeSalonOnlineStatusKiosk,
//     {
//         data,
//         isSuccess,
//         isError,
//         error,
//         isLoading
//     }
// ] = useChangeSalonOnlineStatusKioskMutation()


// useEffect(() => {
//     if (isError) {
//         toast.error(error?.data?.message, {
//             duration: 3000,
//             style: {
//                 fontSize: "1.4rem",
//                 borderRadius: '10px',
//                 background: '#333',
//                 color: '#fff',
//             },
//         });
//         setBarberbtnCheck(selectCurrentBarberdata?.isSalonOnline)
//     }
// }, [isError])

// useEffect(() => {
//     changeSalonOnlineStatusKiosk(salondata)
// }, [salonbtnCheck])


// const salonOnlineHandler = () => {
//     const confirm = window.confirm("Change Salon Status ?")

//     if (confirm) {
//         setSalonbtnCheck((prev) => !prev)
//     }

// }

// <button
//                             onClick={salonOnlineHandler}
//                             style={{
//                                 background: salonbtnCheck ? "red" : "limegreen",
//                                 color: "#fff"
//                             }}
//                         >{salonbtnCheck ? "Salon Offline" : "Salon Online"}</button>