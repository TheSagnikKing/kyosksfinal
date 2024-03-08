import React, { useState } from 'react'
import './Dashboard.css'
import { CheckIcon} from '../../icons'

const Dashboard = () => {

    const [salonbtnCheck, setSalonbtnCheck] = useState(false)
    const [barberbtnCheck, setBarberbtnCheck] = useState(false)

    const salonOnlineHandler = () => {
        setSalonbtnCheck(!salonbtnCheck)
    }

    const barberOnlineHandler = () => {
        setBarberbtnCheck(!barberbtnCheck)
    }

    return (
        <main className='kiyosk__dashboard__main__container'>
            <h1>Welcome To Kiyosk Dashboard</h1>

            <div className='kiyosk__dashboard__main__container_btnbox'>
                <div>
                    <div><h1>Salon Online / Offline</h1> <div onClick={salonOnlineHandler} style={{ background: salonbtnCheck && "limegreen", color: salonbtnCheck && "#fff" }}>{salonbtnCheck && <CheckIcon />}</div></div>
                </div>

                <div>
                    <div><h1>Barber Online / Offline</h1> <div onClick={barberOnlineHandler} style={{ background: barberbtnCheck && "limegreen", color: barberbtnCheck && "#fff" }}>{barberbtnCheck && <CheckIcon />}</div></div>
                </div>
            </div>

            <div className='kiyosk__dashboard__main__barber_detailbox'>
                <h1>Barber Detail</h1>
                <h2>Barber Name: <p>Sagnik Nandy</p></h2>
                <h2>Barber Name: <p>Sagnik Nandy</p></h2>
                <h2>Barber Name: <p>Sagnik Nandy</p></h2>
                <h2>Barber Name: <p>Sagnik Nandy</p></h2>
            </div>
        </main>
    )
}

export default Dashboard