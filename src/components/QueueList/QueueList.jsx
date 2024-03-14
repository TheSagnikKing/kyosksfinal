import React from 'react'
import { useGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useSelector } from 'react-redux'

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
      <div>
        <h1>All Queue List Data :)</h1>
        <pre style={{fontSize:"1.7rem",fontWeight:"500"}}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }
  
  // Default return if none of the above conditions match
  return null;
}

export default QueueList;
