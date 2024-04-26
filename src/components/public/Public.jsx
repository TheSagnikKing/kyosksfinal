// import React, { useEffect, useRef, useState } from 'react'
// import './Public.css'
// import { DropdownIcon, SettingsIcon } from '../../icons'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
// import { useAdminConnectKioskMutation, useGerAllAdvertisementsKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByAdminKioskMutation } from './publicApiSlice'
// import toast from 'react-hot-toast'
// import { Carousel } from 'react-responsive-carousel';

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'


// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { IoMdArrowDropdownCircle } from 'react-icons/io'

// const Public = () => {

// const adminInfo = useSelector(selectCurrentAdminInfo)

// console.log("AdminInfo ",adminInfo)

// const [salonId, setSalonId] = useState(adminInfo?.salonId)
// const [salonName, setSalonName] = useState("")

// const [salonLogo, setSalonLogo] = useState("")

// const [
//   getDefaultSalonByAdminKiosk,
//   {
//     data,
//     isSuccess,
//     isError,
//     error,
//     isLoading
//   }
// ] = useGetDefaultSalonByAdminKioskMutation()

// const [
//   adminConnectKiosk,
//   {
//     data: adminConnectKioskdata,
//     isSuccess: adminConnectKioskisSuccess,
//     isError: adminConnectKioskisError,
//     error: adminConnectKioskerror,
//     isLoading: adminConnectKioskisLoading
//   }
// ] = useAdminConnectKioskMutation()

// const [
//   getAllSalonsByAdmin,
//   {
//     data: getAllSalonsByAdmindata,
//     isSuccess: getAllSalonsByAdminisSuccess,
//     isError: getAllSalonsByAdminisError,
//     error: getAllSalonsByAdminerror,
//     isLoading: getAllSalonsByAdminisLoading
//   }
// ] = useGetAllSalonsByAdminMutation()

// const [
//   gerAllAdvertisementsKiosk,
//   {
//     data: gerAllAdvertisementsKioskdata,
//     isSuccess: gerAllAdvertisementsKioskisSuccess,
//     isError: gerAllAdvertisementsKioskisError,
//     error: gerAllAdvertisementsKioskerror,
//     isLoading: gerAllAdvertisementsKioskisLoading
//   }
// ] = useGerAllAdvertisementsKioskMutation()

// useEffect(() => {
//   if (adminInfo?.email) {
//     const salondata = {     
//       adminEmail:adminInfo?.email,
//       role:adminInfo?.role
//     }
//     getDefaultSalonByAdminKiosk(salondata)
//     getAllSalonsByAdmin(adminInfo?.email)
//   }
// }, [adminInfo])

// useEffect(() => {
//   if (adminInfo && isSuccess) {
//     setSalonName(data?.response?.salonName)
//     setSalonId(data?.response?.salonId)
//     gerAllAdvertisementsKiosk(data?.response?.salonId)
//   }
// }, [adminInfo, isSuccess])


// useEffect(() => {
//   if(adminInfo?.role === "Barber"){
//     gerAllAdvertisementsKiosk(adminInfo?.salonId)
//   }
// },[adminInfo])


// useEffect(() => {
//   if (adminConnectKioskisSuccess) {
//     window.location.reload()
//   }
// }, [adminConnectKioskisSuccess])

// const [dropdown, setDropdown] = useState(false)

// const navigate = useNavigate()

// const settingClicked = () => {
//   setDropdown(!dropdown)
//   setSalonSettingsDrop(false)
//   // navigate('/barbersignin')
// }

// const joinqueueClicked = () => {
//   navigate('/joinqueue')
// }

// const logoutHandler = () => {
//   localStorage.setItem('adminkiyoskloggin', 'false')
//   localStorage.setItem('adminkiyosktoken', '')
//   localStorage.setItem("salonSelect", "false")
//   navigate('/')
// }

// const [salonlistdrop, setSalonListDrop] = useState(false)

// const salonlistHandler = () => {
//   setSalonListDrop((prev) => !prev)
// }

