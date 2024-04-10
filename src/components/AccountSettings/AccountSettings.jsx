import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeSalonOnlineStatusKioskMutation } from '../Dashboard/dashboardApiSlice'
import {useSelector} from 'react-redux'
import toast from 'react-hot-toast'

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
    changeSalonOnlineStatusKiosk(salondata)
  }, [salonbtnCheck])


  const salonOnlineHandler = () => {
    const confirm = window.confirm("Change Salon Status ?")

    if (confirm) {
      setSalonbtnCheck((prev) => !prev)
    }

  }


  return (
    <main className='accountSettings_container'>

      <div>
        <h1>Change Salon Online and Offline Status</h1>

        <div>
          <button
            onClick={salonOnlineHandler}
            style={{
              background: salonbtnCheck ? "red" : "limegreen",
              color: "#fff"
            }}
          >{salonbtnCheck ? "Salon Offline" : "Salon Online"}</button>
        </div>
      </div>


      <div>
        <h1>Change Mobile Online and Offline</h1>

        <div>
          <button>Mobile Online</button>
        </div>
      </div>


    </main>
  )
}

export default AccountSettings