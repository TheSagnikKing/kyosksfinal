import React from 'react'
import style from './SalonBarbers.module.css';
import { useNavigate } from 'react-router-dom';

const SalonBarbers = () => {

    const navigate = useNavigate()

    return (
        <main className={style.container}>
            <div>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={style.serviceCard}>
                                <div>
                                    <img src="https://media.istockphoto.com/id/640274128/photo/barber-using-scissors-and-comb.jpg?s=612x612&w=0&k=20&c=mjdP6NhDA40WBorr8kyyI69waMs1EyzLkSmT6lQRvGU=" alt="" />
                                    <p>David Wanner</p>
                                    <p style={{
                                        fontSize: "1.2rem",
                                        textAlign: "center"
                                    }}>availability in 35 mins</p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className={style.bottomContainer}>
                <div>
                    <h3>$ 10.50</h3>
                    <p>1 services | 15mins</p>
                </div>

                <button 
                onClick={() => {
                    navigate("/joinQueuePage")
                }}
                className={style.btn}>Continue</button>
            </div>
        </main>
    )
}

export default SalonBarbers