// import React, { useEffect, useState } from 'react'
// import style from './SalonSettings.module.css'
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
// import { useChangeSalonOnlineStatusKioskMutation, useMobileBookingAvailabilityStatusMutation } from '../Dashboard/dashboardApiSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import { Link, useNavigate } from 'react-router-dom'
// import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'
// import CommonHeader from '../CommonHeader/CommonHeader'

// const SalonSettings = () => {

//   const adminInfo = useSelector(selectCurrentAdminInfo)

//   const [salonbtnCheck, setSalonbtnCheck] = useState(null)


//   useEffect(() => {
//     if (adminInfo) {
//       setSalonbtnCheck(adminInfo?.isSalonOnline)
//     }
//   }, [adminInfo])

//   const [
//     changeSalonOnlineStatusKiosk,
//     {
//       data,
//       isSuccess,
//       isError,
//       error,
//       isLoading
//     }
//   ] = useChangeSalonOnlineStatusKioskMutation()


//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message, {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       setTimeout(() => {
//         window.location.reload()
//       }, 500)

//       setSalonbtnCheck(data?.response?.isOnline)
//     }
//   }, [isSuccess])

//   useEffect(() => {
//     if (isError) {
//       toast.error(error?.data?.message, {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       setSalonbtnCheck(adminInfo?.isSalonOnline)
//     }
//   }, [isError])


//   const salonOnlineHandler = () => {
//     const confirm = window.confirm("Change Salon Status ?")

//     const salondata = {
//       salonId: adminInfo?.salonId,
//       isOnline: !salonbtnCheck
//     }

//     if (confirm) {
//       changeSalonOnlineStatusKiosk(salondata)
//     }

//   }

//   // For the mobile Part

//   const [mobilebtnCheck, setMobilebtnCheck] = useState(null)

//   console.log("AdminInfo ", adminInfo?.mobileBookingAvailability)

//   useEffect(() => {
//     if (adminInfo) {
//       setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
//     }
//   }, [adminInfo])

//   const mobileBookdata = {
//     salonId: adminInfo?.salonId,
//     // mobileBookingAvailability: !mobilebtnCheck
//     mobileBookingAvailability: !adminInfo?.mobileBookingAvailability
//   }

//   const [
//     mobileBookingAvailabilityStatus,
//     {
//       data: mobilebookdata,
//       isSuccess: mobilebookisSuccess,
//       isError: mobilebookdataisError,
//       error: mobilebookError,
//       isLoading: mobilebookisLoading
//     }
//   ] = useMobileBookingAvailabilityStatusMutation()


//   useEffect(() => {
//     if (mobilebookisSuccess) {
//       toast.success(mobilebookdata?.message, {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       setTimeout(() => {
//         window.location.reload()
//       }, 500)

//       setMobilebtnCheck(mobilebookdata?.response?.mobileBookingAvailability)
//     }
//   }, [mobilebookisSuccess])

//   useEffect(() => {
//     if (mobilebookdataisError) {
//       toast.error(mobilebookError?.data?.message, {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
//     }
//   }, [mobilebookdataisError])


//   const mobileBookOnlineHandler = () => {
//     const confirm = window.confirm("Change Mobile Book Status ?")

//     if (confirm) {
//       mobileBookingAvailabilityStatus(mobileBookdata)
//     }

//   }
//   const navigate = useNavigate()

//   const logoutSalonHandler = () => {
//     localStorage.setItem("adminsalonsettings", "false")
//     navigate("/salonsignin")
//   }

//   const [
//     getDefaultSalonByKiosk,
//     {
//       data: defaultsalondata,
//       isLoading: defaultsalonisLoading,
//       isSuccess: defaultsalonsuccess,
//       isError: defaultsalonisError,
//       error: defaultsalonerror
//     }
//   ] = useGetDefaultSalonByKioskMutation()

//   useEffect(() => {
//     if (adminInfo?.email) {
//       const salondata = {
//         email: adminInfo?.email,
//         role: adminInfo?.role
//       }
//       getDefaultSalonByKiosk(salondata)
//     }
//   }, [adminInfo])

//   console.log("AdminInfoff", defaultsalondata)

//   const [themecolor, setThemeColor] = useState(false)

//   const [togglecheck, setToggleCheck] = useState(false)

//   return (
//     <>
//       <CommonHeader
//         themecolor={themecolor}
//         setThemeColor={setThemeColor}
//       />
//       <section className={style.salon_settings_container}>
//         <div className={style.salon_settings_left}>
//           <img src="./My_Bookings.png" alt="salon_settings_img" />
//         </div>
//         <div className={style.salon_settings_right}>
//           <div className={style.salon_main_container}>
//             <p>Welcome to salon settings</p>
//             <div>
//               <div>
//                 <p>Salon Status</p>
//                 {
//                   Object.keys(adminInfo).length > 0 &&
//                   <button
//                     style={{
//                       background: adminInfo?.isSalonOnline ? "red" : "limegreen"
//                     }}
//                     onClick={salonOnlineHandler}
//                   >{adminInfo?.isSalonOnline ? "Offline" : "Online"}</button>
//                 }
//               </div>

