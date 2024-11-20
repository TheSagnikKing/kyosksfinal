import React, { useEffect, useState } from 'react'
import style from './BarberServeLogin.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { ColorRing } from 'react-loader-spinner'
import { useLazyGetAllBarbersKioskQuery } from '../../barber/Signin/signinApiSlice'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { setToken } from '../../barber/Signin/barberauthSlice'
import { useBarberServedQueueMutation } from '../QueueApiSlice'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const BarberServeLogin = () => {

    const location = useLocation()

    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [
        getAllBarbersKiosk,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        }
    ] = useLazyGetAllBarbersKioskQuery()


    const [password, setPassword] = useState("")
    const [barberemail, setBarberEmail] = useState(location?.state?.barberEmail)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [
        servequeuefunction,
        {
            data: servequeuedata,
            isSuccess: serverqueueisSuccess,
            isError: servequeueisError,
            error: servequeueError,
            isLoading: servequeueisLoading
        }
    ] = useBarberServedQueueMutation()

    useEffect(() => {
        if (servequeueisError) {
            toast.error(servequeueError?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [servequeueisError])


    useEffect(() => {
        if (serverqueueisSuccess) {
            toast.success(servequeuedata.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            navigate("/queuelist", { ...location, state: {} });
        }
    }, [serverqueueisSuccess, navigate])

    const serveQueueHandler = () => {

        const confirm = window.confirm("Are you Sure ?")

        const queueData = {
            barberEmail: barberemail,
            password: password,
            barberId: location?.state?.barberId,
            salonId: adminInfo?.salonId,
            services: location?.state?.services,
            _id: location?.state?._id
        }

        // console.log("Console ", queueData)

        if (confirm) {
            servequeuefunction(queueData)
        }

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            serveQueueHandler();
        }
    };

    const [drop, setDrop] = useState(false)


    const [emailTimeout, setEmailTimeout] = useState(null);

    const debounceSearch = (value) => {
        if (emailTimeout) {
            clearTimeout(emailTimeout);
        }

        setBarberEmail(value);

        setEmailTimeout(setTimeout(() => {
            setBarberEmail(value);
            const salonId = adminInfo?.salonId
            getAllBarbersKiosk({ email: value, salonId });
        }, 500));
    };

    useEffect(() => {
        dispatch(setToken())
    }, [dispatch])



    const [showPassword, setShowPassword] = useState(false)


    return (
            <section className={style.barber_serve_login_container}>
                <div className={style.barber_serve_login_left}>
                    <img src="./Signup.png" alt="salon_settings_img" />
                </div>
                <div className={style.barber_serve_login_right}>
                    <div className={style.barber_serve_main}>
                        <p>Welcome to Barber Sign-In</p>

                        <div className={style.email_container}>
                            <input
                                type="text"
                                value={barberemail}
                                onChange={(e) => setBarberEmail(e.target.value)}
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

                        {servequeueisLoading ? <button className={style.signin_btn}><ColorRing
                            visible={true}
                            height="4rem"
                            width="4rem"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /></button> : <button
                            onClick={serveQueueHandler}
                            className={style.signin_btn}
                        >Serve</button>}

                    </div>
                </div>
            </section>
    )
}

export default BarberServeLogin