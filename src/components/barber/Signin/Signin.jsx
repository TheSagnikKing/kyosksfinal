import React, { useEffect, useState } from 'react'
import './Signin.css'
import { DropdownIcon } from '../../../icons'
import { useBarberLoginKioskMutation, useGoogleBarberLoginKioskMutation, useLazyGetAllBarbersKioskQuery } from './signinApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, setToken } from './barberauthSlice'
import toast from 'react-hot-toast'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { GoogleLogin } from '@react-oauth/google'
import { ColorRing } from 'react-loader-spinner'
import { IoMdHome } from 'react-icons/io'

const Signin = () => {

    const adminInfo = useSelector(selectCurrentAdminInfo)

    console.log("dvsdv", adminInfo)

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

    const [
        googleBarberLoginKiosk,
        {
            data:googleBarberLoginKioskdata,
            isSuccess:googleBarberLoginKioskisSuccess,
            isError:googleBarberLoginKioskisError,
            error:googleBarberLoginKioskerror,
            isLoading:googleBarberLoginKioskisLoading
        }
    ] = useGoogleBarberLoginKioskMutation()

    const [
        barberLoginKiosk,
        {
            data: barberlogindata,
            isSuccess: barberloginisSuccess,
            isError: barberloginisError,
            error: barbererror,
            isLoading: barberisloading
        }
    ] = useBarberLoginKioskMutation()

    const [password, setPassword] = useState("")
    const [barberemail, setBarberEmail] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (barberloginisSuccess) {
            dispatch(setCredentials(barberlogindata))
            localStorage.setItem('barberkiyoskloggin', 'true')
            navigate('/kiyoskdashboard')
        } else if (barberloginisError) {
            toast.error(barbererror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [dispatch, navigate, barberloginisSuccess, barberloginisError])

    useEffect(() => {
        if (googleBarberLoginKioskisSuccess) {
            dispatch(setCredentials(googleBarberLoginKioskdata))
            localStorage.setItem('barberkiyoskloggin', 'true')
            navigate('/kiyoskdashboard')
        } else if (googleBarberLoginKioskisError) {
            toast.error(googleBarberLoginKioskerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [dispatch, navigate, googleBarberLoginKioskisSuccess, googleBarberLoginKioskisError])

    const barberSigninHandler = () => {
        const barberdata = { email: barberemail, password }
        console.log(barberdata)
        barberLoginKiosk(barberdata)

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

    //Google barber Action
    const responseBarberMessage = async (response) => {
        console.log("barber",response.credential)
        googleBarberLoginKiosk(response.credential)
    };

    const errorBarberMessage = (error) => {
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

    return (
        <main className='barber__signin__main__container'>
            <div className='barber__signin__main__left'>
                <img src="/signin.png" alt="joinqueue" />
            </div>

            <div className='barber__signin__main__right'>
                {/* <Link to="/kiyosk" style={{marginTop:"10rem",background:"black",color:"white",padding:"1rem",fontSize:"1.2rem"}}>Home</Link> */}

                <h1>Barber Login</h1>
                <div className='barber__signin__main__form'>
                    <div>
                        <h1>Select Barber Email</h1>

                        <div>
                            <input
                                type="text"
                                value={barberemail}
                                onChange={(e) => setBarberEmailHandler(e)}
                            />
                            <div onClick={dropdownHandler}>
                                <DropdownIcon />
                            </div>
                        </div>

                        {drop && <main className='barber__signin__main__form_dropdown'>
                            {isLoading ? <h2>Loading...</h2> : isSuccess && data?.response.length > 0 ? data?.response.map((b) => (
                                <div key={b._id} onClick={() => selectEmailClick(b)}><h2>{b.email}</h2></div>
                            )) : <h2>No barber available with email</h2>}
                        </main>}
                    </div>

                    <div>
                        <h1>Password</h1>
                        <input
                            type="text"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        {barberisloading ? <button><ColorRing
                            visible={true}
                            height="4rem"
                            width="4rem"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#87a96b', '#87a96b', '#87a96b', '#87a96b', '#87a96b']}
                        /></button> : <button onClick={barberSigninHandler}>LOGIN</button>}
                        <button className='google-btn'>
                            <GoogleLogin
                                onSuccess={responseBarberMessage}
                                onError={errorBarberMessage}
                                size='large'
                                shape='circle'
                                width={screenwidth <= 400 ? 200 : screenwidth >= 400 && screenwidth <= 940 ? 235 : 324}
                                logo_alignment='left'
                                text='continue_with'
                            />

                        </button>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Signin