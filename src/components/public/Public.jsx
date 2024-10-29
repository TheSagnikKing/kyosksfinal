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

// useEffect(() => {
//   if (adminInfo?.email) {
//     const salondata = {
//       email: adminInfo?.email,
//       role: adminInfo?.role
//     }
//     getDefaultSalonByKiosk(salondata)
//     getAllSalonsByAdmin(adminInfo?.email)
//   }
// }, [adminInfo])

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
// {
//   isLoading ? <Skeleton
//     count={1}
//     circle={true}
//     borderRadius={"50%"}
//     height={"6.5rem"}
//     width={"6.5rem"}
//   /> : isSuccess && data?.response?.salonLogo.length > 0 ? (
//     <img src={data.response.salonLogo[0].url} alt={data.response.salonName} />
//   ) : (
//     <img src='/no-image.webp' alt="no image available" />
//   )
// }
//           </div>
// {
//   adminInfo?.role === "Barber" ? <p>{adminInfo?.salonName}</p> : <p>{data?.response?.salonName}</p>
// }
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
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from 'react-redux';
import { useAdminConnectKioskMutation, useGerAllAdvertisementsKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByKioskMutation, useLazyGetAllBarbersBySalonIdQuery } from './publicApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import toast from 'react-hot-toast'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom';
import { useLazyGetQlistBySalonIdKioskQuery } from '../QueueList/QueueApiSlice';
import CommonHeader from '../CommonHeader/CommonHeader';

