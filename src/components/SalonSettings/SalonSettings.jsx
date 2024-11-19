import React, { useEffect, useState } from 'react'
import style from './SalonSettings.module.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeSalonOnlineStatusKioskMutation, useMobileBookingAvailabilityStatusMutation } from '../Dashboard/dashboardApiSlice'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'

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
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
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
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
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
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
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
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
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

  
  return (
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
                    className={adminInfo?.isSalonOnline ? style.online_btn : style.offline_btn}
                    onClick={salonOnlineHandler}
                  >{adminInfo?.isSalonOnline ? "Online" : "Offline"}</button>
                }
              </div>

              <div style={{borderBottom: "none"}}>
                <div>
                  <p>Mobile Booking</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore officiis debitis nisi beatae! Facere nihil maiores quod voluptas odio?</p>
                </div>
                {
                  Object.keys(adminInfo).length > 0 &&
                  <button
                    className={adminInfo?.mobileBookingAvailability ? style.online_btn : style.offline_btn}
                    onClick={mobileBookOnlineHandler}
                  >{adminInfo?.mobileBookingAvailability ? "Available" : "Unavailable"}</button>
                }

              </div>
            </div>

          </div>
        </div>
      </section>
  )
}

export default SalonSettings

