// import React, { useEffect, useRef, useState } from 'react'
// import './Public.css'

// import { FaHome } from "react-icons/fa";
// import { IoMdSettings } from "react-icons/io";
// import { RiAccountCircleFill } from "react-icons/ri";

// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useSelector } from 'react-redux';
// import { useAdminConnectKioskMutation, useGerAllAdvertisementsKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByKioskMutation } from './publicApiSlice'
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
// import toast from 'react-hot-toast'

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { Link, useNavigate } from 'react-router-dom';

// import { IoIosArrowForward } from "react-icons/io";
// import { TbLogout, TbLogout2 } from 'react-icons/tb';
// import { IoMenuSharp } from 'react-icons/io5';

// const imagesarray = [
//   {
//     id: 1,
//     url: "https://media.istockphoto.com/id/525568423/photo/london-piccadilly-during-night.jpg?s=612x612&w=0&k=20&c=mBHnao0BnbANC1h2E-rOJ_tSviC7jTw9ir4tfp1V6uI="
//   },
//   {
//     id: 2,
//     url: "https://cdn.pixabay.com/photo/2016/03/03/10/17/social-media-1233873_1280.jpg",
//   },
//   {
//     id: 3,
//     url: "https://thumbs.dreamstime.com/b/advertising-word-cloud-business-concept-56936998.jpg"
//   }
// ]

// const Public = () => {
//   const adminInfo = useSelector(selectCurrentAdminInfo)

//   console.log("AdminInfo ", adminInfo)

//   const [salonId, setSalonId] = useState(adminInfo?.salonId)
//   const [salonName, setSalonName] = useState("")

//   const [salonLogo, setSalonLogo] = useState("")

//   const [
//     getDefaultSalonByKiosk,
//     {
//       data,
//       isSuccess,
//       isError,
//       error,
//       isLoading
//     }
//   ] = useGetDefaultSalonByKioskMutation()

//   const [
//     adminConnectKiosk,
//     {
//       data: adminConnectKioskdata,
//       isSuccess: adminConnectKioskisSuccess,
//       isError: adminConnectKioskisError,
//       error: adminConnectKioskerror,
//       isLoading: adminConnectKioskisLoading
//     }
//   ] = useAdminConnectKioskMutation()

//   const [
//     getAllSalonsByAdmin,
//     {
//       data: getAllSalonsByAdmindata,
//       isSuccess: getAllSalonsByAdminisSuccess,
//       isError: getAllSalonsByAdminisError,
//       error: getAllSalonsByAdminerror,
//       isLoading: getAllSalonsByAdminisLoading
//     }
//   ] = useGetAllSalonsByAdminMutation()

//   const [
//     gerAllAdvertisementsKiosk,
//     {
//       data: gerAllAdvertisementsKioskdata,
//       isSuccess: gerAllAdvertisementsKioskisSuccess,
//       isError: gerAllAdvertisementsKioskisError,
//       error: gerAllAdvertisementsKioskerror,
//       isLoading: gerAllAdvertisementsKioskisLoading
//     }
//   ] = useGerAllAdvertisementsKioskMutation()

//   useEffect(() => {
//     if (adminInfo?.email) {
//       const salondata = {
//         email: adminInfo?.email,
//         role: adminInfo?.role
//       }
//       getDefaultSalonByKiosk(salondata)
//       getAllSalonsByAdmin(adminInfo?.email)
//     }
//   }, [adminInfo])

//   useEffect(() => {
//     if (adminInfo && isSuccess) {
//       setSalonName(data?.response?.salonName)
//       setSalonId(data?.response?.salonId)
//       gerAllAdvertisementsKiosk(data?.response?.salonId)
//     }
//   }, [adminInfo, isSuccess])


//   useEffect(() => {
//     if (adminInfo?.role === "Barber") {
//       gerAllAdvertisementsKiosk(adminInfo?.salonId)
//     }
//   }, [adminInfo])


