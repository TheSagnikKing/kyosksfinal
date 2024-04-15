// import React, { useEffect, useState } from 'react'
// import './Dashboard2.css'
// import { CrossIcon } from '../../icons'
// import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
// import { useChangeBarberClockedInStatusKioskMutation, useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation } from './dashboardApiSlice'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'

// const Dashboard2 = () => {

//     const selectCurrentBarberdata = useSelector(selectCurrentBarberInfo)
//     const selectCurrentBarberTokendata = useSelector(selectCurrentBarberToken)
//     const adminInfo = useSelector(selectCurrentAdminInfo)

//     const [
//         changeBarberClockedInStatusKiosk,
//         {
//             data: barberclockonlinedata,
//             isSuccess: barberclockonlineisSuccess,
//             isError: barberclockonlineisError,
//             error: barberclockonlineerror,
//             isLoading: barberclockonlineisLoading
//         }
//     ] = useChangeBarberClockedInStatusKioskMutation()

//     const [
//         getAttendenceByBarberIdKiosk,
//         {
//             data: getAttendenceByBarberIdKioskdata,
//             isSuccess: getAttendenceByBarberIdKioskisSuccess,
//             isError: getAttendenceByBarberIdKioskisError,
//             error: getAttendenceByBarberIdKioskerror,
//             isLoading: getAttendenceByBarberIdKioskisLoading
//         }
//     ] = useGetAttendenceByBarberIdKioskMutation()


//     const [barberbtnCheck, setBarberbtnCheck] = useState(selectCurrentBarberdata?.foundUser?.isClockedIn)


//     const navigate = useNavigate()

//     useEffect(() => {
//         if (getAttendenceByBarberIdKioskisError) {
//             toast.error(getAttendenceByBarberIdKioskerror?.data?.message, {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });
//         }
//     }, [getAttendenceByBarberIdKioskisError])



//     useEffect(() => {
//         if (barberclockonlineisError) {
//             toast.error(barberclockonlineerror?.data?.message, {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });
//             setBarberbtnCheck(selectCurrentBarberdata?.foundUser?.isClockedIn)
//         }
//     }, [barberclockonlineisError])


//     useEffect(() => {
//         if (barberclockonlineisSuccess) {
//             toast.success(barberclockonlinedata?.message, {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });

//             setBarberbtnCheck((prev) => !prev)

//             if (barberclockonlinedata?.response?.isClockedIn === false) {
//                 setBarberOnlineCheck(barberclockonlinedata?.response?.isClockedIn)
//             }

//             getAttendenceByBarberIdKiosk({
//                 salonId: selectCurrentBarberdata?.foundUser?.salonId,
//                 barberId: selectCurrentBarberdata?.foundUser?.barberId
//             })
//         }
//     }, [barberclockonlineisSuccess, selectCurrentBarberdata])


//     useEffect(() => {
//         getAttendenceByBarberIdKiosk({
//             salonId: selectCurrentBarberdata?.foundUser?.salonId,
//             barberId: selectCurrentBarberdata?.foundUser?.barberId
//         })
//     }, [selectCurrentBarberdata])


//     const clockHandler = () => {
//         const confirm = window.confirm("Change Clock Status ?")

//         const barberdata = {
//             salonId: adminInfo?.salonId,
//             barberId: selectCurrentBarberdata?.foundUser?.barberId,
//             isClockedIn: !barberbtnCheck,
//             barberToken: selectCurrentBarberTokendata
//         }

//         if (confirm) {
//             changeBarberClockedInStatusKiosk(barberdata)
//         }
//     }


//     const logoutClicked = () => {
//         navigate("/barbersignin")
//     }


//     const [barberOnlineCheck, setBarberOnlineCheck] = useState(selectCurrentBarberdata?.foundUser?.isOnline)

//     const [
//         changeBarberOnlineStatusKiosk,
//         {
//             data: barberonlinedata,
//             isSuccess: barberonlineisSuccess,
//             isError: barberonlineisError,
//             error: barberonlineerror,
//             isLoading: barberonlineisLoading
//         }
//     ] = useChangeBarberOnlineStatusKioskMutation()


