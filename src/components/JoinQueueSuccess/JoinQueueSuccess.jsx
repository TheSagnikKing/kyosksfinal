import React from 'react'
import style from './JoinQueueSuccess.module.css'
import { useSelector } from 'react-redux';
import { CheckIcon } from '../../icons';
import { useNavigate } from 'react-router-dom';

const JoinQueueSuccess = () => {

  const { colors } = useSelector(state => state.theme);
  const { currentTheme } = useSelector(state => state.theme);
  const { modecolors } = useSelector(state => state.modeColor)

  const navigate = useNavigate()

  return (
    <main
      className={style.container}
      style={{
        backgroundColor: colors.color4,
      }}
    >
      <div
        className={style.successbody}
        style={{
          border: `0.1rem solid ${colors.queueBorder}`,
          backgroundColor: colors.cardColor
        }}
      >
        <div
          style={{
            background: colors.tabBackground
          }}
        ><CheckIcon color={currentTheme === "Dark" ? "#F4F4F5" : "#09090B"} size={"2.6rem"} /></div>

        <h2>Queue Joined!</h2>
        <p style={{
          color: colors.secondaryText
        }}>Your turn is comming up soon. One of our professionals will be with you shortly. Thank you for your patience - we're getting ready to serve you with care and style!.</p>
        <button
          style={{
            backgroundColor: modecolors.color1,
            color: modecolors?.color2
          }}
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