//               <div>
//                 <p>Mobile Booking</p>
//                 {
//                   Object.keys(adminInfo).length > 0 &&
//                   <button
//                     style={{
//                       background: adminInfo?.mobileBookingAvailability ? "#A0A0A0" : "#0a84ff"
//                     }}
//                     onClick={mobileBookOnlineHandler}
//                   >{adminInfo?.mobileBookingAvailability ? "Unavailable" : "Available"}</button>
//                 }

//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default SalonSettings



import React, { useEffect, useState } from 'react'
import style from './SalonSettings.module.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeSalonOnlineStatusKioskMutation, useMobileBookingAvailabilityStatusMutation } from '../Dashboard/dashboardApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'
import CommonHeader from '../CommonHeader/CommonHeader'

const SalonSettings = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [salonbtnCheck, setSalonbtnCheck] = useState(null)


  useEffect(() => {
    if (adminInfo) {
      setSalonbtnCheck(adminInfo?.isSalonOnline)
    }
  }, [adminInfo])

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


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      setTimeout(() => {
        window.location.reload()
      }, 500)

      setSalonbtnCheck(data?.response?.isOnline)
    }
  }, [isSuccess])

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
      setSalonbtnCheck(adminInfo?.isSalonOnline)
    }
  }, [isError])


  const salonOnlineHandler = () => {
    const confirm = window.confirm("Change Salon Status ?")

    const salondata = {
      salonId: adminInfo?.salonId,
      isOnline: !salonbtnCheck
    }

    if (confirm) {
      changeSalonOnlineStatusKiosk(salondata)
    }

  }

  // For the mobile Part

  const [mobilebtnCheck, setMobilebtnCheck] = useState(null)

  console.log("AdminInfo ", adminInfo?.mobileBookingAvailability)

  useEffect(() => {
    if (adminInfo) {
      setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
    }
  }, [adminInfo])

  const mobileBookdata = {
    salonId: adminInfo?.salonId,
    // mobileBookingAvailability: !mobilebtnCheck
    mobileBookingAvailability: !adminInfo?.mobileBookingAvailability
  }

  const [
    mobileBookingAvailabilityStatus,
    {
      data: mobilebookdata,
      isSuccess: mobilebookisSuccess,
      isError: mobilebookdataisError,
      error: mobilebookError,
      isLoading: mobilebookisLoading
    }
  ] = useMobileBookingAvailabilityStatusMutation()


  useEffect(() => {
    if (mobilebookisSuccess) {
      toast.success(mobilebookdata?.message, {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      setTimeout(() => {
        window.location.reload()
      }, 500)

      setMobilebtnCheck(mobilebookdata?.response?.mobileBookingAvailability)
    }
  }, [mobilebookisSuccess])

  useEffect(() => {
    if (mobilebookdataisError) {
      toast.error(mobilebookError?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
    }
  }, [mobilebookdataisError])


  const mobileBookOnlineHandler = () => {
    const confirm = window.confirm("Change Mobile Book Status ?")

    if (confirm) {
      mobileBookingAvailabilityStatus(mobileBookdata)
    }

  }
  const navigate = useNavigate()

  const logoutSalonHandler = () => {
    localStorage.setItem("adminsalonsettings", "false")
    navigate("/salonsignin")
  }

  const [
    getDefaultSalonByKiosk,
    {
      data: defaultsalondata,
      isLoading: defaultsalonisLoading,
      isSuccess: defaultsalonsuccess,
      isError: defaultsalonisError,
      error: defaultsalonerror
    }
  ] = useGetDefaultSalonByKioskMutation()

  useEffect(() => {
    if (adminInfo?.email) {
      const salondata = {
        email: adminInfo?.email,
        role: adminInfo?.role
      }
      getDefaultSalonByKiosk(salondata)
    }
  }, [adminInfo])

  console.log("AdminInfoff", defaultsalondata)

  const [themecolor, setThemeColor] = useState(false)

  const [togglecheck, setToggleCheck] = useState(false)

  return (
    <>
      <CommonHeader
        themecolor={themecolor}
        setThemeColor={setThemeColor}
      />
      <section className={style.salon_settings_container}>
        <div className={style.salon_settings_left}>
          <img src="./My_Bookings.png" alt="salon_settings_img" />
        </div>
        <div className={style.salon_settings_right}>
          <div className={style.salon_main_container}>
            <p>Welcome to salon settings</p>
            <div>
              <div>
                <div>
                  <p>Salon Status</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore officiis debitis nisi beatae! Facere nihil maiores quod voluptas odio?</p>
                </div>
                {
                  Object.keys(adminInfo).length > 0 &&
                  <button
                    style={{
                      background: adminInfo?.isSalonOnline ? "limegreen" : "red"
                    }}
                    onClick={salonOnlineHandler}
                  >{adminInfo?.isSalonOnline ? "Online" : "Offline"}</button>
                }
              </div>

              <div>
                <div>
                  <p>Mobile Booking</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore officiis debitis nisi beatae! Facere nihil maiores quod voluptas odio?</p>
                </div>
                {
                  Object.keys(adminInfo).length > 0 &&
                  <button
                    style={{
                      background: adminInfo?.mobileBookingAvailability ? "#0a84ff" : "#A0A0A0"
                    }}
                    onClick={mobileBookOnlineHandler}
                  >{adminInfo?.mobileBookingAvailability ? "Available" : "Unavailable"}</button>
                }

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default SalonSettings

