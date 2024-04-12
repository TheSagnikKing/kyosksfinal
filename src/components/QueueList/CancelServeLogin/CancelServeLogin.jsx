import React, { useEffect, useState } from 'react'
import { DropdownIcon } from '../../../icons'
import "./CancelServeLogin.css"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import toast from 'react-hot-toast'

import { GoogleLogin } from '@react-oauth/google'
import { ColorRing } from 'react-loader-spinner'
import { IoMdHome } from 'react-icons/io'
import { useBarberLoginKioskMutation, useGoogleBarberLoginKioskMutation, useLazyGetAllBarbersKioskQuery } from '../../barber/Signin/signinApiSlice'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { setCredentials, setToken } from '../../barber/Signin/barberauthSlice'
import { useBarberServedQueueMutation, useCancelQKiyoskMutation } from '../QueueApiSlice'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const CancelServeLogin = () => {

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
        cancelqueuefunction,
        {
            data: cancelqueuedata,
            isSuccess: cancelqueueisSuccess,
            isError: cancelqueueisError,
            error: cancelError,
            isLoading: cancelqueueisLoading
        }
    ] = useCancelQKiyoskMutation()


    useEffect(() => {
        if (cancelqueueisError) {
            toast.error(cancelError?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [cancelqueueisError])


    useEffect(() => {
        if (cancelqueueisSuccess) {
            toast.success(cancelqueuedata.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            navigate("/queuelist", { ...location, state: {} });
        }
    }, [cancelqueueisSuccess, navigate])


    const cancelQueueHandler = () => {

        const confirm = window.confirm("Are you Sure ?")

        const cancelqueuedata = {
            barberEmail: barberemail,
            password: password,
            barberId: location?.state?.barberId,
            salonId: adminInfo?.salonId,
            _id: location?.state?._id
        }

        console.log("Console ", cancelqueuedata)

        if (confirm) {
            cancelqueuefunction(cancelqueuedata)
        }
    }

    const [drop, setDrop] = useState(false)

    const dropdownHandler = () => {
        setDrop((prev) => !prev)
        const salonId = adminInfo?.salonId

        getAllBarbersKiosk({
            salonId,
            email: barberemail
        })
    }

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

    const setBarberEmailHandler = (e) => {
        const searchTerm = e.target.value;
        setDrop(true)
        debounceSearch(searchTerm);
    }

    const selectEmailClick = (b) => {
        setBarberEmail(b.email)
        setDrop(false)
    }

    useEffect(() => {
        dispatch(setToken())
    }, [dispatch])

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
        <main className='barber__signin__main__container'>
            <div className='barber__signin__main__left'>
                <img src="/signin.png" alt="joinqueue" />
            </div>

            <div className='barber__signin__main__right'>
                {/* <Link to="/kiyosk" style={{marginTop:"10rem",background:"black",color:"white",padding:"1rem",fontSize:"1.2rem"}}>Home</Link> */}
                <Link to="/kiyosk"
                    className='barbersigniniconClassQueue'
                ><IoMdHome /></Link>
                <h1>Barber Login</h1>
                <div className='barber__signin__main__form'>
                    <div>
                        <h1>Select Barber Email</h1>

                        <div className='barberemail_selection'>
                            <input
                                type="text"
                                value={barberemail}
                                onChange={(e) => setBarberEmailHandler(e)}
                            />
                            <div onClick={dropdownHandler}>
                                <DropdownIcon />
                            </div>

                            {drop && <main className='barber__signin__main__form_dropdown'>
                                {isLoading ? <h2>Loading...</h2> : isSuccess && data?.response.length > 0 ? data?.response.map((b) => (
                                    <div key={b._id} onClick={() => selectEmailClick(b)}><h2>{b.email}</h2></div>
                                )) : <h2>No barber available with email</h2>}
                            </main>}

                        </div>

                    </div>

                    <div>
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

                    <div>
                        <button onClick={cancelQueueHandler}>Cancel Queue</button>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default CancelServeLogin