//     useEffect(() => {
//         if (barberonlineisSuccess) {
//             toast.success(barberonlinedata?.message, {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });

//             setBarberOnlineCheck(barberonlinedata?.response?.isOnline)
//         }
//     }, [barberonlineisSuccess])

//     useEffect(() => {
//         if (barberonlineisError) {
//             toast.error(barberonlineerror?.data?.message, {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });
//             setBarberOnlineCheck(selectCurrentBarberdata?.foundUser?.isOnline)
//         }
//     }, [barberonlineerror])


//     const barberOnlineHandler = () => {
//         const confirm = window.confirm("Change Salon Status ?")


//         const barberOnlinedata = {
//             salonId: adminInfo?.salonId,
//             barberId: selectCurrentBarberdata?.foundUser?.barberId,
//             isOnline: !barberOnlineCheck,
//             barberToken: selectCurrentBarberTokendata
//         }


//         if (confirm) {
//             changeBarberOnlineStatusKiosk(barberOnlinedata)
//         }

//     }

//     const bgcolorFnc = (i) => {
//         return i === 0 ? "var(--bg-color-1)" : i === 1 ? "var(--bg-color-2)" :
//         i === 3 ? "var(--bg-color-3)" : i === 4 ? "var(--bg-color-4)" : i === 5 ? "var(--bg-color-5)" :
//         i === 6 ? "var(--bg-color-6)" : i === 7 ? "var(--bg-color-7)" : "var(--bg-color-8)"
//     }

//     const textcolorFnc = (i) => {
//         return i === 0 ? "var(--text-color-1)" : i === 1 ? "var(--text-color-2)" :
//         i === 3 ? "var(--text-color-3)" : i === 4 ? "var(--text-color-4)" : i === 5 ? "var(--text-color-5)" :
//         i === 6 ? "var(--text-color-6)" : i === 7 ? "var(--text-color-7)" : "var(--text-color-8)"
//     }

//     return (
//         <main className='dash_main_container'>
//             <div>
//                 <div className='dash_div_header'>
//                     <div>
//                         {/* <p>{selectCurrentBarberdata?.foundUser?.name}</p> */}
//                         <div />
//                     </div>
//                     <div onClick={logoutClicked}><CrossIcon /></div>
//                 </div> 

//                 <div className='dash_div_profile'>
//                     <div>
//                         <div>
//                             <img src="./no-profile-img.webp" alt="profile" />
//                             <p>{selectCurrentBarberdata?.foundUser?.name}</p>

//                             {barberOnlineCheck ? <div className='online'/> : <div/>}
//                         </div>

//                         <div>
//                             <p>Email Id: {selectCurrentBarberdata?.foundUser?.email}</p>
//                             <p>Contact Number: {selectCurrentBarberdata?.foundUser?.mobileNumber}</p>
//                             {/* {barberOnlineCheck ? <p style={{ color: "#03A100" }}>You are currently Online</p> : <p style={{ color: "red" }}>You are currently Offline</p>} */}
//                         </div>

//                     </div>
//                     <div>
//                         <div className='dash_div_btn_group'>

//                             <div>
//                                 <h2>Barber Online/Offline</h2>
//                                 <div className='toggle_container'
//                                     style={{
//                                         background: `${barberOnlineCheck ? 'limegreen' : 'red'}`,
//                                         transition: "300ms ease"
//                                     }}
//                                 >
//                                     <button
//                                         className={barberOnlineCheck ? 'toggle_active' : 'toggle_inactive'}
//                                         onClick={barberOnlineHandler}
//                                     ></button>
//                                 </div>
//                             </div>

