import React, { useEffect } from 'react'
import './QueueList.css'
import { useBarberServedQueueMutation, useGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { PiQueueBold } from 'react-icons/pi'
import { GiCancel } from 'react-icons/gi'
import toast from 'react-hot-toast'

const QueueList = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  // console.log(adminInfo)

  const {
    data,
    isSuccess,
    isError,
    error,
    isLoading
  } = useGetQlistBySalonIdKioskQuery(adminInfo?.salonId)


  const [
    servequeuefunction,
    {
      data:servequeuedata,
      isSuccess:serverqueueisSuccess,
      isError:servequeueisError,
      error:servequeueError,
      isLoading:servequeueisLoading
    }
  ] = useBarberServedQueueMutation()

  useEffect(() => {
    if(servequeueisError){
      toast.error(servequeueError?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  },[servequeueisError])


  useEffect(() => {
    if(serverqueueisSuccess){
      toast.success(servequeuedata.message, {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      window.location.reload()
    }
  },[serverqueueisSuccess])

  const serverHandler = (barberId,services,_id) => {
    const confirm = window.confirm("Are you Sure ?")

    const queueData = {
      salonId:adminInfo?.salonId,
      barberId,
      _id,
      services
    }

    if(confirm){
      servequeuefunction(queueData)
    }

  }

  const cancelHandler = () => {
    const confirm = window.confirm("Are you Sure ?")

    if(confirm){

    }
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
              <td>Cencel</td>
            </th>

            {
              data.response.map((q) => (
                <tr key={q._id}>
                  <td>{q.name}</td>
                  <td>{q.timeJoinedQ}</td>
                  <td>{q.barberName}</td>
                  <td>{q.services.map((s) => <span style={{ marginRight: "0.5rem" }}>{s.serviceName}</span>)}</td>
                  <td>{q.methodUsed}</td>
                  <td>{q.qPosition}</td>
                  <td className='que-serve' onClick={() => serverHandler(q.barberId, q.services, q._id)}>
                    <PiQueueBold />
                  </td>
                  <td className='que-cancel' onClick={() => cancelHandler()}>
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
        <div className='queuelist__container__main'>
          <h1
            style={{ color: "red", fontWeight: "bold", fontSize: "3rem" }}
          >No QueueList Available</h1>
        </div>
      </div>
    )
  }

  // Default return if none of the above conditions match
  return null;
}

export default QueueList;
