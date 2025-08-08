import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}


export function SocketProvider({ children }) {



    useEffect(() => {

        const newSocket = socketIOClient("https://iqb-final.onrender.com")

        newSocket.on("connect", () => {
            console.log("✅ Connected to WebSocket");
        });

        return () => newSocket.disconnect();

    }, []);

    return (
        <SocketContext.Provider value={{ name: "Sagnik" }} >
            {children}
        </SocketContext.Provider>
    );
}