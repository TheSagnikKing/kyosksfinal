import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeSalonOnlineStatusKioskMutation,useMobileBookingAvailabilityStatusMutation } from '../Dashboard/dashboardApiSlice'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'

const AccountSettings = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [salonbtnCheck, setSalonbtnCheck] = useState(adminInfo?.isSalonOnline)


  const salondata = {
    salonId: adminInfo?.salonId,
    isOnline: salonbtnCheck
  }

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

  useEffect(() => {
    if (adminInfo) {
      changeSalonOnlineStatusKiosk(salondata)
      console.log(salondata)
    }
  }, [salonbtnCheck, adminInfo])


  const salonOnlineHandler = () => {
    const confirm = window.confirm("Change Salon Status ?")

    if (confirm) {
      setSalonbtnCheck((prev) => !prev)
    }

  }


  // For the mobile Part

  const [mobilebtnCheck, setMobilebtnCheck] = useState(adminInfo?.mobileBookingAvailability)

  console.log("AdminInfo ",adminInfo?.mobileBookingAvailability)

  const mobileBookdata = {
    salonId: adminInfo?.salonId,
    mobileBookingAvailability: mobilebtnCheck
  }

  const [
    mobileBookingAvailabilityStatus,
    {
      data:mobilebookdata,
      isSuccess:mobilebookisSuccess,
      isError:mobilebookdataisError,
      error:mobilebookError,
      isLoading:mobilebookisLoading
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

  useEffect(() => {
    if (adminInfo) {
      mobileBookingAvailabilityStatus(mobileBookdata)
      console.log(mobileBookdata)
    }
  }, [mobilebtnCheck, adminInfo])


  const mobileBookOnlineHandler = () => {
    const confirm = window.confirm("Change Mobile Book Status ?")

    if (confirm) {
      setMobilebtnCheck((prev) => !prev)
    }

  }

  return (
    <main className='accountSettings_container'>

      <div>
        <img src="./salon.jpg" alt="image" />
      </div>


      <div>
        <Link to="/kiyosk"
          className='accountsettingshomeicon'
        ><IoMdHome /></Link>
        <div className='accountSettings_content'>
          <div>
            <h1>Salon Status</h1>

            <div>
              <button
                onClick={salonOnlineHandler}
                style={{
                  background: salonbtnCheck === true ? "red" : "limegreen",
                  color: "#fff"
                }}
              >{salonbtnCheck === true ? "Salon Offline" : "Salon Online"}</button>
            </div>
          </div>


          <div>
            <h1>Mobile Booking Availability</h1>

            <div
            style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}
            >
              <button
                onClick={mobileBookOnlineHandler}
                style={{
                  background: mobilebtnCheck === true ? "red" : "limegreen",
                  color: "#fff"
                }}
              >{mobilebtnCheck === true ? "Mobile Offline" : "Mobile Online"}</button>
            </div>
            </div>
          </div>

        </div>
  

    </main>
  )
}

export default AccountSettings