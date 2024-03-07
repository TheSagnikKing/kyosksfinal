import React, { useState } from 'react'
import './Signin.css'
import { DropdownIcon } from '../../../icons'
import { useGetAllBarbersKioskQuery } from './signinApiSlice'

const Signin = () => {

    const { data, error, isLoading, isSuccess } = useGetAllBarbersKioskQuery(undefined, {
        transformResponse: (rawData) => {
            if (rawData.success) {
                const emailArray = rawData.response.map((barber) => barber.email);
                return emailArray;
            } else {
                // Handle error or other cases
                return rawData;
            }
        },
    });

    const [password, setPassword] = useState("")
    const [barberemail, setBarberEmail] = useState("")

    const barberSigninHandler = () => {
        const barberdata = { barberemail, password }
        console.log(barberdata)
    }

    const [drop, setDrop] = useState(false)

    const dropdownHandler = () => {
        setDrop((prev) => !prev)
    }

    return (
        <main className='barber__signin__main__container'>
            <div className='barber__signin__main__left'>
                <img src="/signin.png" alt="joinqueue" />
            </div>

            <div className='barber__signin__main__right'>
                <h1>Barber Login</h1>

                <div className='barber__signin__main__form'>
                    <div>
                        <h1>Select Barber Email</h1>

                        <div>
                            <input
                                type="text"
                                value={barberemail}
                                onChange={(e) => setBarberEmail(e.target.value)}
                            />
                            <div onClick={dropdownHandler}>
                                <DropdownIcon />
                            </div>
                        </div>

                        { drop && <main className='barber__signin__main__form_dropdown'>
                                <div><h2>sagniknandy27@gmail.com</h2></div>
                                <div><h2>sagniknandy27@gmail.com</h2></div>
                                <div><h2>sagniknandy27@gmail.com</h2></div>
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

                    <div><button onClick={barberSigninHandler}>LOGIN</button></div>

                </div>
            </div>
        </main>
    )
}

export default Signin