// const salonHandler = (currentsalon) => {
//   setSalonId(currentsalon.salonId)
//   setSalonName(currentsalon.salonName)
//   setSalonListDrop(false)
// }

// const applySalonHandler = () => {
//   if (salonId === adminInfo?.salonId) {
//     toast.error("Choose different Salon", {
//       duration: 3000,
//       style: {
//         fontSize: "1.4rem",
//         borderRadius: '10px',
//         background: '#333',
//         color: '#fff',
//       },
//     });
//   } else {
//     const admindata = {
//       adminEmail: adminInfo?.email,
//       salonId
//     }

//     adminConnectKiosk(admindata)
//   }

// }

// const queuelistClicked = () => {
//   navigate('/queuelist')
// }

// const [salonsettingsdrop, setSalonSettingsDrop] = useState(false)

//   return (
//     <main className='public__main__container'>
//       <div className='public__main__top'>
//         <div>

// {
//   isLoading ? <Skeleton
//     count={1}
//     circle={true}
//     borderRadius={"50%"}
//     height={"100%"}
//     width={"10.1rem"}
//   /> : isSuccess && data?.response?.salonLogo.length > 0 ? (
//     <img src={data.response.salonLogo[0].url} alt={data.response.salonName} />
//   ) : (
//     <img src='/no-image.webp' alt="no image available" />
//   )
// }

//         </div>

// {
//   adminInfo?.role === "Barber" ? <h1>{adminInfo?.salonName}</h1> : <h1>{data?.response?.salonName}</h1>
// }
//         {/* <h1>{data?.response?.salonName}</h1> */}

//         <button onClick={() => settingClicked()}><SettingsIcon /></button>

//         {dropdown && <div className='public__main__top__logoutdiv'>
//           <Link to="/barbersignin">Barber Signin</Link>
//           <Link to="/salonsignin">Salon Settings</Link>
//           <p onClick={logoutHandler} style={{ cursor: "pointer" }}>Logout</p>
//         </div>}

//       </div>

//       <div className='public__main__middle'>
// {
//   // If advertisements are loading or admin salon ID is not present, show a skeleton.
//   gerAllAdvertisementsKioskisLoading || !adminInfo?.salonId ? (
//     <Skeleton count={1} height="60vh" />
//   ) : (
//     // If advertisements are successfully fetched and there's at least one advertisement, display them in a carousel.
//     gerAllAdvertisementsKioskisSuccess && gerAllAdvertisementsKioskdata?.advertisements.length > 0 ? (
//       <Carousel
//         showThumbs={false}
//         infiniteLoop={true}
//         autoPlay={true}
//         interval={6000}
//         showStatus={false}
//       >
//         {gerAllAdvertisementsKioskdata?.advertisements.map((c) => (
//           <img key={c.id} src={c.url} alt={c.alt} style={{ height: "60vh", objectFit: "cover" }} />
//         ))}
//       </Carousel>
//     ) : (
//       // If there are no advertisements or if there was an error fetching them, show a default image.
//       <img src='/no-image.webp' alt="no image available" />
//     )
//   )
// }

//       </div>


//       <div className='public__main__bottom'>
//         <div>
// <button onClick={queuelistClicked}>Queue List</button>
// <button onClick={joinqueueClicked}>Join Queue</button>
//         </div>
//       </div>


//     </main>
//   )
// }

// export default Public

import React, { useEffect, useState } from 'react'
import './Public.css'

import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from 'react-redux';
import { useAdminConnectKioskMutation, useGerAllAdvertisementsKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByKioskMutation } from './publicApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import toast from 'react-hot-toast'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link, useNavigate } from 'react-router-dom';

import { IoIosArrowForward } from "react-icons/io";
import { TbLogout, TbLogout2 } from 'react-icons/tb';
import { IoMenuSharp } from 'react-icons/io5';

