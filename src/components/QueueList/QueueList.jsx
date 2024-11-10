// import React, { useEffect } from 'react'
// import './QueueList.css'
// import { useCancelQKiyoskMutation, useLazyGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { IoMdHome } from 'react-icons/io'
// import { PiQueueBold } from 'react-icons/pi'
// import { GiCancel } from 'react-icons/gi'
// import { RiVipCrownFill } from 'react-icons/ri'
// import { Grid } from 'react-loader-spinner'

// const QueueList = () => {

//   const adminInfo = useSelector(selectCurrentAdminInfo)

//   const [
//     useLazyGetQlistBySalonIdKioskfunc,
//     {
//       data,
//       isSuccess,
//       isError,
//       error,
//       isLoading
//     }
//   ] = useLazyGetQlistBySalonIdKioskQuery()

//   useEffect(() => {
//     if (adminInfo) {
//       useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
//     }

//   }, [adminInfo])

//   const navigate = useNavigate()

//   const serverHandler = (barberId, services, _id, barberEmail) => {
//     navigate("/barberservelogn", {
//       state: {
//         barberId,
//         services,
//         _id,
//         barberEmail
//       }
//     })
//   }


//   const cancelHandler = (barberId, _id, barberEmail) => {
//     navigate("/cancelservelogn", {
//       state: {
//         barberId,
//         _id,
//         barberEmail
//       }
//     })
//   }


//   if (isSuccess && !isLoading && !isError && data) {
//     return (
//       <div className='queuelist__container__main__wrapper'>

//         <Link to="/kiyosk"
//           className='homeiconClassQueue'
//         ><IoMdHome /></Link>

//         <main className='queuelist__container__main'>
//           <div className='queuelist__container__main__table_body'>
//             <h1>Queue List</h1>

//             <div>
//               <div>
//                 <p>Name</p>
//                 <p>Join Time</p>
//                 <p>Barber Name</p>
//                 <p>Position</p>
//                 <p>Type</p>
//                 <p>Services</p>
//                 <p>Served</p>
//                 <p style={{ borderRight: "none" }}>Cancel</p>
//               </div>

//               <div>

//                 {
//                   data.response.map((q, i) => (
//                     <div key={q._id}
//                       style={{
//                         borderBottom: i === data.response.length - 1 && "none"
//                       }}
//                     >
//                       <p>{q.name}</p>
//                       <p>{q.timeJoinedQ}</p>
//                       <p>{q.barberName}</p>
//                       <p>{q.qPosition}</p>
//                       <p>
//                         {q.serviceType === "VIP" ? <div
//                           style={{
//                             fontSize: "2rem",
//                             height: "100%",
//                             width: "100%",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center"
//                           }}><RiVipCrownFill /></div> : <div> -
//                         </div>}
//                       </p>
//                       <p>{q.services.map((s) => <span style={{ marginRight: "0.5rem" }} key={s._id}>{s.serviceName}</span>)}</p>
//                       <p style={{
//                         color: "green",
//                         fontSize: "2rem",
//                         cursor: "pointer",
//                       }}
//                         onClick={() => serverHandler(q.barberId, q.services, q._id, q.barberEmail)}
//                       ><PiQueueBold /></p>
//                       <p style={{
//                         borderRight: "none",
//                         color: "red",
//                         fontSize: "2rem",
//                         cursor: "pointer"
//                       }}
//                         className='que-cancel' onClick={() => cancelHandler(q.barberId, q._id, q.barberEmail)}
//                       ><GiCancel /></p>
//                     </div>
//                   ))
//                 }

//               </div>

//             </div>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   if (isLoading) {
//     return <div style={{
//       height: "100vh",
//       width: "100%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center"
//     }}><Grid
//         visible={true}
//         height="80"
//         width="80"
//         color="#4fa94d"
//         ariaLabel="grid-loading"
//         radius="12.5"
//         wrapperStyle={{}}
//         wrapperClass="grid-wrapper"
//       /></div>
//   }

//   if (isError) {
//     return (
//       <div className='queuelist__container__main__wrapper'>
//         <Link to="/kiyosk"
//           className='homeiconClassQueue'
//         ><IoMdHome /></Link>
//         <div className='queuelist__container__main_error'
//           style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//         >
//           <h1
//             style={{ color: "black", fontWeight: "bold", fontSize: "3rem" }}
//           >No queuelist available</h1>
//         </div>
//       </div>
//     )
//   }

//   return null;
// }

// export default QueueList;

