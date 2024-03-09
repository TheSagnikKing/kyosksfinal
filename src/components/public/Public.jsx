import React, { useEffect, useState } from 'react'
import './Public.css'
import { DropdownIcon, SettingsIcon } from '../../icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useAdminConnectKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByAdminKioskMutation } from './publicApiSlice'
import toast from 'react-hot-toast'

const Public = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [salonId, setSalonId] = useState(adminInfo?.salonId)
  const [salonName, setSalonName] = useState("")

  const [
    getDefaultSalonByAdminKiosk,
    {
      data,
      isSuccess,
      isError,
      error,
      isLoading
    }
  ] = useGetDefaultSalonByAdminKioskMutation()

  const [
    adminConnectKiosk,
    {
      data:adminConnectKioskdata,
      isSuccess:adminConnectKioskisSuccess,
      isError:adminConnectKioskisError,
      error:adminConnectKioskerror,
      isLoading:adminConnectKioskisLoading
    }
  ] = useAdminConnectKioskMutation()

  const [
    getAllSalonsByAdmin,
    {
      data:getAllSalonsByAdmindata,
      isSuccess:getAllSalonsByAdminisSuccess,
      isError:getAllSalonsByAdminisError,
      error:getAllSalonsByAdminerror,
      isLoading:getAllSalonsByAdminisLoading
    }
  ] = useGetAllSalonsByAdminMutation()



  useEffect(() => {
    if(adminInfo){
      getDefaultSalonByAdminKiosk(adminInfo?.email)
      getAllSalonsByAdmin(adminInfo?.email)
    }
  },[adminInfo])

  useEffect(() => {
    if(adminInfo && isSuccess){
      setSalonName(data?.response?.salonName)
      setSalonId(data?.response?.salonId)
    }
  },[adminInfo,isSuccess])


  useEffect(() => {
    if(adminConnectKioskisSuccess){
      window.location.reload()
    }
  },[adminConnectKioskisSuccess])



  const [dropdown, setDropdown] = useState(false)

  const navigate = useNavigate()

  const settingClicked = () => {
    setDropdown(!dropdown)
    // navigate('/barbersignin')
  }

  const joinqueueClicked = () => {
    navigate('/joinqueue')
  }

  const logoutHandler = () => {
    localStorage.setItem('adminkiyoskloggin', 'false')
    localStorage.setItem('adminkiyosktoken', '')
    navigate('/')
  }

  const [salonlistdrop, setSalonListDrop] = useState(false)

  const salonlistHandler = () => {
    setSalonListDrop((prev) => !prev)
  }

  const salonHandler = (currentsalon) => {
    setSalonId(currentsalon.salonId)
    setSalonName(currentsalon.salonName)
    setSalonListDrop(false)
  }

  const applySalonHandler = () => {
    if(salonId === adminInfo?.salonId){
      toast.error("Choose different Salon", {
        duration: 3000,
        style: {
            fontSize: "1.4rem",
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    });
    }else{
      const admindata = {
        adminEmail:adminInfo?.email,
        salonId
      }

      adminConnectKiosk(admindata)
    }

  }

  return (
    <main className='public__main__container'>
      <div className='public__main__top'>
        <div><img src="/iqb_logo.jpg" alt="" /></div>

        <div>
          <div className='salonlistdropdown__box'>
            <p>{salonName !== "" && salonName}</p>
            <div onClick={salonlistHandler}><DropdownIcon /></div>

            {salonlistdrop && (
              <div className='salonlistdropdown__box__content'>
                {getAllSalonsByAdmindata?.salons?.length > 0 &&
                  getAllSalonsByAdmindata?.salons.map((s) => (
                    <div key={s._id} onClick={() => salonHandler(s)} 
                    style={{
                      backgroundColor:salonName === s.salonName ? "var(--quarterny-color)" : ""
                    }}
                    ><p style={{
                      color:salonName === s.salonName ? "var(--secondary-color)" : "var(--primary-color)"
                    }}>{s.salonName}</p></div>
                  ))
                }
              </div>
            )}
          </div>

          {Object.keys(adminInfo).length > 0 && <div onClick={applySalonHandler}><p>Apply</p></div>}
        </div>

        <div onClick={() => settingClicked()}><SettingsIcon /></div>

        {dropdown && <div className='public__main__top__logoutdiv'>
          <Link to="/barbersignin">Barber Signin</Link>
          <p onClick={logoutHandler}>Logout</p>
        </div>}
      </div>

      <div className='public__main__middle'>
        <img src="/iqb_banner.png" alt="" />
      </div>

      <div className='public__main__bottom'>
        <div>
          <button>Queue List</button>
          <button onClick={joinqueueClicked}>Join Queue</button>
        </div>
      </div>
    </main>
  )
}

export default Public