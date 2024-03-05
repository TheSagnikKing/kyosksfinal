import React, { useState } from 'react'
import './JoinQueue.css'
import { AddIcon, DeleteIcon, DropdownIcon } from '../../icons'
import Modal from '../modal/Modal'

const services = [
    {
        _id: 1,
        services: "Hair",
        price: 390,
        EWT: 15,
        rating: "4.0",
        reviews: 20
    },
    {
        _id: 2,
        services: "Spa",
        price: 450,
        EWT: 16,
        rating: "4.1",
        reviews: 18
    },
    {
        _id: 3,
        services: "Message",
        price: 580,
        EWT: 20,
        rating: "5.0",
        reviews: 35
    },
    {
        _id: 4,
        services: "Cutting",
        price: 980,
        EWT: 30,
        rating: "5.0",
        reviews: 15
    }
]

const JoinQueue = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [modal4, setModal4] = useState(false)

    const SelectBarberDropdownHandler = () => {
        setIsOpen(true)
        setModal1(true)
        setModal2(false)
        setModal3(false)
        setModal4(false)
    }

    const selectbarberHandler = () => {
        setModal1(false)
        setModal2(true)
        setModal3(false)
        setModal4(false)
    }

    const [selectedServices, setSelectedServices] = useState([])


    const selectedServicesHandler = (item) => {
        setSelectedServices([...selectedServices, item])
    }

    const deleteSelectServicesHandler = (itemid) => {
        setSelectedServices(selectedServices.filter((c) => c._id !== itemid))
    }


    const SelectServicesDropdownHandler = () => {
        setIsOpen(true)
        setModal1(false)
        setModal2(false)
        setModal3(true)
        setModal4(false)
    }

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
                                <div onClick={SelectBarberDropdownHandler}><DropdownIcon /></div>
                            </div>

                        </div>

                        <div>
                            <p>Select Services</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Click to Choose"
                                />
                                <div onClick={SelectServicesDropdownHandler}><DropdownIcon /></div>
                            </div>

                        </div>
                    </div>

                    <button>Join</button>

                    {
                        isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} setModal1={setModal1} setModal2={setModal2} setModal3={setModal3} setModal4={setModal4} setSelectedServices={setSelectedServices}>
                            {modal1 && <>
                                <h1>Select Barber</h1>
                                <div className='select_barber_container'>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='select_barber_services_btn'><button onClick={selectbarberHandler}>Select Services</button></div>
                            </>}

                            {modal2 && <>
                                <h1>Select Services</h1>
                                <div className='select_barber_services_container'>
                                    {
                                        services.map((item) => (
                                            <div className='select_barber_services_item' key={item._id}>
                                                <div className='select_barber_services_item_header'>
                                                    <h1>Service</h1>
                                                    <h1>PRICE</h1>
                                                    <h1>EWT</h1>
                                                    <div></div>
                                                </div>

                                                <div className='select_barber_services_item_content'>
                                                    <h1>{item.services}</h1>
                                                    <h1>${item.price}</h1>
                                                    <h1>{item.EWT}</h1>
                                                    {
                                                        selectedServices.find((select) => select._id === item._id) ?
                                                            <div onClick={() => deleteSelectServicesHandler(item._id)}
                                                            style={{
                                                                boxShadow:"0px 0px 4px red",
                                                                color:"red"
                                                            }}
                                                            ><DeleteIcon/></div> :
                                                            <div onClick={() => selectedServicesHandler(item)}
                                                            style={{
                                                                boxShadow:"0px 0px 4px #1e2e97",
                                                                color:"#1e2f97"
                                                            }}
                                                            ><AddIcon /></div>
                                                    }


                                                </div>

                                                <div>
                                                    <h1>({item.rating})</h1><p>{item.reviews} reviews</p>
                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>
                                <div className='select_barber_services_btn'><button onClick={selectbarberHandler}>Continue</button></div>
                            </>}

                            {modal3 && <>
                                <h1>I am modal 3</h1>
                                <div className='select_barber_container'>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select_barber_item'>
                                        <div className='select_barber_item_top'>
                                            <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                            <div>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling, Hair Color, Straightening</p>
                                            </div>

                                        </div>
                                        <div className='select_barber_item_top_border' />

                                        <div className='select_barber_item_bottom'>
                                            <div>
                                                <p>Next Available</p>
                                                <p>Position</p>
                                                <p>3</p>
                                            </div>
                                            <div className='select_barber_item_bottom_border' />
                                            <div>
                                                <p>Estimated</p>
                                                <p>Time</p>
                                                <p>0 mins</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='select_barber_services_btn'><button onClick={selectbarberHandler}>Select Services</button></div>
                            </>}

                        </Modal>
                    }


                </div>
            </div>
        </main>
    )
}

export default JoinQueue