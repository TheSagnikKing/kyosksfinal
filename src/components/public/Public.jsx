import React, { useState } from 'react'
import './Public.css'
import { DropdownIcon, SettingsIcon } from '../../icons'
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

  const logoutHandler = () => {
    localStorage.setItem('adminkiyoskloggin', 'false')
    localStorage.setItem('adminkiyosktoken', '')
    navigate('/')
  }

  const [salonlistdrop, setSalonListDrop] = useState(false)

  const salonlistHandler = () => {
    setSalonListDrop((prev) => !prev)
  }

  return (
    <main className='public__main__container'>
      <div className='public__main__top'>
        <div><img src="/iqb_logo.jpg" alt="" /></div>

        <div>
          <div className='salonlistdropdown__box'>
            <p>Current Salon</p>
            <div onClick={salonlistHandler}><DropdownIcon /></div>

            {salonlistdrop && <div className='salonlistdropdown__box__content'>
              <div><p>Salon One</p></div>
              <div><p>Salon Two</p></div>
              <div><p>Salon Three</p></div>
              <div><p>Salon Four</p></div>
              <div><p>Salon Four</p></div>
              <div><p>Salon Four</p></div>
            </div>}
          </div>

          <div><p>Apply</p></div>
        </div>

        <div onClick={() => settingClicked()}><SettingsIcon /></div>

        {dropdown && <div className='public__main__top__logoutdiv'>
          <Link to="/barbersignin">Barber Signin</Link>
          <p onClick={logoutHandler}>Logout</p>
        </div>}
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