const Public = () => {
  const adminInfo = useSelector(selectCurrentAdminInfo)

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


  const [salonsettingsdrop, setSalonSettingsDrop] = useState(false)



  const [openmobilemenu, setOpenmobilemenu] = useState(false)



  const queuelist_data2 = [
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
    // {
    //   id: 10,
    //   qpos: 10,
    //   customer: "Adilson Jacinto",
    //   barber: "Arghya",
    //   ewt: 10,
    // }
  ]



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

  const [
    useLazyGetQlistBySalonIdKioskfunc,
    {
      data: queuelist_data,
      isSuccess: queuelist_success,
      isError: queuelist_isError,
      error: queuelist_error,
      isLoading: queuelist_isLoading
    }
  ] = useLazyGetQlistBySalonIdKioskQuery()

  useEffect(() => {
    if (adminInfo && adminInfo?.salonId) {
      useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
    }

  }, [adminInfo])


  console.log("QUEUELIST DATA s", queuelist_data)

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 0px) and (max-width: 884px)');

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);


  const [
    useLazyGetAllBarbersBySalonIdKioskQuery,
    {
      data: allbarbersdata,
      isSuccess: allbarbersdata_isSuccess,
      isError: allbarbersdata_isError,
      error: allbarbersdata_error,
      isLoading: allbarbersdata_isLoading
    }
  ] = useLazyGetAllBarbersBySalonIdQuery()

  useEffect(() => {
    if (adminInfo && adminInfo?.salonId) {
      useLazyGetAllBarbersBySalonIdKioskQuery(adminInfo?.salonId)
    }

  }, [adminInfo])


  console.log("jkdbvkhsdbv ", allbarbersdata)

  // console.log("isMobile ", isMobile)

  const [barberlist_pages, setBarberlist_pages] = useState(0)

  useEffect(() => {
    setBarberlist_pages(Math.ceil(allbarbersdata?.getAllBarbers?.length / 6))
  }, [allbarbersdata])

  console.log(barberlist_pages)

  const chunkArray = (array, chunkSize) => {
    const chunks = [];

    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const barberChunks = chunkArray(allbarbersdata?.getAllBarbers || [], 6);

  return (
    <section className={style.kiyosk_dashboard_container}>

      <CommonHeader
        themecolor={themecolor}
        setThemeColor={setThemeColor}
      />


      <main className={style.kiyosk_body}
        style={{
          background: themecolor ? "#9ebbc9" : "#dbe9ff"
        }}
      >
        <div className={style.kiyosk_body_left}>

          <div className={style.kiyosk_body_left_top_container}>

            {
              gerAllAdvertisementsKioskisLoading ?
                (<div className={style.carousel_item_container}>
                  <Skeleton count={1} height={"100%"} width={"100%"} style={{ borderRadius: "6px" }} />
                </div>) :
                gerAllAdvertisementsKioskisSuccess && gerAllAdvertisementsKioskdata?.advertisements.length > 0 ?
                  (<Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={4000}
                    showStatus={false}
                    showArrows={false}
                    stopOnHover={true}
                    showIndicators={true}
                  >
                    {
                      gerAllAdvertisementsKioskdata?.advertisements?.map((advertisement) => {
                        return (
                          <div className={style.carousel_item_container} key={advertisement._id}>
                            <img src={advertisement.url} alt="kyosk_images" />
                          </div>
                        )
                      })
                    }
                  </Carousel>) :
                  (<div className={style.carousel_item_container_error}>
                    <img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="no_image" />
                  </div>)
            }

          </div>


          <div className={style.kiyosk_body_left_bottom_container}>

            {
              allbarbersdata_isLoading ? (<div className={style.barber_onlinelist_container_loader}
              >
                <div className={style.barber_onlinelist_row_loader}>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "6px", boxShadow: "0px 1px 6px rgba(0,0,0,0.1)" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "6px", boxShadow: "0px 1px 6px rgba(0,0,0,0.1)" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "6px", boxShadow: "0px 1px 6px rgba(0,0,0,0.1)" }} /></div>

                </div>
                <div className={style.barber_onlinelist_row_loader}>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "6px", boxShadow: "0px 1px 6px rgba(0,0,0,0.1)" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "6px", boxShadow: "0px 1px 6px rgba(0,0,0,0.1)" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "6px", boxShadow: "0px 1px 6px rgba(0,0,0,0.1)" }} /></div>
                </div>
              </div>) : !allbarbersdata_isLoading && allbarbersdata_isSuccess && barberlist_pages > 0 ? (<Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={4000}
                showStatus={false}
                showArrows={false}
                stopOnHover={true}
                showIndicators={true}
              >

                {
                  Array.from({ length: barberlist_pages }).map((_, containerIndex) => (
                    <div key={containerIndex}
                      className={style.barber_onlinelist_container}>
                      {barberChunks[containerIndex]?.map((item, itemIndex) => (
                        <div className={style.barber_online_item}
                          style={{
                            borderLeft: item.isOnline ? "5px solid limegreen" : "5px solid red"
                          }}
                          key={item._id}
                        >
                          <div>
                            <img src={item?.profile?.[0]?.url} alt="img" />
                            <div className={style.barber_online_dot}
                              style={{
                                backgroundColor: item.isOnline ? "limegreen" : "red"
                              }}
                            ></div>
                          </div>
                          <div>
                            <p>{item.name}</p>
                            <p>Queue Count : {item.queueCount}</p>
                            <p>EWT : {item.barberEWT} mins</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                }

              </Carousel>) : null
            }


          </div>

          <div className={style.kiyosk_body_left_mobile_bottom_container}>

            {
              allbarbersdata_isLoading ? (
                <>
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "6px" }} />
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "6px" }} />
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "6px" }} />
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "6px" }} />
                </>
              ) : allbarbersdata_isSuccess && allbarbersdata?.getAllBarbers?.length > 0 ? (<>

                {
                  allbarbersdata?.getAllBarbers?.map((item) => {
                    return (
                      <div className={style.kiyosk_body_left_barber_mobile_item}
                        key={item?._id}
                        style={{
                          borderLeft: item?.isOnline ? "5px solid limegreen" : "5px solid red"
                        }}
                      >
                        <div>
                          <img src={item?.profile?.[0]?.url} alt="img" />
                          <div className={style.barber_online_dot}
                            style={{
                              background: item?.isOnline ? "limegreen" : "red"
                            }}
                          ></div>
                        </div>
                        <div>
                          <p>{item?.name?.length > 12 ? item?.name.slice(0, 12) + "..." : item?.name}</p>
                          <p>Queue Count : {item?.queueCount}</p>
                          <p>EWT : {item?.barberEWT} mins</p>
                        </div>
                      </div>
                    )
                  })
                }

              </>) : null
            }

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

          {
            queuelist_isLoading ?
              (<div className={style.kiyosk_queuelist_body_isLoading}>
                <Skeleton count={isMobile ? 5 : 10} style={{ height: isMobile ? "8rem" : "6rem", borderBottom: "1px solid rgba(0,0,0,0.2)" }} />
              </div>) :
              queuelist_success && queuelist_data?.response?.length > 0 ?
                (<div className={style.kiyosk_queuelist_body}>
                  {
                    queuelist_data?.response?.map((queue, index) => {
                      return (
                        <div className={style.kiyosk_queuelist_item}
                          style={{
                            borderBottom: queuelist_data?.response?.length - 1 === index && "none"
                          }}
                          key={queue._id}
                        >
                          <p>{queue.qPosition}</p>
                          <p>{queue.name}</p>
                          <p>{queue.barberName}</p>
                          <p>{queue.serviceEWT} mins</p>
                        </div>
                      )
                    })
                  }
                </div>) :
                (<div className={style.kiyosk_queuelist_body_error}>
                  <p>No queuelist available</p>
                </div>)
          }

        </div>
      </main>
    </section>
  )
}

export default Public




//#dbe9ff my color
//#f2f4f7 fb color