//   useEffect(() => {
//     if (adminConnectKioskisSuccess) {
//       window.location.reload()
//     }
//   }, [adminConnectKioskisSuccess])

//   const [dropdown, setDropdown] = useState(false)

//   const navigate = useNavigate()

//   const settingClicked = () => {
//     setDropdown(!dropdown)
//     setSalonSettingsDrop(false)
//     // navigate('/barbersignin')
//   }

//   const joinqueueClicked = () => {
//     navigate('/joinqueue')
//   }

//   const logoutHandler = () => {
//     localStorage.setItem('adminkiyoskloggin', 'false')
//     localStorage.setItem('adminkiyosktoken', '')
//     localStorage.setItem("salonSelect", "false")
//     navigate('/')
//   }

//   const [salonlistdrop, setSalonListDrop] = useState(false)

//   const salonlistHandler = () => {
//     setSalonListDrop((prev) => !prev)
//   }

//   const salonHandler = (currentsalon) => {
//     setSalonId(currentsalon.salonId)
//     setSalonName(currentsalon.salonName)
//     setSalonListDrop(false)
//   }

//   const applySalonHandler = () => {
//     if (salonId === adminInfo?.salonId) {
//       toast.error("Choose different Salon", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     } else {
//       const admindata = {
//         adminEmail: adminInfo?.email,
//         salonId
//       }

//       adminConnectKiosk(admindata)
//     }

//   }

//   const queuelistClicked = () => {
//     navigate('/queuelist')
//   }

//   const [salonsettingsdrop, setSalonSettingsDrop] = useState(false)

//   const [icongroupdrop, setIcongroupdrop] = useState(false)

//   const [openmobilemenu, setOpenmobilemenu] = useState(false)


//   let icongroupdropRef = useRef()

//   useEffect(() => {
//     let icongroupdropHandler = (e) => {
//       if (!icongroupdropRef.current.contains(e.target)) {
//         setIcongroupdrop(false)
//         console.log(!icongroupdropRef.current.contains(e.target))
//       }
//     }

//     document.addEventListener('mousedown', icongroupdropHandler)

//     return () => {
//       document.removeEventListener('mousedown', icongroupdropHandler)
//     }
//   }, [])


//   return (
//     <main className='public_conatainer'>
//       <header>
//         <div>
//           <div>
//             {
//               isLoading ? <Skeleton
//                 count={1}
//                 circle={true}
//                 borderRadius={"50%"}
//                 height={"6.5rem"}
//                 width={"6.5rem"}
//               /> : isSuccess && data?.response?.salonLogo.length > 0 ? (
//                 <img src={data.response.salonLogo[0].url} alt={data.response.salonName} />
//               ) : (
//                 <img src='/no-image.webp' alt="no image available" />
//               )
//             }
//           </div>
//           {
//             adminInfo?.role === "Barber" ? <p>{adminInfo?.salonName}</p> : <p>{data?.response?.salonName}</p>
//           }
//         </div>

//         <div><img src="/IQB-Logo.png" alt="iqb" /></div>

//         <div className='public_btn_group'>
//           <button onClick={queuelistClicked}>Queue List</button>
//           <button onClick={joinqueueClicked}>Join Queue</button>
//         </div>

//         <div className='mobile_public_btn_group'>
//           <div onClick={() => setOpenmobilemenu((prev) => !prev)}><IoMenuSharp />
//             {
//               openmobilemenu && <div className='mobile_public_btn_group_dropdown'>
//                 <button onClick={queuelistClicked}>Queue List</button>
//                 <button onClick={joinqueueClicked}>Join Queue</button>
//               </div>
//             }
//           </div>

//         </div>
//       </header>

