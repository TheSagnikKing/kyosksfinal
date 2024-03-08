import React, { useEffect, useState } from 'react'
import './AdminSignin.css'
import { useNavigate } from 'react-router-dom'
import { useAdminLoginKioskMutation } from './adminsigninApiSlice'
import toast from 'react-hot-toast'

const AdminSignin = () => {

    const [adminlogin, {
        data,
        isSuccess,
        isError,
        isLoading,
        error
    }] = useAdminLoginKioskMutation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    useEffect(() => {
        if(isSuccess){
            navigate("/kiyosk")
        }else if(isError){
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
    },[isSuccess,isError,navigate])

    const loginHandler = () => {
        const admindata = { email, password }
        console.log(admindata)

        adminlogin(admindata)

        // navigate('/kiyosk')
    }

    return (
        <main className='admin__signin__main__container'>
            <div className='admin__signin__main__left'>
                <img src="/signin.png" alt="joinqueue" />
            </div>

            <div className='admin__signin__main__right'>
                <h1>Admin Login</h1>

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

                    <div>
                        <h1>Password</h1>
                        <input
                            type="text"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>{isLoading ? <button>Loading...</button> : <button onClick={loginHandler}>LOGIN</button>}</div>

                </div>
            </div>
        </main>
    )
}

export default AdminSignin