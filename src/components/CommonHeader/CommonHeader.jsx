import React, { useEffect, useState } from 'react'
import style from './CommonHeader.module.css'
import { useNavigate } from 'react-router-dom'
import { ClickAwayListener } from '@mui/material';
import { AccountIcon, JoinIcon, LogoutIcon, QueueIcon, SettingsIcon } from '../../icons';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import Skeleton from 'react-loading-skeleton';

const CommonHeader = ({ themecolor, setThemeColor }) => {

    const adminInfo = useSelector(selectCurrentAdminInfo)

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

    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo?.email,
                role: adminInfo?.role
            }
            getDefaultSalonByKiosk(salondata)
        }
    }, [adminInfo])

    console.log("HEader current salon ", data)

    const navigate = useNavigate()

    const [showdrop, setShowDrop] = useState(false)

    const queuelistClicked = () => {
        navigate('/queuelist')
    }

    const joinqueueClicked = () => {
        navigate('/joinqueue')
    }

    const logoutHandler = () => {
        localStorage.setItem('adminkiyoskloggin', 'false')
        localStorage.setItem('adminkiyosktoken', '')
        localStorage.setItem("salonSelect", "false")
        navigate('/')
    }

    const handleClickAway = () => {
        setShowDrop(false)
    }

    return (
        <header className={style.kiyosk_header}
            style={{
                background: themecolor ? "#001F3F" : "#fff"
            }}
        >
            <div>
                <div>
                    {
                        isLoading ? <Skeleton
                            count={1}
                            circle={true}
                            borderRadius={"50%"}
                            height={"4.7rem"}
                            width={"4.7rem"}
                        /> : isSuccess && data?.response?.salonLogo.length > 0 ? (
                            <img src={data.response.salonLogo[0].url} alt={data.response.salonName} />
                        ) : (
                            <img src='/no-image.webp' alt="no image available" />
                        )
                    }
                    {/* <img src="https://t3.ftcdn.net/jpg/05/51/96/54/360_F_551965459_AyBWTTMk4JUhWraDeouvWLFNxvQRaPN2.jpg" alt="logo" /> */}
                </div>
                {
                    adminInfo?.role === "Barber" ? <p style={{
                        color: themecolor ? "#fff" : "#000"
                    }}>{adminInfo?.salonName}</p> : <p style={{
                        color: themecolor ? "#fff" : "#000"
                    }}>{data?.response?.salonName}</p>
                }
                {/* <p style={{
                    color: themecolor ? "#fff" : "#000"
                }}>Unisex Hair Salon</p> */}
            </div>

            <div>

                <div>
                    <button
                        onClick={queuelistClicked}
                        style={{
                            background: themecolor ? "#3A6D8C" : "#0A84FF"
                        }}
                    >Queue List</button>
                    <button
                        onClick={joinqueueClicked}
                        style={{
                            background: themecolor ? "#3A6D8C" : "#0A84FF"
                        }}
                    >Join Queue</button>
                </div>

                <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                        <SettingsIcon onClick={() => setShowDrop((prev) => !prev)} />

                        {showdrop && (
                            <div className={style.kiyosk_dropbox}>
                                <div>
                                    <div><AccountIcon /></div>
                                    <p>Barber Sign In</p>
                                </div>

                                <div>
                                    <div><SettingsIcon /></div>
                                    <p>Salon Sign In</p>
                                </div>

                                <div>
                                    <div><LogoutIcon /></div>
                                    <p onClick={logoutHandler}>Logout</p>
                                </div>

                                <div
                                    onClick={queuelistClicked}
                                    className={style.mobile_queuelist}
                                >
                                    <div><QueueIcon /></div>
                                    <p>Queue List</p>
                                </div>

                                <div
                                    onClick={joinqueueClicked}
                                    className={style.mobile_joinequeue}
                                >
                                    <div><JoinIcon /></div>
                                    <p>Join Queue</p>
                                </div>

                                <div
                                    onClick={() => setThemeColor(true)}
                                    style={{
                                        background: themecolor ? "#efefef" : "#fff"
                                    }}
                                >
                                    <div>1.</div>
                                    <p>Theme One</p>
                                </div>

                                <div
                                    onClick={() => setThemeColor(false)}
                                    style={{
                                        background: !themecolor ? "#efefef" : "#fff"
                                    }}
                                >
                                    <div>2.</div>
                                    <p>Theme Two</p>
                                </div>
                            </div>
                        )}
                    </div>
                </ClickAwayListener>
            </div>
        </header>
    )
}

export default CommonHeader