//       <section>
//         {
//           gerAllAdvertisementsKioskisLoading || !adminInfo?.salonId ? (
//             <div className='public_carousel_item'>
//               <Skeleton count={1} height={"100%"} width={"100%"} />
//             </div>
//           ) : (
//             gerAllAdvertisementsKioskisSuccess && gerAllAdvertisementsKioskdata?.advertisements.length > 0 ? (
// <Carousel
//   showThumbs={false}
//   infiniteLoop={true}
//   autoPlay={true}
//   interval={6000}
//   showStatus={false}
//   showArrows={false}
//   stopOnHover={false}
// >
//   {gerAllAdvertisementsKioskdata?.advertisements.map((c) => (
//     <div className='public_carousel_item'>
//       <img key={c.id} src={c.url} alt={c.alt} />
//     </div>
//   ))}
// </Carousel>
//             ) : (
//               <div className='public_carousel_item'>
//                 <img src='/no-image.webp' alt="no image available" />
//               </div>
//             )
//           )
//         }

//         <div className={`public_icon_group ${icongroupdrop ? "public_icon_group_active" : "public_icon_group_inactive"}`} ref={icongroupdropRef}>
//           <Link to="/barbersignin" title="Barber Sign In"><RiAccountCircleFill /></Link>
//           <Link to="/salonsignin" title="Salon Sign In"><IoMdSettings /></Link>
//           <div onClick={logoutHandler} title="Logout"><TbLogout2 /></div>

//           {
//             !icongroupdrop && <button className='public_icon_group_arrow' onClick={() => setIcongroupdrop((prev) => !prev)}><IoIosArrowForward /></button>
//           }

//         </div>
//       </section>
//     </main>
//   )
// }

// export default Public



import React, { useEffect, useRef, useState } from 'react'
import style from './Public.module.css'

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
import { HiQueueList } from "react-icons/hi2";
import { MdJoinInner } from "react-icons/md";

