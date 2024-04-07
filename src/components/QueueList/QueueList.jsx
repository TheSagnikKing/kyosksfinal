import React from 'react'
import './QueueList.css'
import { useGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'

const QueueList = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  const {
    data,
    isSuccess,
    isError,
    error,
    isLoading
  } = useGetQlistBySalonIdKioskQuery(adminInfo?.salonId)

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
              <td>Q Position</td>
              <td>Method Used</td>
              <td>Services</td>
            </th>

            {
              data.response.map((q) => (
                <tr>
                  <td>{q.name}</td>
                  <td>{q.timeJoinedQ}</td>
                  <td>{q.barberName}</td>
                  <td>{q.qPosition}</td>
                  <td>{q.methodUsed}</td>
                  <td>{q.services.map((s) => <span style={{ marginRight: "0.5rem" }}>{s.serviceName}</span>)}</td>
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
          style={{color:"red",fontWeight:"bold",fontSize:"3rem"}}
          >No QueueList Available</h1>
        </div>
      </div>
    )
  }

  // Default return if none of the above conditions match
  return null;
}

export default QueueList;
