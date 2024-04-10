import React, { useEffect, useState } from 'react'
import './Dashboard2.css'
import { CrossIcon } from '../../icons'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeBarberClockedInStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation } from './dashboardApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Dashboard2 = () => {

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


    const [salonbtnCheck, setSalonbtnCheck] = useState(selectCurrentBarberdata?.isSalonOnline)
    const [barberbtnCheck, setBarberbtnCheck] = useState(selectCurrentBarberdata?.foundUser?.isOnline)

    console.log(salonbtnCheck, "sdvdv")

    const navigate = useNavigate()

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
    }, [getAttendenceByBarberIdKioskisError])

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
        changeSalonOnlineStatusKiosk(salondata)
    }, [salonbtnCheck])

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


    const salonOnlineHandler = () => {
        const confirm = window.confirm("Change Salon Status ?")

        if (confirm) {
            setSalonbtnCheck((prev) => !prev)
        }

    }

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
                        {barberbtnCheck ? <p style={{ color: "#03A100" }}>You are currently logged-in!</p> : <p style={{ color: "red" }}>You are currently logged-out!</p>}
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
                            onClick={salonOnlineHandler}
                            style={{
                                background: salonbtnCheck ? "red" : "limegreen",
                                color: "#fff"
                            }}
                        >{salonbtnCheck ? "Salon Offline" : "Salon Online"}</button>
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



