import React from 'react'
import style from './JoinQueueSuccess.module.css'
import { useSelector } from 'react-redux';
import { CheckIcon } from '../../icons';
import { useNavigate } from 'react-router-dom';

const JoinQueueSuccess = () => {

  const { colors } = useSelector(state => state.theme);
  const navigate = useNavigate()

  return (
    <main
      className={style.container}
    >
      <div
        className={style.successbody}
        style={{
          border: `0.1rem solid ${colors.borderColor}`
        }}
      >
        <div><CheckIcon color="#0BA3AD" size={"2.6rem"} /></div>

        <h2>Queue Joined!</h2>
        <p>Your turn is comming up soon. One of our professionals will be with you shortly. Thank you for your patience - we're getting ready to serve you with care and style!.</p>
        <button
          onClick={() => {
            localStorage.setItem("joinQueue", JSON.stringify(false))
            navigate("/kiosk")
          }}
        >Go to home</button>
      </div>

    </main>
  )
}

export default JoinQueueSuccess