import React, { useEffect, useState } from 'react'
import style from './QueueList.module.css'
import { useCancelQKiyoskMutation, useLazyGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { PiQueueBold } from 'react-icons/pi'
import { GiCancel } from 'react-icons/gi'
import { RiVipCrownFill } from 'react-icons/ri'
import { ColorRing, Grid } from 'react-loader-spinner'
import CommonHeader from '../CommonHeader/CommonHeader'
import Skeleton from 'react-loading-skeleton'

const QueueList = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [
    useLazyGetQlistBySalonIdKioskfunc,
    {
      data,
      isSuccess,
      isError,
      error,
      isLoading
    }
  ] = useLazyGetQlistBySalonIdKioskQuery()

  useEffect(() => {
    if (adminInfo && adminInfo?.salonId) {
      useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
    }

  }, [adminInfo])

  const navigate = useNavigate()

  const serverHandler = (barberId, services, _id, barberEmail) => {
    navigate("/barberservelogn", {
      state: {
        barberId,
        services,
        _id,
        barberEmail
      }
    })
  }


  const cancelHandler = (barberId, _id, barberEmail) => {
    navigate("/cancelservelogn", {
      state: {
        barberId,
        _id,
        barberEmail
      }
    })
  }

  const [themecolor, setThemeColor] = useState(false)

  const dummyqueuelist_data = [
    {
      id: 1,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
    {
      id: 2,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
    {
      id: 3,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
    {
      id: 4,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },

    {
      id: 5,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
    {
      id: 6,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },

    {
      id: 7,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
    {
      id: 8,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },

    {
      id: 9,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
    {
      id: 10,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },


    {
      id: 11,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },

    {
      id: 12,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
    {
      id: 13,
      name: "Adilson",
      join: "18:43:07",
      barberName: "Arghya",
      position: 10,
      type: "vip",
      services: "hair"
    },
  ]

  return (
    <>
      <CommonHeader
        themecolor={themecolor}
        setThemeColor={setThemeColor}
      />
      <section className={style.queuelist_container}>
        <p>Queue List</p>
        <main className={style.queuelist_table}>
          <header className={style.queuelist_table_header}>
            {/* <p>#</p> */}
            <p>Name</p>
            <p>Join Time</p>
            <p>Barber</p>
            <p>Position</p>
            <p>Type</p>
            <p>Services</p>
            <p>Serve</p>
            <p>Cancel</p>
          </header>

          {isLoading ? (
            <div className={style.queuelist_loading}>
              <div className={style.skeleton} style={{ height: "6.5rem" }}></div>
              <div className={style.skeleton} style={{ height: "6.5rem" }}></div>
              <div className={style.skeleton} style={{ height: "6.5rem" }}></div>
              <div className={style.skeleton} style={{ height: "6.5rem" }}></div>
              <div className={style.skeleton} style={{ height: "6.5rem" }}></div>
              <div className={style.skeleton} style={{ height: "6.5rem" }}></div>
            </div>
          )
            : isSuccess && data?.response?.length > 0 ? (
              data?.response?.map((item, index) => {
                return (
                  <div
                    className={style.queuelist_table_item}
                    key={item?._id}
                    style={{
                      borderBottom: data?.response?.length - 1 === index && "none"
                    }}
                  >
                    {/* <p>{item?.barberId}</p> */}
                    <p>{item?.name}</p>
                    <p>{item?.timeJoinedQ}</p>
                    <p>{item?.barberName}</p>
                    <p>{item?.qPosition}</p>
                    <p>
                      {item?.serviceType === "VIP" ? <div
                        style={{
                          fontSize: "2rem",
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}><RiVipCrownFill /></div> : <div> -
                      </div>}
                    </p>
                    <p>{item?.services?.[0]?.serviceName} {item?.services?.length - 1 === 0 ? null : <span>+ {item?.services?.length - 1} more</span>}</p>
                    <div><button
                      style={{
                        background: "#0a84ff"
                      }}
                      onClick={() => serverHandler(item?.barberId, item?.services, item?._id, item?.barberEmail)}
                    >serve</button></div>
                    <div><button
                      style={{
                        background: "red"
                      }}
                      onClick={() => cancelHandler(item?.barberId, item?._id, item?.barberEmail)}
                    >cancel</button></div>
                  </div>
                )
              })
            )
              :
              <div className={style.queuelist_error}>
                <p>No queuelist available</p>
              </div>
          }


        </main >
      </section >
    </>
  )
}

export default QueueList;

