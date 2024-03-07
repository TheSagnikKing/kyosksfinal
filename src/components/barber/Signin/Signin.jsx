import React, { useState } from 'react'
import './Signin.css'
import { DropdownIcon } from '../../../icons'
import { useLazyGetAllBarbersKioskQuery } from './signinApiSlice'

const Signin = () => {

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
    const [barberemail, setBarberEmail] = useState("")

    const barberSigninHandler = () => {
        const barberdata = { barberemail, password }
        console.log(barberdata)
    }

    const [drop, setDrop] = useState(false)

    const dropdownHandler = () => {
        setDrop((prev) => !prev)
        getAllBarbersKiosk(barberemail)
    }

    const [emailTimeout, setEmailTimeout] = useState(null);

    const debounceSearch = (value) => {
        if (emailTimeout) {
            clearTimeout(emailTimeout);
        }

        setBarberEmail(value);

        setEmailTimeout(setTimeout(() => {
            setBarberEmail(value);
            getAllBarbersKiosk(value);
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

                    <div><button onClick={barberSigninHandler}>LOGIN</button></div>

                </div>
            </div>
        </main>
    )
}

export default Signin