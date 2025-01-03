import React, { useEffect, useState } from 'react'
import style from './AdminSignin.module.css'
import { useNavigate } from 'react-router-dom'
import { useLoginKioskMutation, useGoogleAdminLoginKioskMutation } from './adminsigninApiSlice'
import toast from 'react-hot-toast'
import { setAdminToken } from './adminauthSlice'
import { useDispatch } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const AdminSignin = () => {

    const [role, setRole] = useState("Admin")

    const [login, {
        data,
        isSuccess,
        isError,
        isLoading,
        error
    }] = useLoginKioskMutation()


    const [
        googleAdminLoginKiosk,
        {
            data: googleAdminLoginKioskdata,
            isSuccess: googleAdminLoginKioskisSuccess,
            isError: googleAdminLoginKioskisError,
            isLoading: googleAdminLoginKioskisLoading,
            error: googleAdminLoginKioskerror
        }
    ] = useGoogleAdminLoginKioskMutation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('adminkiyosktoken', data?.token)
            localStorage.setItem('adminkiyoskloggin', 'true')
            dispatch(setAdminToken(data))
            localStorage.setItem("salonSelect", "false")
            navigate("/selectsalon")
        } else if (isError) {
            toast.error(error?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [isSuccess, isError, navigate])

    useEffect(() => {
        if (googleAdminLoginKioskisSuccess) {
            localStorage.setItem('adminkiyosktoken', googleAdminLoginKioskdata?.adminToken)
            localStorage.setItem('adminkiyoskloggin', 'true')
            dispatch(setAdminToken(googleAdminLoginKioskdata))
            navigate("/selectsalon")
        } else if (googleAdminLoginKioskisError) {
            toast.error(googleAdminLoginKioskerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [googleAdminLoginKioskisSuccess, googleAdminLoginKioskisError, navigate])

    const loginHandler = async () => {
        const data = { email, password, role }
        login(data)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            loginHandler();
        }
    };

    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className={style.admin__signin__main__container}>
            <div className={style.admin__signin__main__left}>
                <img src="/Signup.png" alt="signin" />
            </div>

            <div className={style.admin__signin__main__right}>

                <div className={style.admin_signin_form_container}>
                    <div><img src="./IQB-Logo.png" alt="iqb_logo" /></div>

                    <div className={style.email_container}>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            onKeyDown={handleKeyPress}
                        />

                    </div>

                    <div className={style.password_container}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="input_password"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
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
                                    onKeyDown={handleKeyPress}
                                />
                                <p>Admin</p>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    checked={role === "Barber" ? true : false}
                                    onChange={() => setRole("Barber")}
                                    onKeyDown={handleKeyPress}
                                />
                                <p>Barber</p>
                            </div>
                        </div>
                    </div>

                    {isLoading ? <button className={style.signin_btn}><ColorRing
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

export default AdminSignin
