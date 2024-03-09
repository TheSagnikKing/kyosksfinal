import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLazyAdminloggedinKioskQuery } from './adminprotectedAuthSlice'

const ProtectedRoute = () => {
    const loggedinAdmin = localStorage.getItem('adminkiyoskloggin')
    const adminkiyosktoken = localStorage.getItem('adminkiyosktoken')

    console.log(loggedinAdmin)
    console.log("admin ", adminkiyosktoken)

    const navigate = useNavigate()

    // useEffect(() => {

    // })

    const [
      adminloggedinKiosk,
      {
        isSuccess,
        data,
        isError,
        error,
        isLoading
      }
    ] = useLazyAdminloggedinKioskQuery()

    let content;

    useEffect(() => {
        if( loggedinAdmin === 'false' || loggedinAdmin === undefined || loggedinAdmin === 'undefined' || loggedinAdmin === null || !adminkiyosktoken || adminkiyosktoken === null || adminkiyosktoken === undefined || adminkiyosktoken === "undefined" || adminkiyosktoken === ""){
            localStorage.setItem("adminkiyoskloggin","false")
            navigate('/')
        }else{
          adminloggedinKiosk()
        }
    },[loggedinAdmin])

    //ar adminkiyosktoken jodi valid thake akhane && lagate hbe

  return (
    <div>{ loggedinAdmin === 'true' && adminkiyosktoken && <Outlet />}</div>
  )
}

export default ProtectedRoute