//                             <div>
//                                 <h2>Clock In / Out</h2>
//                                 <div className='toggle_container'
//                                     style={{
//                                         background: `${barberbtnCheck ? 'limegreen' : 'red'}`,
//                                         transition: "300ms ease"
//                                     }}
//                                 >
//                                     <button
//                                         className={barberbtnCheck ? 'toggle_active' : 'toggle_inactive'}
//                                         onClick={clockHandler}
//                                     ></button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 <div className='kiyosk__dashboard__main__body'>
//                     <div>
//                         <div>
//                             <div>
//                                 <h2>Days</h2>
//                                 <h2>Week Date</h2>
//                                 <h2>Time-In</h2>
//                                 <h2>Time-Out</h2>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         {
//                             getAttendenceByBarberIdKioskisSuccess && getAttendenceByBarberIdKioskdata.response.attendance.map((b,i) => (
//                                 <div className='kiyosk__dashboard__main__body__item' key={b._id}>
//                                     <div style={{
//                                         background: bgcolorFnc(i)
//                                     }}>
//                                         <h2 style={{color:textcolorFnc(i)}}>{b.day === "" ? "-" : b.day}</h2>
//                                         <h2 style={{color:textcolorFnc(i)}}>{b.date === "" ? "-" : b.date}</h2>
//                                         <h2 style={{color:textcolorFnc(i)}}>{b.signInTime === "" ? "-" : b.signInTime}</h2>
//                                         <h2 style={{color:textcolorFnc(i)}}>{b.signOutTime === "" ? "-" : b.signOutTime}</h2>
//                                     </div>
//                                 </div>
//                             ))
//                         }

//                     </div>

//                 </div>

//                 {/* <div className='dash_div_btn_box'>
//                     <div className='dash_div_btn_group'>

//                         <div>
//                             <h2>Barber Online/Offline</h2>
//                             <div className='toggle_container'
//                                 style={{
//                                     background: `${barberOnlineCheck ? 'limegreen' : 'red'}`,
//                                     transition: "300ms ease"
//                                 }}
//                             >
//                                 <button
//                                     className={barberOnlineCheck ? 'toggle_active' : 'toggle_inactive'}
//                                     onClick={barberOnlineHandler}
//                                 ></button>
//                             </div>
//                         </div>

//                         <div>
//                             <h2>Clock In / Out</h2>
//                             <div className='toggle_container'
//                                 style={{
//                                     background: `${barberbtnCheck ? 'limegreen' : 'red'}`,
//                                     transition: "300ms ease"
//                                 }}
//                             >
//                                 <button
//                                     className={barberbtnCheck ? 'toggle_active' : 'toggle_inactive'}
//                                     onClick={clockHandler}
//                                 ></button>
//                             </div>
//                         </div>
//                     </div>
//                 </div> */}
//             </div>
//         </main>
//     )
// }

// export default Dashboard2


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

    const [togglecheck, setToggleCheck] = useState(false)

    return (
        <main className='barber_kiyosk_container'>
            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXzoYdO9tqmkjlVHmpgXnOsQb9DWkz_Mfi1Jc7zNzaw&s" alt="Barber Profile" />
                                <div className='barberonline'></div>
                            </div>
                            <h1>Sagnik Nandy</h1>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Email ID: <span>sagniknandy26@gmail.com</span></p>
                            <p>Contact: <span>1234567890</span></p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div
                                style={{
                                    background: togglecheck ? "#75E6A4" : "#000"
                                }}
                            >
                                <p className={`toggle_btn_text ${togglecheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{togglecheck ? "Online" : "Offline"}</p>
                                <button
                                    className={`toggle_btn ${togglecheck ? 'toggle_active' : 'toggle_inactive'}`}
                                    onClick={() => setToggleCheck((prev) => !prev)}
                                ></button>
                            </div>
                            <div
                                style={{
                                    background: togglecheck ? "#75E6A4" : "#000"
                                }}
                            >
                                <p className={`toggle_btn_text ${togglecheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{togglecheck ? "Clock In" : "Clock Out"}</p>
                                <button
                                    className={`toggle_btn ${togglecheck ? 'toggle_active' : 'toggle_inactive'}`}
                                    onClick={() => setToggleCheck((prev) => !prev)}
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
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>

                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>

                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>

                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>

                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>

                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                        <div>
                            <p>Monday</p>
                            <p>2024-04-08</p>
                            <p>10:20:36</p>
                            <p>16:12:22</p>
                        </div>
                    </div>
                </div>

                <div className='close_dashboard'><IoMdClose /></div>
            </div>
        </main>
    )
}

export default Dashboard2





