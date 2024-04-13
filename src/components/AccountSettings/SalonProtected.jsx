import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const SalonProtected = () => {

    console.log("Protected")

    const navigate = useNavigate()

    const adminsalonsettings = localStorage.getItem("adminsalonsettings")

    console.log("adminsalonsettings",adminsalonsettings)

    useEffect(() => {
        if(adminsalonsettings === "false" || adminsalonsettings === null || adminsalonsettings === "undefined" || adminsalonsettings === undefined){
            navigate("/salonadminsignin")
        }
    },[navigate,adminsalonsettings])

    return (
        <>
        {adminsalonsettings === "true" ? <Outlet/> : "loading"}
        </>
    )
}

export default SalonProtected


// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet, useNavigate } from 'react-router-dom'
// import { selectCurrentAdminToken } from '../AdminSignin/adminauthSlice'

// const SalonProtected = () => {

//     const selectAdminSalonToken = useSelector(selectCurrentAdminToken)
//     const [showdashboard, setShowdashboard] = useState(false)

//     const navigate = useNavigate()

//     useEffect(() => {
//         if (selectAdminSalonToken === null) {
//             setShowdashboard(false)
//             navigate('/salonadminsignin')
//         } else if (selectAdminSalonToken) {
//             setShowdashboard(true)
//         }
//     }, [selectAdminSalonToken])

//     return (
//         <>
//             {showdashboard && <Outlet/>}
//         </>
//     )
// }

// export default SalonProtected


