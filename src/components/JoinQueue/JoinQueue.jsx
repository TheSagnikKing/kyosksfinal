import React from 'react'
import './JoinQueue.css'
import { DropdownIcon } from '../../icons'

const JoinQueue = () => {
    return (
        <main className='joinqueue__main__container'>
            <div className='joinqueue__main__left'>
                <img src="/joinqueue.png" alt="joinqueue" />
            </div>

            <div className='joinqueue__main__right'>
                <h1>Join Queue</h1>

                <div className='joinqueue__main__right__form'>
                    <div className='joinqueue__main__right__form_top'>
                        <div>
                            <p>Full Name</p>
                            <input
                                type="text"
                                placeholder="Enter Your Full Name"
                            />
                        </div>

                        <div>
                            <p>Contact No. (Optional)</p>
                            <input
                                type="text"
                                placeholder="Enter Your Contact No."
                            />
                        </div>
                    </div>

                    <div className='joinqueue__main__right__form_middle'>
                        <div>
                            <p>Email Id (Optional)</p>
                            <input
                                type="text"
                                placeholder="Enter Your Email ID"
                            />
                        </div>
                    </div>

                    <div className='joinqueue__main__right__form_bottom'>
                        <div>
                            <p>Select Barber</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Any Barber"
                                />
                                <div><DropdownIcon/></div>
                            </div>

                        </div>

                        <div>
                            <p>Select Services</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Click to Choose"
                                />
                                <div><DropdownIcon/></div>
                            </div>

                        </div>
                    </div>

                    <button>Join</button>
                </div>
            </div>
        </main>
    )
}

export default JoinQueue