const imagesarray = [
  {
    id: 1,
    url: "https://res.cloudinary.com/conferences-and-exhibitions-pvt-ltd/image/upload/v1655285681/Salon-Management/2022/June/Men/Lead_e305ap.jpg"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/conferences-and-exhibitions-pvt-ltd/image/upload/v1684950466/Review/2023/May/Rajkot/IMG_0288_xjrkw7.jpg",
  },
  {
    id: 3,
    url: "https://www.avikalp.com/cdn/shop/products/MWZ3637_wallpaper1.jpg?v=1654843622"
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


  let icongroupdropRef = useRef()

  useEffect(() => {
    let icongroupdropHandler = (e) => {
      if (!icongroupdropRef.current.contains(e.target)) {
        setIcongroupdrop(false)
        console.log(!icongroupdropRef.current.contains(e.target))
      }
    }

    document.addEventListener('mousedown', icongroupdropHandler)

    return () => {
      document.removeEventListener('mousedown', icongroupdropHandler)
    }
  }, [])

  const queuelist_data = [
    {
      id: 1,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
    {
      id: 2,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },

    {
      id: 3,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
    {
      id: 4,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },

    {
      id: 5,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
    {
      id: 6,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },


    {
      id: 7,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
    {
      id: 8,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },


    {
      id: 9,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
    {
      id: 10,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },


    {
      id: 11,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
    {
      id: 12,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },

    {
      id: 13,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
    {
      id: 14,
      qpos: 10,
      customer: "Adilson Jacinto",
      barber: "Arghya",
      ewt: 10
    },
  ]

  const [showdrop, setShowDrop] = useState(false)

  const barberlistdata = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ]

  const [themecolor, setThemeColor] = useState(false)

  return (
    <section className={style.kiyosk_dashboard_container}>
      <header className={style.kiyosk_header}
        style={{
          background: themecolor ? "#001F3F" : "#fff"
        }}
      >
        <div>
          <div><img src="https://t3.ftcdn.net/jpg/05/51/96/54/360_F_551965459_AyBWTTMk4JUhWraDeouvWLFNxvQRaPN2.jpg" alt="logo" /></div>
          <p style={{ color: themecolor ? "#fff" : "#000" }}>Unisex Hair Salon</p>
        </div>

        <div>

          <div>
            <button onClick={queuelistClicked}
              style={{
                background: themecolor ? "#3A6D8C" : "#0A84FF"
              }}
            >Queue List</button>
            <button onClick={joinqueueClicked}
              style={{
                background: themecolor ? "#3A6D8C" : "#0A84FF"
              }}
            >Join Queue</button>
          </div>

          <div onClick={() => setShowDrop((prev) => !prev)}>
            <IoMdSettings />

            {
              showdrop && <div className={style.kiyosk_dropbox}>
                <div>
                  <div><RiAccountCircleFill /></div>
                  <p>Barber Sign In</p>
                </div>

                <div>
                  <div><IoMdSettings /></div>
                  <p>Salon Sign In</p>
                </div>

                <div>
                  <div><TbLogout2 /></div>
                  <p onClick={logoutHandler}>Logout</p>
                </div>

                <div
                  onClick={queuelistClicked}
                  className={style.mobile_queuelist}
                >
                  <div><HiQueueList /></div>
                  <p>Queue List</p>
                </div>

                <div
                  onClick={joinqueueClicked}
                  className={style.mobile_joinequeue}
                >
                  <div><MdJoinInner /></div>
                  <p>Join Queue</p>
                </div>

                <div onClick={() => setThemeColor(true)}
                  style={{
                    background: themecolor ? "#efefef" : "#fff"
                  }}
                >
                  <div>1.</div>
                  <p>Theme One</p>
                </div>

                <div onClick={() => setThemeColor(false)}
                  style={{
                    background: !themecolor ? "#efefef" : "#fff"
                  }}
                >
                  <div>2.</div>
                  <p>Theme Two</p>
                </div>

              </div>
            }

          </div>
        </div>
      </header>
      <main className={style.kiyosk_body}
        style={{
          background: themecolor ? "#9ebbc9" : "#dbe9ff"
        }}
      >
        <div className={style.kiyosk_body_left}>

          <div className={style.kiyosk_body_left_top_container}>
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={6000}
              showStatus={false}
              showArrows={false}
              stopOnHover={true}
              showIndicators={true}
            >
              <div className={style.carousel_item_container}>
                <img src="https://res.cloudinary.com/conferences-and-exhibitions-pvt-ltd/image/upload/v1655285681/Salon-Management/2022/June/Men/Lead_e305ap.jpg" alt="" />
              </div>

              <div className={style.carousel_item_container}>
                <img src="https://png.pngtree.com/background/20230425/original/pngtree-upscale-hair-styling-salon-in-tokyo-for-women-by-eve-h-picture-image_2475099.jpg" alt="" />
              </div>

              <div className={style.carousel_item_container}>
                <img src="https://img.freepik.com/free-photo/interior-latino-hair-salon_23-2150555185.jpg" alt="" />
              </div>
            </Carousel>
          </div>


          <div className={style.kiyosk_body_left_bottom_container}>
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={6000}
              showStatus={false}
              showArrows={false}
              stopOnHover={true}
              showIndicators={true}
            >
              {
                barberlistdata.map((item) => {
                  return (
                    <div key={item.id}
                      className={style.barber_onlinelist_container}
                    >
                      <div className={style.barber_onlinelist_row}>
                        <div className={style.barber_online_item}>
                          <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                            <div className={style.barber_online_dot}></div>
                          </div>
                          <div>
                            <p>Adilson Jacinto</p>
                            <p>Queue Pos : 10</p>
                            <p>EWT : 15 mins</p>
                          </div>
                        </div>

                        <div className={style.barber_online_item}>
                          <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                            <div className={style.barber_online_dot}></div>
                          </div>
                          <div>
                            <p>Adilson Jacinto</p>
                            <p>Queue Pos : 10</p>
                            <p>EWT : 15 mins</p>
                          </div>
                        </div>

                        <div className={style.barber_online_item}>
                          <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                            <div className={style.barber_online_dot}></div>
                          </div>
                          <div>
                            <p>Adilson Jacinto</p>
                            <p>Queue Pos : 10</p>
                            <p>EWT : 15 mins</p>
                          </div>
                        </div>
                      </div>

                      <div className={style.barber_onlinelist_row}>
                        <div className={style.barber_online_item}>
                          <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                            <div className={style.barber_online_dot}></div>
                          </div>
                          <div>
                            <p>Adilson Jacinto</p>
                            <p>Queue Pos : 10</p>
                            <p>EWT : 15 mins</p>
                          </div>
                        </div>

                        <div className={style.barber_online_item}>
                          <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                            <div className={style.barber_online_dot}></div>
                          </div>
                          <div>
                            <p>Adilson Jacinto</p>
                            <p>Queue Pos : 10</p>
                            <p>EWT : 15 mins</p>
                          </div>
                        </div>

                        <div className={style.barber_online_item}>
                          <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                            <div className={style.barber_online_dot}></div>
                          </div>
                          <div>
                            <p>Adilson Jacinto</p>
                            <p>Queue Pos : 10</p>
                            <p>EWT : 15 mins</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

            </Carousel>


          </div>

          <div className={style.kiyosk_body_left_mobile_bottom_container}>
            <div className={style.kiyosk_body_left_barber_mobile_item}>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                <div className={style.barber_online_dot}></div>
              </div>
              <div>
                <p>Adilson Jacinto</p>
                <p>Queue Pos : 10</p>
                <p>EWT : 15 mins</p>
              </div>
            </div>
            <div className={style.kiyosk_body_left_barber_mobile_item}>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                <div className={style.barber_online_dot}></div>
              </div>
              <div>
                <p>Adilson Jacinto</p>
                <p>Queue Pos : 10</p>
                <p>EWT : 15 mins</p>
              </div>
            </div>
            <div className={style.kiyosk_body_left_barber_mobile_item}>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                <div className={style.barber_online_dot}></div>
              </div>
              <div>
                <p>Adilson Jacinto</p>
                <p>Queue Pos : 10</p>
                <p>EWT : 15 mins</p>
              </div>
            </div>
            <div className={style.kiyosk_body_left_barber_mobile_item}>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                <div className={style.barber_online_dot}></div>
              </div>
              <div>
                <p>Adilson Jacinto</p>
                <p>Queue Pos : 10</p>
                <p>EWT : 15 mins</p>
              </div>
            </div>
            <div className={style.kiyosk_body_left_barber_mobile_item}>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfD3D3cGFZ81KYSeF7HIz3dR_Eaprsch7rkQ&s" alt="img" />
                <div className={style.barber_online_dot}></div>
              </div>
              <div>
                <p>Adilson Jacinto</p>
                <p>Queue Pos : 10</p>
                <p>EWT : 15 mins</p>
              </div>
            </div>
          </div>
        </div>

        <div className={style.kiyosk_body_right}>
          <div className={style.kiyosk_queuelist_header}
            style={{
              background: themecolor ? "#3A6D8C" : "#fff"
            }}
          >
            <p style={{ color: themecolor ? "#fff" : "#000" }}>#</p>
            <p style={{ color: themecolor ? "#fff" : "#000" }}>Customer</p>
            <p style={{ color: themecolor ? "#fff" : "#000" }}>Barber</p>
            <p style={{ color: themecolor ? "#fff" : "#000" }}>EWT</p>
          </div>

          <div className={style.kiyosk_queuelist_body}>
            {
              queuelist_data.map((barber, index) => {
                return (
                  <div className={style.kiyosk_queuelist_item}
                    style={{
                      borderBottom: queuelist_data.length - 1 === index && "none"
                    }}
                  >
                    <p>{barber.qpos}</p>
                    <p>{barber.customer}</p>
                    <p>{barber.barber}</p>
                    <p>{barber.ewt} mins</p>
                  </div>
                )
              })
            }

          </div>
        </div>
      </main>
    </section>
  )
}

export default Public




//#dbe9ff my color
//#f2f4f7 fb color