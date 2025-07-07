import React, { useEffect, useRef, useState } from 'react'
import style from './JoinForm.module.css';
import { PhoneInput } from 'react-international-phone';
import { useNavigate } from 'react-router-dom';

const JoinForm = () => {

    const navigate = useNavigate()

    const phoneInputUseRef = useRef()
    const [mobileCountryCode, setMobileCountryCode] = useState("")
    const [invalidNumber, setInvalidNumber] = useState(false)
    const [invalidNumberError, setInvalidNumberError] = useState("")
    const [countryflag, setCountryFlag] = useState("gb")

    useEffect(() => {
        if (phoneInputUseRef.current) {
            // phoneInputUseRef.current.style.color = colors.color3
            
        }

    }, [])

    return (
        <main className={style.container}>
            <div>
                <div className={style.inputWrapper}>
                    <p>Full Name</p>
                    <input />
                </div>

                <div className={style.inputWrapper}>
                    <p>Email (Optional)</p>
                    <input />
                </div>

                <div className={style.mobileInputWrapper}>
                    <p>Phone Number (Optional)</p>
                    <PhoneInput
                        forceDialCode={true}
                        defaultCountry={countryflag}
                        // value={mobileNumber}
                        // onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                        ref={phoneInputUseRef}
                         className={style.phoneInput}
                    />

                </div>

                <button className={style.btn}
                    onClick={() => {
                        navigate("/salonServices")
                    }}
                >Continue</button>
            </div>

        </main>
    )
}

export default JoinForm