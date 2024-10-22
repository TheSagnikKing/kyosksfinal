
import React, { useEffect, useState } from 'react'
import './Dashboard2.css'
import { CrossIcon } from '../../icons'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeBarberClockedInStatusKioskMutation, useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation } from './dashboardApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'

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

            if(barberclockonlineerror?.data?.message === "Cant clock you out as you have customers in the queue"){

            }else{
                setBarberbtnCheck(selectCurrentBarberdata?.foundUser?.isClockedIn)
            }
            
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

            // console.log("BARBER ONLINE ERROR",selectCurrentBarberdata?.foundUser?.isOnline)
            setBarberOnlineCheck(selectCurrentBarberdata?.foundUser?.isOnline)
        }
    }, [barberonlineerror,setBarberOnlineCheck])


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
        <main className='barber_kiyosk_container'>
            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <img src={selectCurrentBarberdata?.foundUser?.profile[0]?.url} alt="Barber Profile" />
                                {barberOnlineCheck ? <div className='barberonline'></div> : <div/>}
                            </div>
                            <h1>{selectCurrentBarberdata?.foundUser?.name}</h1>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>{selectCurrentBarberdata?.foundUser?.email}</p>
                            <p>{selectCurrentBarberdata?.foundUser?.mobileNumber}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div
                                style={{
                                    background: barberOnlineCheck ? "#75E6A4" : "#000"
                                }}
                            >
                                <p className={`toggle_btn_text ${barberOnlineCheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{barberOnlineCheck ? "Online" : "Offline"}</p>
                                <button
                                    className={`toggle_btn ${barberOnlineCheck ? 'toggle_active' : 'toggle_inactive'}`}
                                    onClick={barberOnlineHandler}
                                ></button>
                            </div>
                            <div
                                style={{
                                    background: barberbtnCheck ? "#75E6A4" : "#000"
                                }}
                            >
                                <p className={`toggle_btn_text ${barberbtnCheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{barberbtnCheck ? "Clock In" : "Clock Out"}</p>
                                <button
                                    className={`toggle_btn ${barberbtnCheck ? 'toggle_active' : 'toggle_inactive'}`}
                                    onClick={clockHandler}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <p>Day</p>
                        <p>Date</p>
                        <p>Time In</p>
                        <p>Time Out</p>
                    </div>

                    <div>
                        {
                            getAttendenceByBarberIdKioskisSuccess && getAttendenceByBarberIdKioskdata.response.attendance.map((b, i) => (
                                <div key={b._id}>
                                    <p>{b.day}</p>
                                    <p>{b.date}</p>
                                    <p>{b.signInTime === "" ? "-" : b.signInTime}</p>
                                    <p>{b.signOutTime === "" ? "-" : b.signOutTime}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='close_dashboard' onClick={logoutClicked}><IoMdClose /></div>
            </div>
        </main>
    )
}

export default Dashboard2





