// import React, { useEffect } from 'react'
// import './QueueList.css'
// import { useCancelQKiyoskMutation, useLazyGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
// import { useSelector } from 'react-redux'
// import { Link,useNavigate } from 'react-router-dom'
// import { IoMdHome } from 'react-icons/io'
// import { PiQueueBold } from 'react-icons/pi'
// import { GiCancel } from 'react-icons/gi'
// import toast from 'react-hot-toast'
// import { RiVipCrownFill } from 'react-icons/ri'

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
//     if(adminInfo){
//       useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
//     }

//   },[adminInfo])

//   const navigate = useNavigate()

//   const serverHandler = (barberId,services,_id,barberEmail) => {
//     navigate("/barberservelogn",{state: {
//       barberId,
//       services,
//       _id,
//       barberEmail
//     }})
//   }


//   const cancelHandler = (barberId,_id,barberEmail) => {
//     navigate("/cancelservelogn",{state: {
//       barberId,
//       _id,
//       barberEmail
//     }})
//   }

//   // Check if data is available and it is not loading or erroring
//   if (isSuccess && !isLoading && !isError && data) {
//     return (
//       <div className='queuelist__container__main__wrapper'>
// <Link to="/kiyosk"
//   className='homeiconClassQueue'
// ><IoMdHome /></Link>
//         <div className='queuelist__container__main'>
//           <h1>Queue List</h1>
//           {/* <pre style={{fontSize:"1.7rem",fontWeight:"500"}}>{JSON.stringify(data, null, 2)}</pre> */}
//           <div className='queuelist__container__main__container'>
//             <th>
//               <td>Name</td>
//               <td>Time Joined Q</td>
//               <td>Barber Name</td>
//               <td>Services</td>
//               <td>Method Used</td>
//               <td>Q Position</td>
//               <td>Served</td>
//               <td>Cancel</td>
//             </th>

// {
//   data.response.map((q) => (
//     <tr key={q._id}>
//       <td>{q.name}</td>
//       <td>{q.timeJoinedQ}</td>
//       <td>{q.barberName}</td>
//       <td>{q.services.map((s) => <span style={{ marginRight: "0.5rem" }} key={s._id}>{s.serviceName}</span>)}</td>
//       <td>{q.methodUsed}</td>
//       <td className='serve_type'>
// {q.serviceType === "VIP" ? <div><RiVipCrownFill /></div> : <div>
//   </div>}
// <p>{q.qPosition}</p>
//       </td>
//       <td className='que-serve' onClick={() => serverHandler(q.barberId, q.services, q._id,q.barberEmail)}>
//         <PiQueueBold />
//       </td>
//       <td className='que-cancel' onClick={() => cancelHandler(q.barberId, q._id,q.barberEmail)}>
//         <GiCancel />
//       </td>
//     </tr>
//   ))
// }

//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Handle loading and error states
//   if (isLoading) {
//     return <div style={{
//       height:"100vh",
//       width:"100%",
//       display:"flex",
//       alignItems:"center",
//       justifyContent:"center"
//     }}><h1 style={{
//       fontSize:"3rem"
//     }}>Wait QueueList is Loading...</h1></div>
//   }

//   if (isError) {
//     // return <div>Error: {error.data.message}</div>
//     return (
//       <div className='queuelist__container__main__wrapper'>
//         <Link to="/kiyosk"
//           className='homeiconClassQueue'
//         ><IoMdHome /></Link>
//         <div className='queuelist__container__main'
//         style={{display:"flex",alignItems:"center",justifyContent:"center"}}
//         >
//           <h1
//             style={{ color: "black", fontWeight: "bold", fontSize: "3rem" }}
//           >No current customers in the queueing list</h1>
//         </div>
//       </div>
//     )
//   }

//   // Default return if none of the above conditions match
//   return null;
// }

// export default QueueList;

import React, { useEffect } from 'react'
import './QueueList.css'
import { useCancelQKiyoskMutation, useLazyGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { PiQueueBold } from 'react-icons/pi'
import { GiCancel } from 'react-icons/gi'
import toast from 'react-hot-toast'
import { RiVipCrownFill } from 'react-icons/ri'
import { Grid } from 'react-loader-spinner'

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
    if (adminInfo) {
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

  // Check if data is available and it is not loading or erroring
  if (isSuccess && !isLoading && !isError && data) {
    return (
      <div className='queuelist__container__main__wrapper'>

        <Link to="/kiyosk"
          className='homeiconClassQueue'
        ><IoMdHome /></Link>

        <main className='queuelist__container__main'>
          <div className='queuelist__container__main__table_body'>
            <h1>Queue List</h1>

            <div>
              <div>
                <p>Name</p>
                <p>Join Time</p>
                <p>Barber Name</p>
                <p>Position</p>
                <p>Type</p>
                <p>Services</p>
                <p>Served</p>
                <p style={{ borderRight: "none" }}>Cancel</p>
              </div>

              <div>
                {/* Table Body */}

                {
                  data.response.map((q, i) => (
                    <div key={q._id}
                      style={{
                        borderBottom: i === data.response.length - 1 && "none"
                      }}
                    >
                      <p>{q.name}</p>
                      <p>{q.timeJoinedQ}</p>
                      <p>{q.barberName}</p>
                      <p>{q.qPosition}</p>
                      <p>
                        {q.serviceType === "VIP" ? <div
                          style={{
                            fontSize: "2rem",
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}><RiVipCrownFill /></div> : <div> -
                        </div>}
                      </p>
                      <p>{q.services.map((s) => <span style={{ marginRight: "0.5rem" }} key={s._id}>{s.serviceName}</span>)}</p>
                      <p style={{
                        color: "green",
                        fontSize: "2rem",
                        cursor: "pointer"
                      }}
                        onClick={() => serverHandler(q.barberId, q.services, q._id, q.barberEmail)}
                      ><PiQueueBold /></p>
                      <p style={{
                        borderRight: "none",
                        color: "red",
                        fontSize: "2rem",
                        cursor: "pointer"
                      }}
                        className='que-cancel' onClick={() => cancelHandler(q.barberId, q._id, q.barberEmail)}
                      ><GiCancel /></p>
                    </div>
                  ))
                }

              </div>

            </div>
          </div>
        </main>
      </div>
    )
  }

  // Handle loading and error states
  if (isLoading) {
    return <div style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}><Grid
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      /></div>
  }

  if (isError) {
    // return <div>Error: {error.data.message}</div>
    return (
      <div className='queuelist__container__main__wrapper'>
        <Link to="/kiyosk"
          className='homeiconClassQueue'
        ><IoMdHome /></Link>
        <div className='queuelist__container__main'
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <h1
            style={{ color: "black", fontWeight: "bold", fontSize: "3rem" }}
          >No current customers in the queueing list</h1>
        </div>
      </div>
    )
  }

  // Default return if none of the above conditions match
  return null;
}

export default QueueList;

