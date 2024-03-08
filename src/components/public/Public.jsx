import React, { useState } from 'react'
import './Public.css'
import { SettingsIcon } from '../../icons'
import { Link, useNavigate } from 'react-router-dom'

const Public = () => {

  const [dropdown, setDropdown] = useState(false) 

  const navigate = useNavigate()

  const settingClicked = () => {
    setDropdown(!dropdown)
    // navigate('/barbersignin')
  }

  const joinqueueClicked = () => {
    navigate('/joinqueue')
  }

  return (
    <main className='public__main__container'>
        <div className='public__main__top'>
          <div><img src="/iqb_logo.jpg" alt="" /></div>
          <div onClick={() => settingClicked()}><SettingsIcon/></div>

          {dropdown && <div className='public__main__top__logoutdiv'>
            <Link to="/barbersignin">Barber Signin</Link>
            <p onClick={() => alert("logout")}>Logout</p>
          </div> }
        </div>

        <div className='public__main__middle'> 
          <img src="/iqb_banner.png" alt="" />
        </div>

        <div className='public__main__bottom'>
          <div>
            <button>Queue List</button>
            <button onClick={joinqueueClicked}>Join Queue</button>
          </div>
        </div>
    </main>
  )
}

export default Public