import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const loggedinAdmin = localStorage.getItem('adminkiyoskloggin')
    console.log(loggedinAdmin)

    const navigate = useNavigate()

    useEffect(() => {
        if(loggedinAdmin === 'false' || loggedinAdmin === undefined || loggedinAdmin === 'undefined' || loggedinAdmin === null){
            navigate('/')
        }
    },[loggedinAdmin])

  return (
    <div>{loggedinAdmin === 'true' && <Outlet />}</div>
  )
}

export default ProtectedRoute