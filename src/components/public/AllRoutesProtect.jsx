import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AllRoutesProtect = () => {
    const salonSelect = localStorage.getItem("salonSelect")

    return (
        <div>{salonSelect === "true" ? <Outlet /> : salonSelect === "false" && <Navigate to="/selectsalon" />}</div>
    )
}

export default AllRoutesProtect