const imagesarray = [
  {
    id: 1,
    url: "https://media.istockphoto.com/id/525568423/photo/london-piccadilly-during-night.jpg?s=612x612&w=0&k=20&c=mBHnao0BnbANC1h2E-rOJ_tSviC7jTw9ir4tfp1V6uI="
  },
  {
    id: 2,
    url: "https://cdn.pixabay.com/photo/2016/03/03/10/17/social-media-1233873_1280.jpg",
  },
  {
    id: 3,
    url: "https://thumbs.dreamstime.com/b/advertising-word-cloud-business-concept-56936998.jpg"
  }
]

const Public = () => {
  const adminInfo = useSelector(selectCurrentAdminInfo)

  console.log("AdminInfo ", adminInfo)

  const [salonId, setSalonId] = useState(adminInfo?.salonId)
  const [salonName, setSalonName] = useState("")

  const [salonLogo, setSalonLogo] = useState("")

  const [
    getDefaultSalonByKiosk,
    {
      data,
      isSuccess,
      isError,
      error,
      isLoading
    }
  ] = useGetDefaultSalonByKioskMutation()

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
      const salondata = {
        email: adminInfo?.email,
        role: adminInfo?.role
      }
      getDefaultSalonByKiosk(salondata)
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
    if (adminInfo?.role === "Barber") {
      gerAllAdvertisementsKiosk(adminInfo?.salonId)
    }
  }, [adminInfo])


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

  const [icongroupdrop, setIcongroupdrop] = useState(false)

  const [openmobilemenu, setOpenmobilemenu] = useState(false)

  return (
    <main className='public_conatainer'>
      <header>
        <div>
          <div>
            {
              isLoading ? <Skeleton
                count={1}
                circle={true}
                borderRadius={"50%"}
                height={"6.5rem"}
                width={"6.5rem"}
              /> : isSuccess && data?.response?.salonLogo.length > 0 ? (
                <img src={data.response.salonLogo[0].url} alt={data.response.salonName} />
              ) : (
                <img src='/no-image.webp' alt="no image available" />
              )
            }
          </div>
          {
            adminInfo?.role === "Barber" ? <p>{adminInfo?.salonName}</p> : <p>{data?.response?.salonName}</p>
          }
        </div>

        <div className='public_btn_group'>
          <button onClick={queuelistClicked}>Queue List</button>
          <button onClick={joinqueueClicked}>Join Queue</button>
        </div>

        <div className='mobile_public_btn_group'>
            <div onClick={() => setOpenmobilemenu((prev) => !prev)}><IoMenuSharp />
            {
              openmobilemenu && <div className='mobile_public_btn_group_dropdown'>
                <button onClick={queuelistClicked}>Queue List</button>
                <button onClick={joinqueueClicked}>Join Queue</button>
              </div>
            }
            </div>

        </div>
      </header>

      <section>
        {
          gerAllAdvertisementsKioskisLoading || !adminInfo?.salonId ? (
            <div className='public_carousel_item'>
              <Skeleton count={1} height={"100%"} width={"100%"} />
            </div>
          ) : (
            gerAllAdvertisementsKioskisSuccess && gerAllAdvertisementsKioskdata?.advertisements.length > 0 ? (
              <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={6000}
                showStatus={false}
                showArrows={false}
                stopOnHover={false}
              >
                {gerAllAdvertisementsKioskdata?.advertisements.map((c) => (
                  <div className='public_carousel_item'>
                    <img key={c.id} src={c.url} alt={c.alt} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className='public_carousel_item'>
                <img src='/no-image.webp' alt="no image available" />
              </div>
            )
          )
        }

        <div className={`public_icon_group ${icongroupdrop ? "public_icon_group_active" : "public_icon_group_inactive"}`}>      
          <Link to="/barbersignin"><RiAccountCircleFill /></Link>
          <Link to="/salonsignin"><IoMdSettings /></Link>
          <div onClick={logoutHandler}><TbLogout2 /></div>

          <button className='public_icon_group_arrow' onClick={() => setIcongroupdrop((prev) => !prev)}><IoIosArrowForward /></button>
        </div>
      </section>
    </main>
  )
}

export default Public


