import React from 'react'
import './Signin.css'
import { DropdownIcon } from '../../../icons'

const Signin = () => {
    return (
        <main className='barber__signin__main__container'>
            <div className='barber__signin__main__left'>
                <img src="/signin.png" alt="joinqueue" />
            </div>

            <div className='barber__signin__main__right'>
                <h1>Barber Login</h1>

                <div className='barber__signin__main__form'>
                    <div>
                        <h1>Select Barber</h1>

                        <div>
                            <input
                                type="text"
                            />
                            <div>
                                <DropdownIcon />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1>Password</h1>
                        <input 
                        type="text" 
                        placeholder='Enter Your Password'
                        />
                    </div>

                    <div><button>LOGIN</button></div>

                </div>
            </div>
        </main>
    )
}

export default Signin