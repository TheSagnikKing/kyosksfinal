import React, { useEffect, useRef, useState } from 'react'
import './Public.css'
import { DropdownIcon, SettingsIcon } from '../../icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useAdminConnectKioskMutation, useGerAllAdvertisementsKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByAdminKioskMutation } from './publicApiSlice'
import toast from 'react-hot-toast'
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdArrowDropdownCircle } from 'react-icons/io'

const Public = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [salonId, setSalonId] = useState(adminInfo?.salonId)
  const [salonName, setSalonName] = useState("")

  const [salonLogo, setSalonLogo] = useState("")

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
      data: adminConnectKioskdata,
      isSuccess: adminConnectKioskisSuccess,
      isError: adminConnectKioskisError,
      error: adminConnectKioskerror,
      isLoading: adminConnectKioskisLoading
    }
  ] = useAdminConnectKioskMutation()

  const [
    getAllSalonsByAdmin,
    {
      data: getAllSalonsByAdmindata,
      isSuccess: getAllSalonsByAdminisSuccess,
      isError: getAllSalonsByAdminisError,
      error: getAllSalonsByAdminerror,
      isLoading: getAllSalonsByAdminisLoading
    }
  ] = useGetAllSalonsByAdminMutation()

  const [
    gerAllAdvertisementsKiosk,
    {
      data: gerAllAdvertisementsKioskdata,
      isSuccess: gerAllAdvertisementsKioskisSuccess,
      isError: gerAllAdvertisementsKioskisError,
      error: gerAllAdvertisementsKioskerror,
      isLoading: gerAllAdvertisementsKioskisLoading
    }
  ] = useGerAllAdvertisementsKioskMutation()

  useEffect(() => {
    if (adminInfo?.email) {
      getDefaultSalonByAdminKiosk(adminInfo?.email)
      getAllSalonsByAdmin(adminInfo?.email)
    }
  }, [adminInfo])

  useEffect(() => {
    if (adminInfo && isSuccess) {
      setSalonName(data?.response?.salonName)
      setSalonId(data?.response?.salonId)
      gerAllAdvertisementsKiosk(data?.response?.salonId)
    }
  }, [adminInfo, isSuccess])


  useEffect(() => {
    if (adminConnectKioskisSuccess) {
      window.location.reload()
    }
  }, [adminConnectKioskisSuccess])



  const [dropdown, setDropdown] = useState(false)

  const navigate = useNavigate()

  const settingClicked = () => {
    setDropdown(!dropdown)
    setSalonSettingsDrop(false)
    // navigate('/barbersignin')
  }

  const joinqueueClicked = () => {
    navigate('/joinqueue')
  }

  const logoutHandler = () => {
    localStorage.setItem('adminkiyoskloggin', 'false')
    localStorage.setItem('adminkiyosktoken', '')
    localStorage.setItem("salonSelect", "false")
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
    if (salonId === adminInfo?.salonId) {
      toast.error("Choose different Salon", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      const admindata = {
        adminEmail: adminInfo?.email,
        salonId
      }

      adminConnectKiosk(admindata)
    }

  }

  const queuelistClicked = () => {
    navigate('/queuelist')
  }

  const [salonsettingsdrop, setSalonSettingsDrop] = useState(false)

  return (
    <main className='public__main__container'>
      <div className='public__main__top'>
        <div>

          {
            isLoading ? <Skeleton
              count={1}
              circle={true}
              borderRadius={"50%"}
              height={"100%"}
              width={"10.1rem"}
            /> : isSuccess && data?.response?.salonLogo.length > 0 ? (
              <img src={data.response.salonLogo[0].url} alt={data.response.salonName} />
            ) : (
              <img src='/no-image.webp' alt="no image available" />
            )
          }
        </div>

        <div />

        <button onClick={() => settingClicked()}><SettingsIcon /></button>

        {dropdown && <div className='public__main__top__logoutdiv'>
          <Link to="/barbersignin">Barber Signin</Link>
          <Link to="/salonsignin">Salon Settings</Link>
          <p onClick={logoutHandler} style={{ cursor: "pointer" }}>Logout</p>
        </div>}

      </div>

      <div className='public__main__middle'>
        {
          // If advertisements are loading or admin salon ID is not present, show a skeleton.
          gerAllAdvertisementsKioskisLoading || !adminInfo?.salonId ? (
            <Skeleton count={1} height="60vh" />
          ) : (
            // If advertisements are successfully fetched and there's at least one advertisement, display them in a carousel.
            gerAllAdvertisementsKioskisSuccess && gerAllAdvertisementsKioskdata?.advertisements.length > 0 ? (
              <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={6000}
                showStatus={false}
              >
                {gerAllAdvertisementsKioskdata?.advertisements.map((c) => (
                  <img key={c.id} src={c.url} alt={c.alt} style={{ height: "60vh", objectFit: "cover" }} />
                ))}
              </Carousel>
            ) : (
              // If there are no advertisements or if there was an error fetching them, show a default image.
              <img src='/no-image.webp' alt="no image available" />
            )
          )
        }

      </div>


      <div className='public__main__bottom'>
        <div>
          <button onClick={queuelistClicked}>Queue List</button>
          <button onClick={joinqueueClicked}>Join Queue</button>
        </div>
      </div>


    </main>
  )
}

export default Public




