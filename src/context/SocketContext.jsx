import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { selectCurrentAdminInfo } from '../components/AdminSignin/adminauthSlice';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}


export function SocketProvider({ children }) {

    const [getDefaultAdminData, setGetDefaultAdminData] = useState("")

    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [salonSocketOnline, setSalonSocketOnline] = useState("")
    const [mobileSocketOnline, setMobileSocketOnline] = useState("")
    const [kioskSocketOnline, setKioskSocketOnline] = useState("")
    const [kioskbtnCheck, setKioskbtnCheck] = useState(false)

    useEffect(() => {

        const newSocket = socketIOClient("https://iqb-final.onrender.com")

        newSocket.on("connect", () => {
            console.log("✅ Connected to WebSocket");
        });

        if (adminInfo?.salonId) {
            newSocket.emit("joinSalon", adminInfo?.salonId);

            newSocket.on("liveDefaultSalonData", (defaultSalonData) => {
                // console.log("defaultSalonData ", defaultSalonData)
                setGetDefaultAdminData(defaultSalonData)
            })

            newSocket.on("salonStatusUpdate", (salonStatusData) => {
                // console.log("salonStatusData ", salonStatusData?.response?.isOnline)
                setSalonSocketOnline(salonStatusData?.response?.isOnline)
            })

            newSocket.on("mobileBookingAvailabilityUpdate", (mobileBookData) => {
                console.log("mobileBookData ", mobileBookData)
                setMobileSocketOnline(mobileBookData?.response?.mobileBookingAvailability)
            })

            newSocket.on("kioskAvailabilityUpdate", (kioskData) => {
                // console.log("kioskData ", kioskData?.response?.kioskAvailability)
                setKioskSocketOnline(kioskData?.response?.kioskAvailability)
            })

        }

        return () => newSocket.disconnect();

    }, [adminInfo]);

    const valueData = {
        getDefaultAdminData,
        setGetDefaultAdminData,
        salonSocketOnline,
        setSalonSocketOnline,
        mobileSocketOnline,
        setMobileSocketOnline,
        kioskSocketOnline,
        setKioskSocketOnline,
        kioskbtnCheck,
        setKioskbtnCheck
    }
    return (
        <SocketContext.Provider value={valueData} >
            {children}
        </SocketContext.Provider>
    );
}