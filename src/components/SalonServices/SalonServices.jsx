import React from 'react'
import style from './SalonServices.module.css';
import { AddIcon, ClockIcon, SearchIcon } from '../../icons';

const SalonServices = () => {

  const categoryList = [
    "Hair Cut",
    "Beard",
    "Trim",
    "Spa",
    "Nail",
    "Massage",
    "Hair Wash"
  ]

  return (
    <main className={style.container}>

      <div>
        <div>
          <input
            placeholder='Search'
          />
          <button><SearchIcon color='#fff' size="2.5rem" /></button>
        </div>
      </div>

      <div className={style.servicesContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1.5rem",
            flexWrap: "wrap",
            alignSelf: "flex-start"
          }}
        >
          {
            categoryList.map((item, index) => (
              <button
                key={index}
                style={{
                  height: "4rem",
                  paddingInline: "1.5rem",
                  background: "#0BA3AD1A",
                  border: "none",
                  outline: "none",
                  borderRadius: "0.4rem",
                  color: "#0BA3AD",
                  fontSize: "1.2rem"
                }}
              >{item}</button>
            ))
          }

        </div>

        <div className={style.serviceCardContainer}>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              return (
                <div
                  key={index}
                  className={style.serviceCard}>
                  <div>
                    <img src="https://media.istockphoto.com/id/640274128/photo/barber-using-scissors-and-comb.jpg?s=612x612&w=0&k=20&c=mjdP6NhDA40WBorr8kyyI69waMs1EyzLkSmT6lQRvGU=" alt="" />
                    <p>Hair Cutting</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "1rem"
                      }}
                    >
                      <span><ClockIcon color='#263238' /></span>
                      <p>15 mins</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "2rem"
                    }}
                  >
                    <p style={{
                      fontWeight: 500,
                      fontSize: "2rem"
                    }}>$ 10.50</p>
                    <button
                      style={{
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#0BA3AD",
                        borderRadius: "0.5rem",
                        border: "none",
                        outline: "none"
                      }}
                    ><AddIcon color='#fff' /></button>
                  </div>
                </div>
              )
            })
          }

        </div>

      </div>

      <button className={style.btn}>Continue</button>

    </main>
  )
}

export default SalonServices