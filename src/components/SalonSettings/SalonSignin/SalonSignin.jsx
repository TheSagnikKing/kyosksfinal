import React, { useEffect, useState } from 'react'
import style from './SalonSignin.module.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useLoginKioskMutation, useGoogleAdminLoginKioskMutation } from '../../AdminSignin/adminsigninApiSlice'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { useSalonAccountLoginMutation } from '../salonSlice'

const SalonSignin = () => {

    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Admin")

    const navigate = useNavigate()

    const [
        salonAccountLogin,
        {
            data: salonlogindata,
            isSuccess: salonloginisSuccess,
            isError: salonloginisError,
            error: salonloginerror,
            isLoading: salonloginisLoading
        }
    ] = useSalonAccountLoginMutation()


    useEffect(() => {
        if (salonloginisSuccess) {
            localStorage.setItem("adminsalonsettings", "true")
            navigate("/salonsettings")
        } else if (salonloginisError) {
            toast.error(salonloginerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [salonloginisSuccess, salonloginisError, navigate])

    const loginHandler = async () => {
        const data = { email, password, role, salonId: adminInfo?.salonId }
        console.log(data)

        salonAccountLogin(data)

    }

    const [showPassword, setShowPassword] = useState(false)


    return (
        <main className={style.admin__salon_signin__main__container}>
            <div className={style.admin__salon_signin__main__left}>
                <img src="./Signup.png" alt="signin" />
            </div>

            <div className={style.admin__salon_signin__main__right}>

                <div className={style.admin_salon_signin_form_container}>
                    <p>Welcome to Salon Sign-In</p>

                    <div className={style.email_container}>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                        />

                    </div>

                    <div className={style.password_container}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="input_password"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</div>
                    </div>

                    <div className={style.rolediv}>
                        <div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={role === "Admin" ? true : false}
                                    onChange={() => setRole("Admin")}
                                />
                                <p>Admin</p>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    checked={role === "Barber" ? true : false}
                                    onChange={() => setRole("Barber")}
                                />
                                <p>Barber</p>
                            </div>
                        </div>
                    </div>

                    {salonloginisLoading ? <button className={style.signin_btn}><ColorRing
                        visible={true}
                        height="4rem"
                        width="4rem"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    /></button> : <button onClick={loginHandler}
                        className={style.signin_btn}
                    >Sign in</button>}
                </div>

            </div>
        </main>
    )
}

export default SalonSignin
