import React from 'react'
import style from './JoinQueuePage.module.css';

const JoinQueuePage = () => {
    return (
        <main className={style.container}>
            <p
            style={{
                fontSize: "5rem",
                fontWeight: "600",
                marginTop: "7rem"
            }}
            >Preview</p>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem"
            }}>
                <h3>Selected Barber</h3>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1.4rem"
                    }}
                >
                    {
                        [0].map((item, index) => {
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
            </div>


            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem"
            }}>
                <h3>Selected Services</h3>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1.4rem"
                    }}
                >
                    {
                        [0, 1].map((item, index) => {
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
            </div>
            
            <button
            className={style.btn}
            >Join Queue</button>


            <div className={style.wavebg}>
            </div>

        </main>
    )
}

export default JoinQueuePage