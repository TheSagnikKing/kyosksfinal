import React, { useEffect, useState } from 'react'
import style from './Signin.module.css'
import { DropdownIcon } from '../../../icons'
import { useBarberLoginKioskMutation, useGoogleBarberLoginKioskMutation, useLazyGetAllBarbersKioskQuery } from './signinApiSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, setToken } from './barberauthSlice'
import toast from 'react-hot-toast'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { ColorRing } from 'react-loader-spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { ClickAwayListener, Skeleton } from '@mui/material';

const Signin = () => {

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

    const [
        googleBarberLoginKiosk,
        {
            data: googleBarberLoginKioskdata,
            isSuccess: googleBarberLoginKioskisSuccess,
            isError: googleBarberLoginKioskisError,
            error: googleBarberLoginKioskerror,
            isLoading: googleBarberLoginKioskisLoading
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
            navigate('/kiyoskdashboard')
        } else if (barberloginisError) {
            toast.error(barbererror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
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
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [dispatch, navigate, googleBarberLoginKioskisSuccess, googleBarberLoginKioskisError])

    const barberSigninHandler = () => {
        const barberdata = { email: barberemail, password }
        barberLoginKiosk(barberdata)

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            barberSigninHandler();
        }
    };

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


    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className={style.barber_signin_container}>
            <div className={style.barber_signin_container_left}>
                <img src="./Signup.png" alt="signin" />
            </div>
            <div className={style.barber_signin_container_right}>
                <main className={style.barber_signin_content_main}>
                    <p>Welcome to Barber Sign-In</p>

                    <ClickAwayListener onClickAway={() => setDrop(false)}>
                        <div className={style.barber_email_selection_container} onClick={dropdownHandler}>
                            <input
                                type="text"
                                placeholder='Search Barber'
                                value={barberemail}
                                onChange={(e) => setBarberEmailHandler(e)}
                                onKeyDown={handleKeyPress}
                            />
                            <div>
                                <DropdownIcon />
                            </div>


                            {drop && <main className={style.barber_email_selection_dropdown}>

                                {
                                    isLoading ? (<div className={style.barber_email_selection_dropdown_loading}>
                                        <Skeleton variant="rectangular" className={style.skeleton} />
                                        <Skeleton variant="rectangular" className={style.skeleton} />
                                        <Skeleton variant="rectangular" className={style.skeleton} />
                                    </div>) :
                                        isSuccess && data?.response.length > 0 ? (
                                            data?.response?.map((b) => {
                                                return (
                                                    <div className={style.barber_dropdown_item} key={b._id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            selectEmailClick(b);
                                                        }}
                                                        style={{
                                                            background: barberemail === b.email && "var(--primary-color)",
                                                        }}
                                                    >
                                                        <p style={{ color: barberemail === b.email && "#fff" }}>{b.email}</p>
                                                    </div>
                                                )
                                            })

                                        ) :
                                            (<div className={style.barber_email_selection_dropdown_error}>
                                                <p>No barber available</p>
                                            </div>)
                                }

                            </main>}

                        </div>
                    </ClickAwayListener>

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

                    {
                        barberisloading ? (<button className={style.signin_btn}><ColorRing
                            visible={true}
                            height="4rem"
                            width="4rem"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /></button>) : (<button
                            className={style.signin_btn}
                            onClick={barberSigninHandler}
                        >Sign in</button>)
                    }

                </main>
            </div>
        </main>
    )
}

export default Signin