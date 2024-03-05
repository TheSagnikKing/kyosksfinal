import React from 'react'
import './Public.css'
import { SettingsIcon } from '../../icons'

const Public = () => {
  return (
    <main className='public__main__container'>
        <div className='public__main__top'>
          <div><img src="/iqb_logo.jpg" alt="" /></div>
          <div><SettingsIcon/></div>
        </div>

        <div className='public__main__middle'> 
          <img src="/iqb_banner.png" alt="" />
        </div>

        <div className='public__main__bottom'>
          <div>
            <button>Queue List</button>
            <button>Join Queue</button>
          </div>
        </div>
    </main>
  )
}

export default Public