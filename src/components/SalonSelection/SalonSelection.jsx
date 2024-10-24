import React, { useEffect, useState } from 'react'
import style from './SalonSelection.module.css'
import { useAdminConnectKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useNavigate } from 'react-router-dom'
import { DropdownIcon } from '../../icons'
import { toast } from 'react-hot-toast';
import { IoMdArrowDropdownCircle } from 'react-icons/io'
import { ColorRing } from 'react-loader-spinner'
import { ClickAwayListener } from '@mui/material'

const SalonSelection = () => {

    const navigate = useNavigate()

    const [salonId, setSalonId] = useState("")
    const [salonName, setSalonName] = useState("")
    const adminInfo = useSelector(selectCurrentAdminInfo)

    console.log(adminInfo)

    const [
        getDefaultSalonByKiosk,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        }
    ] = useGetDefaultSalonByKioskMutation()

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
            const salondata = {
                email: adminInfo?.email,
                role: adminInfo?.role
            }
            getDefaultSalonByKiosk(salondata)
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


    useEffect(() => {
        if (adminInfo && adminInfo?.salonId === 0) {
            localStorage.setItem('adminkiyoskloggin', 'false')
            localStorage.setItem('adminkiyosktoken', 'null')
            localStorage.setItem('salonSelect', 'false')
            navigate('/')
            toast.error("Salon is not Present", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [adminInfo])


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

        if (salonId !== "") {
            adminConnectKiosk(admindata)
        } else {
            alert("Salon Id cannot be empty")
        }

    }


    console.log(getAllSalonsByAdmindata?.salons?.length)

    const continueHandler = () => {
        localStorage.setItem("salonSelect", "true")
        navigate('/kiyosk')
        window.location.reload()
    }

    return (
        <main className={style.select_salon_container}>
            <div className={style.select_salon_container_left}>
                <img src="./Forgot_Password.png" alt="salon_selection_img" />
            </div>

            <div className={style.select_salon_container_right}>
                <div className={style.salon_selection_container}>
                    {
                        adminInfo?.role === "Barber" ? <p style={{ textAlign: "center" }}>Welcome Back {adminInfo?.name} !</p> : <p>Welcome Back {adminInfo?.name} !</p>
                    }

                    <div className={style.selection_box_container}>
                        {
                            adminInfo?.role === "Barber" ? <p style={{ textAlign: "center" }}>Selected Salon, &nbsp;<span>{adminInfo?.salonName}</span></p> : adminInfo?.role === "Admin" ? <p>Selected Salon, &nbsp;<span>{salonName !== "" && salonName}</span></p> : null
                        }
                        {
                            adminInfo?.role === "Barber" ? null : adminInfo?.role === "Admin" ? <div>
                                <ClickAwayListener onClickAway={() => setSalonListDrop(false)}>
                                    <div>
                                        <p>{salonName !== "" && salonName}</p>
                                        <div onClick={() => setSalonListDrop((prev) => (!prev))}><IoMdArrowDropdownCircle /></div>


                                        {salonlistdrop && <main
                                            className={style.salondropdown_box}
                                            style={{
                                                height: getAllSalonsByAdmindata?.salons?.length > 0 && getAllSalonsByAdmindata?.salons?.length <= 4 ? "auto" : "20rem",
                                            }}
                                        >
                                            {getAllSalonsByAdmindata?.salons?.length > 0 &&
                                                getAllSalonsByAdmindata?.salons.map((s, i) => (
                                                    <div key={s._id} onClick={() => salonHandler(s)}
                                                        style={{
                                                            backgroundColor: salonName === s.salonName ? "#0A84FF" : "",
                                                            borderBottom: i === getAllSalonsByAdmindata?.salons.length - 1 ? "none" : "1px solid #00000",
                                                            borderTop: i === 0 && "none"
                                                        }}
                                                    ><p style={{
                                                        color: salonName === s.salonName && "#fff"
                                                    }}>{s.salonName}</p></div>
                                                ))
                                            }
                                        </main>}
                                    </div>
                                </ClickAwayListener>
                            </div> : null
                        }

                        {
                            adminInfo?.role === "Barber" ? <button onClick={continueHandler} className={style.salon_selection_btn}>Continue</button> : adminInfo?.role === "Admin" ? Object.keys(adminInfo).length > 0 && adminConnectKioskisLoading ? <button className={style.salon_selection_btn}><ColorRing
                                visible={true}
                                height="4rem"
                                width="4rem"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            /></button> : <button onClick={applySalonHandler} className={style.salon_selection_btn}>Apply</button> : null
                        }

                    </div>
                </div>
            </div>
        </main>
    )
}

export default SalonSelection

