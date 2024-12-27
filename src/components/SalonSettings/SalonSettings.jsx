import React, { useEffect, useState } from 'react'
import style from './SalonSettings.module.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeSalonOnlineStatusKioskMutation, useKioskBookingAvailabilityStatusMutation, useMobileBookingAvailabilityStatusMutation } from '../Dashboard/dashboardApiSlice'
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

  const [mobilebtnCheck, setMobilebtnCheck] = useState(false)
  const [kioskbtnCheck, setKioskbtnCheck] = useState(false)

  // console.log("AdminInfo ", adminInfo?.mobileBookingAvailability)

  useEffect(() => {
    if (adminInfo) {
      setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
      setKioskbtnCheck(adminInfo?.kioskAvailability)
    }
  }, [adminInfo])

  const mobileBookdata = {
    salonId: adminInfo?.salonId,
    mobileBookingAvailability: !adminInfo?.mobileBookingAvailability
  }

  const kioskBookdata = {
    salonId: adminInfo?.salonId,
    kioskAvailability: !adminInfo?.kioskAvailability
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

  const [
    kioskBookingAvailabilityStatus,
    {
      data: kioskbookdata,
      isSuccess: kioskbookisSuccess,
      isError: kioskbookdataisError,
      error: kioskbookError,
      isLoading: kioskbookisLoading
    }
  ] = useKioskBookingAvailabilityStatusMutation()


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


  useEffect(() => {
    if (kioskbookisSuccess) {
      toast.success(kioskbookdata?.message, {
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

      setKioskbtnCheck(kioskBookdata?.response?.kioskAvailability)
    }
  }, [kioskbookisSuccess])

  useEffect(() => {
    if (kioskbookdataisError) {
      toast.error(kioskbookError?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      setKioskbtnCheck(adminInfo?.kioskAvailability)
    }
  }, [kioskbookdataisError])


  const kioskBookOnlineHandler = () => {
    const confirm = window.confirm("Change Kiosk Status ?")

    if (confirm) {
      kioskBookingAvailabilityStatus(kioskBookdata)
    }

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
          <p>Salon settings</p>
          <div>
            <div>
              <div>
                <p>Salon Status</p>
                <p>The system will disable the availability of all barbers and mobile bookings, effectively setting their status to offline or shutting them down.</p>
              </div>
              {
                Object.keys(adminInfo).length > 0 &&
                <button
                  className={adminInfo?.isSalonOnline ? style.online_btn : style.offline_btn}
                  onClick={salonOnlineHandler}
                >{adminInfo?.isSalonOnline ? "Online" : "Offline"}</button>
              }
            </div>

            <div>
              <div>
                <p>Mobile Queueing</p>
                <p>Mobile Queueing can be set to online or offline. When offline, customers will not be able to join the queue through the app.</p>
              </div>
              {
                Object.keys(adminInfo).length > 0 &&
                <button
                  className={adminInfo?.mobileBookingAvailability ? style.online_btn : style.offline_btn}
                  onClick={mobileBookOnlineHandler}
                >{adminInfo?.mobileBookingAvailability ? "Available" : "Unavailable"}</button>
              }

            </div>

            <div style={{ borderBottom: "none" }}>
              <div>
                <p>Kiosk Queueing</p>
                <p>Kiosk Queueing can be set to online or offline. When offline, customers will not be able to join the queue through the kiosk.</p>
              </div>
              {
                Object.keys(adminInfo).length > 0 &&
                <button
                  className={adminInfo?.kioskAvailability ? style.online_btn : style.offline_btn}
                  onClick={kioskBookOnlineHandler}
                >{adminInfo?.kioskAvailability ? "Available" : "Unavailable"}</button>
              }

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SalonSettings

