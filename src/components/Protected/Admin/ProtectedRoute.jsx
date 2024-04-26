import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAdminloggedinKioskMutation } from './adminprotectedAuthSlice'
import { useDispatch } from 'react-redux'
import { setAdminCredentials, setAdminToken } from '../../AdminSignin/adminauthSlice'

const ProtectedRoute = () => {
  const loggedinAdmin = localStorage.getItem('adminkiyoskloggin')
  const adminkiyosktoken = localStorage.getItem('adminkiyosktoken')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [
    adminloggedinKiosk,
    {
      isSuccess,
      data,
      isError,
      error,
      isLoading
    }
  ] = useAdminloggedinKioskMutation()

  useEffect(() => {
    if (loggedinAdmin === 'false' || loggedinAdmin === undefined || loggedinAdmin === 'undefined' || loggedinAdmin === null || !adminkiyosktoken || adminkiyosktoken === null || adminkiyosktoken === undefined || adminkiyosktoken === "undefined" || adminkiyosktoken === "") {
      localStorage.setItem("adminkiyoskloggin", "false")
      navigate('/')
    } else if (isError) {
      if (error?.data?.message === "Invalid Admin Token" || error?.data?.message === "Forbidden Admin" || error?.data?.message === "Internal Server Error") {
        localStorage.setItem("adminkiyoskloggin","false")
        navigate('/')
      }else if(error?.data?.message === "Expired Admin Token"){
        window.location.reload()
        localStorage.setItem("adminkiyoskloggin","false")
        navigate('/')
      }
    } else if (isSuccess) {
       dispatch(setAdminCredentials(data))
    } else {
      adminloggedinKiosk(adminkiyosktoken)
    }
  }, [loggedinAdmin, adminkiyosktoken, navigate, isError,isSuccess,dispatch])

  //ar adminkiyosktoken jodi valid thake akhane && lagate hbe

  return (
    <div>{loggedinAdmin === 'true' && <Outlet />}</div>
  )
}

export default ProtectedRoute