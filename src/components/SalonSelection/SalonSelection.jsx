import React, { useEffect, useState } from 'react'
import './SalonSelection.css'
import { useAdminConnectKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByAdminKioskMutation } from '../public/publicApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useNavigate } from 'react-router-dom'
import { DropdownIcon } from '../../icons'


const SalonSelection = () => {

    const navigate = useNavigate()

    const [salonId, setSalonId] = useState("")
    const [salonName, setSalonName] = useState("")
    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [
        getDefaultSalonByAdminKiosk,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        }
    ] = useGetDefaultSalonByAdminKioskMutation()

    const [
        adminConnectKiosk,
        {
            data: adminConnectKioskdata,
            isSuccess: adminConnectKioskisSuccess,
            isError: adminConnectKioskisError,
            error: adminConnectKioskerror,
            isLoading: adminConnectKioskisLoading
        }
    ] = useAdminConnectKioskMutation()

    const [
        getAllSalonsByAdmin,
        {
            data: getAllSalonsByAdmindata,
            isSuccess: getAllSalonsByAdminisSuccess,
            isError: getAllSalonsByAdminisError,
            error: getAllSalonsByAdminerror,
            isLoading: getAllSalonsByAdminisLoading
        }
    ] = useGetAllSalonsByAdminMutation()


    useEffect(() => {
        if (adminInfo?.email) {
            getDefaultSalonByAdminKiosk(adminInfo?.email)
            getAllSalonsByAdmin(adminInfo?.email)
        }
    }, [adminInfo])

    useEffect(() => {
        if (adminInfo && isSuccess) {
            setSalonName(data?.response?.salonName)
            setSalonId(data?.response?.salonId)
        }
    }, [adminInfo, isSuccess])

    useEffect(() => {
        if (adminConnectKioskisSuccess) {
            localStorage.setItem("salonSelect", "true")
            navigate('/kiyosk')
            window.location.reload()
        }
    }, [adminConnectKioskisSuccess, navigate])


    const [salonlistdrop, setSalonListDrop] = useState(false)

    const salonlistHandler = () => {
        setSalonListDrop((prev) => !prev)
    }

    const salonHandler = (currentsalon) => {
        setSalonId(currentsalon.salonId)
        setSalonName(currentsalon.salonName)
        setSalonListDrop(false)
    }

    const applySalonHandler = () => {

        const admindata = {
            adminEmail: adminInfo?.email,
            salonId
        }

        adminConnectKiosk(admindata)
    }

    return (
        <main className='selectSalonContainer'>
            <div className='selectSalonContent'>
                <h1>Select Salon <span>{salonName !== "" && salonName}</span></h1>
                <div className='salonlistdropdown__box'>
                    <div onClick={salonlistHandler}>
                        <p>{salonName !== "" && salonName}</p>
                        <div><DropdownIcon /></div>
                    </div>

                    {salonlistdrop && (
                        <div className='salonlistdropdown__box__content'>
                            {getAllSalonsByAdmindata?.salons?.length > 0 &&
                                getAllSalonsByAdmindata?.salons.map((s, i) => (
                                    <div key={s._id} onClick={() => salonHandler(s)}
                                        style={{
                                            backgroundColor: salonName === s.salonName ? "var(--quarterny-color)" : "",
                                            borderBottom: i === getAllSalonsByAdmindata?.salons.length - 1 && "1px solid #00000079",
                                            borderTop: i === 0 && "none"
                                        }}
                                    ><p style={{
                                        color: salonName === s.salonName ? "var(--secondary-color)" : "var(--primary-color)"
                                    }}>{s.salonName}</p></div>
                                ))
                            }
                        </div>
                    )}
                </div>

                {Object.keys(adminInfo).length > 0 && <div onClick={applySalonHandler} className='applySalonClass'><p>Apply</p></div>}
            </div>
        </main>
    )
}

export default SalonSelection



// import React, { useEffect, useState } from 'react'

// const SalonSelection = () => {
//     const [content, setContent] = useState(null);
//     const [salonSelect, setSalonSelect] = useState(localStorage.getItem("salonSelect"));

// useEffect(() => {
//     if (salonSelect === "true") {
//         setContent(<h1>True</h1>);
//     } else if (salonSelect === "loggedin") {
//         setContent(<h1>Logged In</h1>);
//     } else if (salonSelect === "false") {
//         setContent(<h1>False</h1>);
//     } else {
//         setContent(<h1>Yessss</h1>);
//     }
// }, [salonSelect]);

//     return content
// }

// export default SalonSelection;