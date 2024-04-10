import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeSalonOnlineStatusKioskMutation } from '../Dashboard/dashboardApiSlice'
import { useSelector } from 'react-redux'
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
  },[isSuccess])

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
    if(adminInfo){
      changeSalonOnlineStatusKiosk(salondata)
      console.log(salondata)
    }
  }, [salonbtnCheck,adminInfo])


  const salonOnlineHandler = () => {
    const confirm = window.confirm("Change Salon Status ?")

    if (confirm) {
      setSalonbtnCheck((prev) => !prev)
    }

  }


  return (
    <main className='accountSettings_container'>

      <div>
        <img src="./salon.jpg" alt="image" />
      </div>


      <div>
        <div className='accountSettings_content'>
          <div>
            <h1>Salon Status</h1>

            <div>
              <button
                onClick={salonOnlineHandler}
                style={{
                  background: salonbtnCheck === true  ? "red" : "limegreen",
                  color: "#fff"
                }}
              >{salonbtnCheck === true  ? "Salon Offline" : "Salon Online"}</button>
            </div>
          </div>


          <div>
            <h1>Mobile Status</h1>

            <div>
              <button>Mobile Online</button>
            </div>
          </div>

        </div>
      </div>



    </main>
  )
}

export default AccountSettings