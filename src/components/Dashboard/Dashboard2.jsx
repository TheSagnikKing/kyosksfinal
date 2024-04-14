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


    const [barberbtnCheck, setBarberbtnCheck] = useState(selectCurrentBarberdata?.foundUser?.isClockedIn)


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
            setBarberbtnCheck(selectCurrentBarberdata?.foundUser?.isClockedIn)
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

            setBarberbtnCheck((prev) => !prev)

            if (barberclockonlinedata?.response?.isClockedIn === false) {
                setBarberOnlineCheck(barberclockonlinedata?.response?.isClockedIn)
            }

            getAttendenceByBarberIdKiosk({
                salonId: selectCurrentBarberdata?.foundUser?.salonId,
                barberId: selectCurrentBarberdata?.foundUser?.barberId
            })
        }
    }, [barberclockonlineisSuccess, selectCurrentBarberdata])


    useEffect(() => {
        getAttendenceByBarberIdKiosk({
            salonId: selectCurrentBarberdata?.foundUser?.salonId,
            barberId: selectCurrentBarberdata?.foundUser?.barberId
        })
    }, [selectCurrentBarberdata])


    const clockHandler = () => {
        const confirm = window.confirm("Change Clock Status ?")

        const barberdata = {
            salonId: adminInfo?.salonId,
            barberId: selectCurrentBarberdata?.foundUser?.barberId,
            isClockedIn: !barberbtnCheck,
            barberToken: selectCurrentBarberTokendata
        }

        if (confirm) {
            changeBarberClockedInStatusKiosk(barberdata)
        }
    }


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

            setBarberOnlineCheck(barberonlinedata?.response?.isOnline)
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


    const barberOnlineHandler = () => {
        const confirm = window.confirm("Change Salon Status ?")


        const barberOnlinedata = {
            salonId: adminInfo?.salonId,
            barberId: selectCurrentBarberdata?.foundUser?.barberId,
            isOnline: !barberOnlineCheck,
            barberToken: selectCurrentBarberTokendata
        }


        if (confirm) {
            changeBarberOnlineStatusKiosk(barberOnlinedata)
        }

    }

    return (
        <main className='dash_main_container'>
            <div>
                <div className='dash_div_header'>
                    <div>
                        {/* <p>{selectCurrentBarberdata?.foundUser?.name}</p> */}
                        <div />
                    </div>
                    <div onClick={logoutClicked}><CrossIcon /></div>
                </div> 

                <div className='dash_div_profile'>
                    <div>
                        <div>
                            <img src="./no-profile-img.webp" alt="profile" />
                            <p>{selectCurrentBarberdata?.foundUser?.name}</p>
                        </div>

                        <div>
                            <p>Email Id: {selectCurrentBarberdata?.foundUser?.email}</p>
                            <p>Contact Number: {selectCurrentBarberdata?.foundUser?.mobileNumber}</p>
                            {barberOnlineCheck ? <p style={{ color: "#03A100" }}>You are currently Online</p> : <p style={{ color: "red" }}>You are currently Offline</p>}
                        </div>

                    </div>
                    <div>
                        <div className='dash_div_btn_group'>

                            <div>
                                <h2>Barber Online/Offline</h2>
                                <div className='toggle_container'
                                    style={{
                                        background: `${barberOnlineCheck ? 'limegreen' : 'red'}`,
                                        transition: "300ms ease"
                                    }}
                                >
                                    <button
                                        className={barberOnlineCheck ? 'toggle_active' : 'toggle_inactive'}
                                        onClick={barberOnlineHandler}
                                    ></button>
                                </div>
                            </div>

                            <div>
                                <h2>Clock In / Out</h2>
                                <div className='toggle_container'
                                    style={{
                                        background: `${barberbtnCheck ? 'limegreen' : 'red'}`,
                                        transition: "300ms ease"
                                    }}
                                >
                                    <button
                                        className={barberbtnCheck ? 'toggle_active' : 'toggle_inactive'}
                                        onClick={clockHandler}
                                    ></button>
                                </div>
                            </div>
                        </div>
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

                {/* <div className='dash_div_btn_box'>
                    <div className='dash_div_btn_group'>

                        <div>
                            <h2>Barber Online/Offline</h2>
                            <div className='toggle_container'
                                style={{
                                    background: `${barberOnlineCheck ? 'limegreen' : 'red'}`,
                                    transition: "300ms ease"
                                }}
                            >
                                <button
                                    className={barberOnlineCheck ? 'toggle_active' : 'toggle_inactive'}
                                    onClick={barberOnlineHandler}
                                ></button>
                            </div>
                        </div>

                        <div>
                            <h2>Clock In / Out</h2>
                            <div className='toggle_container'
                                style={{
                                    background: `${barberbtnCheck ? 'limegreen' : 'red'}`,
                                    transition: "300ms ease"
                                }}
                            >
                                <button
                                    className={barberbtnCheck ? 'toggle_active' : 'toggle_inactive'}
                                    onClick={clockHandler}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </main>
    )
}

export default Dashboard2


