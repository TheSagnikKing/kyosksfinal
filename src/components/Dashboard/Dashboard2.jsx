import React, { useEffect, useState } from 'react'
import style from './Dashboard2.module.css'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeBarberClockedInStatusKioskMutation, useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation } from './dashboardApiSlice'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Skeleton } from '@mui/material'

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

    useEffect(() => {
        if (getAttendenceByBarberIdKioskisError) {
            toast.error(getAttendenceByBarberIdKioskerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
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
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            if (barberclockonlineerror?.data?.message === "Cant clock you out as you have customers in the queue") {

            } else {
                setBarberbtnCheck(selectCurrentBarberdata?.foundUser?.isClockedIn)
            }

        }
    }, [barberclockonlineisError])


    useEffect(() => {
        if (barberclockonlineisSuccess) {
            toast.success(barberclockonlinedata?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
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
        const confirm = window.confirm("Change Barber Clock Status ?")

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
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
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
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            setBarberOnlineCheck(selectCurrentBarberdata?.foundUser?.isOnline)
        }
    }, [barberonlineerror, setBarberOnlineCheck])


    const barberOnlineHandler = () => {
        const confirm = window.confirm("Change Barber Online Status ?")


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
            <main className={style.barber_kiyosk_container}>
                <div>
                    <div>
                        <div>
                            <div>
                                <img src={selectCurrentBarberdata?.foundUser?.profile[0]?.url} alt="Barber Profile" />
                                <div className={style.barber_online}
                                    style={{
                                        background: barberOnlineCheck ? "limegreen" : "red"
                                    }}
                                ></div>
                            </div>

                        </div>
                        <div>
                            <div>
                                <p>{selectCurrentBarberdata?.foundUser?.name}</p>
                                <p>{selectCurrentBarberdata?.foundUser?.email}</p>
                                <p>{selectCurrentBarberdata?.foundUser?.mobileNumber}</p>
                            </div>

                            <div>
                                <button
                                    className={barberOnlineCheck ? style.online_btn : style.offline_btn}
                                    onClick={barberOnlineHandler}
                                >{barberOnlineCheck ? "Online" : "Offline"  }</button>

                                <button
                                    className={barberbtnCheck ? style.online_btn : style.offline_btn}
                                    onClick={clockHandler}
                                >{barberbtnCheck ? "Clock-In" : "Clock-Out"  }</button>
                            </div>
                        </div>
                    </div>

                    <div className={style.timetable}>
                        <div>
                            <p>Day</p>
                            <p>Date</p>
                            <p>Time In</p>
                            <p>Time Out</p>
                        </div>

                        {
                            getAttendenceByBarberIdKioskisLoading ? (
                                <div className={style.attendence_loading_container}>
                                    <Skeleton
                                        variant="rectangular"
                                        className={style.skeleton}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        className={style.skeleton}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        className={style.skeleton}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        className={style.skeleton}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        className={style.skeleton}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        className={style.skeleton}
                                    />
                                </div>
                            ) : getAttendenceByBarberIdKioskisSuccess && getAttendenceByBarberIdKioskdata?.response?.attendance?.length > 0 ? (
                                <div>
                                    {getAttendenceByBarberIdKioskdata?.response?.attendance.map((b, i) => (
                                        <div key={i}>
                                            <p>{b?.day}</p>
                                            <p>{b?.date}</p>
                                            <p>{b?.signInTime === "" ? "-" : b?.signInTime}</p>
                                            <p>{b?.signOutTime === "" ? "-" : b?.signOutTime}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={style.attendence_loading_container_error}>
                                    <p>No attendance available</p>
                                </div>
                            )
                        }

                    </div>

                </div>
            </main>
    )
}

export default Dashboard2






