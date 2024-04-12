import React, { useEffect } from 'react'
import './QueueList.css'
import { useCancelQKiyoskMutation, useLazyGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { PiQueueBold } from 'react-icons/pi'
import { GiCancel } from 'react-icons/gi'
import toast from 'react-hot-toast'
import { RiVipCrownFill } from 'react-icons/ri'

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
    if(adminInfo){
      useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
    }
    
  },[adminInfo])

  const navigate = useNavigate()

  const serverHandler = (barberId,services,_id) => {
    navigate("/barberservelogn",{state: {
      barberId,
      services,
      _id
    }})
  }
 

  // const cancelHandler = (barberId,_id) => {
  //   const confirm = window.confirm("Are you Sure ?")

  //   const cancelqueuedata = {
  //     salonId:adminInfo?.salonId,
  //     barberId,
  //     _id,
  //   } 
    
  //   if(confirm){
  //     cancelqueuefunction(cancelqueuedata)
  //   }
  // }

  const cancelHandler = (barberId,_id) => {
    navigate("/cancelservelogn",{state: {
      barberId,
      _id
    }})
  }

  // Check if data is available and it is not loading or erroring
  if (isSuccess && !isLoading && !isError && data) {
    return (
      <div className='queuelist__container__main__wrapper'>
        <Link to="/kiyosk"
          className='homeiconClassQueue'
        ><IoMdHome /></Link>
        <div className='queuelist__container__main'>
          <h1>Queue List</h1>
          {/* <pre style={{fontSize:"1.7rem",fontWeight:"500"}}>{JSON.stringify(data, null, 2)}</pre> */}
          <div className='queuelist__container__main__container'>
            <th>
              <td>Name</td>
              <td>Time Joined Q</td>
              <td>Barber Name</td>
              <td>Services</td>
              <td>Method Used</td>
              <td>Q Position</td>
              <td>Served</td>
              <td>Cancel</td>
            </th>

            {
              data.response.map((q) => (
                <tr key={q._id}>
                  <td>{q.name}</td>
                  <td>{q.timeJoinedQ}</td>
                  <td>{q.barberName}</td>
                  <td>{q.services.map((s) => <span style={{ marginRight: "0.5rem" }} key={s._id}>{s.serviceName}</span>)}</td>
                  <td>{q.methodUsed}</td>
                  <td className='serve_type'>
                    {q.serviceType === "VIP" ? <div><RiVipCrownFill /></div> : <div>
                      </div>}
                    <p>{q.qPosition}</p>
                  </td>
                  <td className='que-serve' onClick={() => serverHandler(q.barberId, q.services, q._id)}>
                    <PiQueueBold />
                  </td>
                  <td className='que-cancel' onClick={() => cancelHandler(q.barberId, q._id)}>
                    <GiCancel />
                  </td>
                </tr>
              ))
            }

          </div>
        </div>
      </div>
    )
  }

  // Handle loading and error states
  if (isLoading) {
    return <h1>Wait QueueList is Loading...</h1>
  }

  if (isError) {
    // return <div>Error: {error.data.message}</div>
    return (
      <div className='queuelist__container__main__wrapper'>
        <Link to="/kiyosk"
          className='homeiconClassQueue'
        ><IoMdHome /></Link>
        <div className='queuelist__container__main'
        style={{display:"flex",alignItems:"center",justifyContent:"center"}}
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
