import React, { useEffect, useState } from 'react'
import './SalonSignin.css'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'
import { ColorRing } from 'react-loader-spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

import { useAdminLoginKioskMutation, useGoogleAdminLoginKioskMutation } from '../../AdminSignin/adminsigninApiSlice'
import { selectCurrentAdminInfo, setAdminCredentials } from '../../AdminSignin/adminauthSlice'
import { IoMdHome } from 'react-icons/io'
import { useSalonAccountLoginMutation } from '../salonSlice'


const SalonSignin = () => {

    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [adminlogin, {
        data,
        isSuccess,
        isError,
        isLoading,
        error
    }] = useAdminLoginKioskMutation()


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
    const [role, setRole] = useState("Admin")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            // localStorage.setItem("adminsalonsettings", "true")
            // navigate("/accountsettings")
        } else if (isError) {
            toast.error(error?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [isSuccess, isError, navigate])

    useEffect(() => {
        if (googleAdminLoginKioskisSuccess) {
            localStorage.setItem("adminsalonsettings", "true")
            navigate("/accountsettings")
        } else if (googleAdminLoginKioskisError) {
            toast.error(googleAdminLoginKioskerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [googleAdminLoginKioskisSuccess, googleAdminLoginKioskisError, navigate])

    const [
        salonAccountLogin,
        {
            data:salonlogindata,
            isSuccess:salonloginisSuccess,
            isError:salonloginisError,
            error:salonloginerror,
            isLoading:salonloginisLoading
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
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [salonloginisSuccess, salonloginisError, navigate])

    const loginHandler = async () => {
        const admindata = { email, password, role,salonId:adminInfo?.salonId }
        console.log(admindata)

        salonAccountLogin(admindata)

        // adminlogin(admindata)

        // const {data} = await axios.post('https://iqb-kiosk.onrender.com/kiosk/adminLoginKiosk',admindata)
        // console.log(data)

    }



    const responseMessage = async (response) => {
        console.log(response.credential)
        googleAdminLoginKiosk(response.credential)
    };

    const errorMessage = (error) => {
        console.log(error);
    };

    const [screenwidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className='admin__signin__main__container'>
            <div className='admin__signin__main__left'>
                <img src="/signin.png" alt="joinqueue" />
            </div>

            <div className='admin__signin__main__right'>
                <h1>Salon Signin</h1>

                <Link to="/kiyosk"
                    className='salonicon'
                ><IoMdHome /></Link>

                <div className='admin__signin__main__form'>

                    <div>
                        <h1>Email</h1>

                        <div>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter Your Email'
                            />
                        </div>

                    </div>

                    <div className='password_field'>
                        <h1>Password</h1>

                        <div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</div>
                        </div>
                    </div>

                    <div className='rolediv'>
                        <h1>Select Role</h1>

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

                    <div>
                        {salonloginisLoading ? <button><ColorRing
                            visible={true}
                            height="4rem"
                            width="4rem"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#87a96b', '#87a96b', '#87a96b', '#87a96b', '#87a96b']}
                        /></button> : <button onClick={loginHandler}>LOGIN</button>}
                        
                        <div>
                            <GoogleLogin
                                onSuccess={responseMessage}
                                onError={errorMessage}
                                size='large'
                                shape='circle'
                                width={screenwidth <= 400 ? 200 : screenwidth >= 400 && screenwidth <= 940 ? 235 : 324}
                                logo_alignment='left'
                                text='continue_with'
                            />
                        </div>

                    </div>

                </div>

            </div>
        </main>
    )
}

export default SalonSignin
