import React, { useState } from 'react'
import './JoinQueue.css'
import { AddIcon, BackIcon, DeleteIcon, DropdownIcon } from '../../icons'
import Modal from '../modal/Modal'
import { useGetBarberByServicesKioskMutation, useGetServicesByBarberKioskMutation, useJoinQueueKioskMutation, useLazyGetAllSalonServicesKioskQuery, useLazyGetAvailableBarbersForQKioskQuery } from './joinqueueApiSlice'

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

const barbers = [
    {
        _id: 1,
        barberName: "Whisker Cutters",
        nextposition: 4,
        EWT: 15
    },
    {
        _id: 2,
        barberName: "The Rebel Hairs",
        nextposition: 5,
        EWT: 18
    },
    {
        _id: 3,
        barberName: "Dapper Dan's",
        nextposition: 1,
        EWT: 20
    },
    {
        _id: 4,
        barberName: "The Sideburn",
        nextposition: 6,
        EWT: 25
    }
]

const JoinQueue = () => {

    const [
        getavailablebarber,
        {
            data: getavailablebarberdata,
            isSuccess: getavailablebarberisSuccess,
            isError: getavailablebarberisError,
            isLoading: getavailablebarberloading,
            error: getavailablebarbererror
        }
    ] = useLazyGetAvailableBarbersForQKioskQuery()

    const [
        getServicesByBarber,
        {
            data: getServicesByBarberdata,
            isSuccess: getServicesByBarberisSuccess,
            isError: getServicesByBarberisError,
            isLoading: getServicesByBarberloading,
            error: getServicesByBarbererror
        }
    ] = useGetServicesByBarberKioskMutation()

    const [
        getAllSalonServices,
        {
            data: getAllSalonServicesdata,
            isSuccess: getAllSalonServicesisSuccess,
            isError: getAllSalonServicesisError,
            isLoading: getAllSalonServicesloading,
            error: getAllSalonServiceserror
        }
    ] = useLazyGetAllSalonServicesKioskQuery()

    const [
        getBarberByServicesKiosk,
        {
            data: getBarberByServicesKioskdata,
            isSuccess: getBarberByServicesKioskisSuccess,
            isError: getBarberByServicesKioskisError,
            isLoading: getBarberByServicesKioskloading,
            error: getBarberByServicesKioskerror
        }
    ] = useGetBarberByServicesKioskMutation()

    const [
        joinQueueKiosk,
        {
            data: joinQueueKioskdata,
            isSuccess: joinQueueKioskisSuccess,
            isError: joinQueueKioskisError,
            isLoading: joinQueueKioskloading,
            error: joinQueueKioskerror
        }
    ] = useJoinQueueKioskMutation()

    const [customerName, setCustomerName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")

    const [isOpen, setIsOpen] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [modal4, setModal4] = useState(false)


    const [selectedBarber, setSelectedBarber] = useState(false)

    const [selecteBarberdata, setSelectedBarberData] = useState(false)
    const [selectedBarberServices, setSelectedBarberServices] = useState([])

    const [selectedBarberId, setSelectedBarberId] = useState(false)

    const SelectBarberDropdownHandler = () => {
        setIsOpen(true)
        setModal1(true)
        getavailablebarber()
        setModal2(false)
        setModal3(false)
        setModal4(false)
    }


    const selectbarberHandler = async () => {
        setModal1(false)
        setModal2(true)
        await getServicesByBarber(selectedBarberId)
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
        getAllSalonServices()
        setModal4(false)
    }


    const selectserviceHandler = () => {
        setSelectedBarberServices(selectedServices)
        setModal1(false)
        setModal2(false)
        setModal3(false)

        const services = {
            salonId: 1,
            serviceIds: selectedServices.map((s) => s.serviceId)
        }
        console.log(services)
        getBarberByServicesKiosk(services)
        setModal4(true)
    }

    const modaltwobackHandler = () => {
        setModal2(false)
        setModal1(true)
    }

    const modalfourbackHandler = () => {
        setModal4(false)
        setModal3(true)
    }



    const searchSelectedBarber = (barber) => {
        setSelectedBarber(barber.name)
        setSelectedBarberData(barber.name)
        setSelectedBarberId(barber.barberId)
    }


    const selectbarbercontinueHandler = () => {
        setSelectedBarberServices(selectedServices)
        setSelectedServices([])
        setSelectedBarber(null)
        setModal1(false)
        setModal2(false)
        setIsOpen(false)
    }

    const selectservicecontinueHandler = () => {
        setSelectedServices([])
        setSelectedBarber(null)
        setModal3(false)
        setModal4(false)
        setIsOpen(false)
    }

    console.log("current services", selectedBarberServices)
    console.log("selected services", selectedServices)

    const joinqueuedata = {
        salonId: 1,
        name:customerName,
        customerEmail: customerEmail,
        joinedQType: "Single-Join",
        methodUsed: "Walk-In",
        mobileNumber,
        barberName: selecteBarberdata,
        barberId: selectedBarberId,
        services:selectedBarberServices
    }

    const joinqueueHandler = () => {

        if(!customerName || !customerEmail || !mobileNumber){
            alert("Please Fill All The Fields")
        }else if(mobileNumber.length > 10){
            alert("Contact Number cannot exceed 10 digit")
        }else if(mobileNumber.length < 10){
            alert("Contact Number must be 10 digit")
        }else if(selectedBarberId === false){
            alert("BarberId is not present")
        }else if(selectedBarberServices.length === 0){
            alert("Please Choose services")
        }else if(selecteBarberdata === false){
            alert("Barber Name is not Present")
        }else{
            joinQueueKiosk(joinqueuedata)
        }
        
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
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        <div>
                            <p>Contact No. (Optional)</p>
                            <input
                                type="text"
                                placeholder="Enter Your Contact No."
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='joinqueue__main__right__form_middle'>
                        <div>
                            <p>Email Id (Optional)</p>
                            <input
                                type="text"
                                placeholder="Enter Your Email ID"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='joinqueue__main__right__form_bottom'>
                        <div>
                            <p>Select Barber: {selecteBarberdata}</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Any Barber"
                                />
                                <div onClick={SelectBarberDropdownHandler}><DropdownIcon /></div>
                            </div>

                        </div>

                        <div>
                            <p>Select Services: {selectedBarberServices.map((s) => s.serviceName + " ")}</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Click to Choose"
                                />
                                <div onClick={SelectServicesDropdownHandler}><DropdownIcon /></div>
                            </div>

                        </div>
                    </div>

                    { joinQueueKioskloading ? <button>Loading...</button> : <button onClick={joinqueueHandler}>Join</button>}

                    {
                        isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} setModal1={setModal1} setModal2={setModal2} setModal3={setModal3} setModal4={setModal4} setSelectedServices={setSelectedServices} setSelectedBarber={setSelectedBarber}>
                            {modal1 && <>
                                <h1>Select Barber</h1>
                                <div className='select_barber_container'>
                                    {
                                        getavailablebarberloading ? <div><h2>Loading...</h2></div> : getavailablebarberisSuccess && getavailablebarberdata?.response?.length > 0 ? getavailablebarberdata?.response?.map((b) => (
                                            <div className='select_barber_item' key={b._id} onClick={() => searchSelectedBarber(b)}
                                                style={{
                                                    background: selectedBarber === b.name ? "var(--quarterny-color)" : "var(--secondary-color)"
                                                }}
                                            >
                                                <div className='select_barber_item_top'>
                                                    <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                                    <div>
                                                        <p>{b.name}</p>
                                                        {/* <p>Cutting, Styling, Hair Color, Straightening</p> */}
                                                    </div>

                                                </div>
                                                <div className='select_barber_item_top_border' />

                                                <div className='select_barber_item_bottom'>
                                                    <div>
                                                        <p>Next Available</p>
                                                        <p>Position</p>
                                                        <p>{b.queueCount + 1}</p>
                                                    </div>
                                                    <div className='select_barber_item_bottom_border' />
                                                    <div>
                                                        <p>Estimated</p>
                                                        <p>Time</p>
                                                        <p>{b.barberEWT} mins</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (<h2>No barber Available</h2>)
                                    }

                                </div>

                                {selectedBarber !== false && <div className='select_barber_services_btn'><button onClick={selectbarberHandler}>Select Services</button></div>}
                            </>}

                            {modal2 && <>
                                <div className='select__barber__modal2__head'>
                                    <div onClick={modaltwobackHandler}><BackIcon /></div>
                                    <h1>Select Services</h1>
                                </div>
                                <div className='select_barber_services_container'>
                                    {
                                        getServicesByBarberloading ? <div><h2>Loading...</h2></div> : getServicesByBarberisSuccess && getServicesByBarberdata?.response.map((item) => (
                                            <div className='select_barber_services_item' key={item._id}
                                                style={{ background: selectedServices.find((select) => select._id === item._id) ? "var(--quarterny-color)" : "" }}
                                            >
                                                <div className='select_barber_services_item_header'>
                                                    <h1>Service</h1>
                                                    <h1>PRICE</h1>
                                                    <h1>EWT</h1>
                                                    <div></div>
                                                </div>

                                                <div className='select_barber_services_item_content'>
                                                    <h1>{item.serviceName}</h1>
                                                    <h1>${item.servicePrice}</h1>
                                                    <h1>{item.barberServiceEWT}</h1>
                                                    {
                                                        selectedServices.find((select) => select._id === item._id) ?
                                                            <div onClick={() => deleteSelectServicesHandler(item._id)}
                                                                style={{
                                                                    boxShadow: "0px 0px 4px red",
                                                                    color: "red"
                                                                }}
                                                            ><DeleteIcon /></div> :
                                                            <div onClick={() => selectedServicesHandler(item)}
                                                                style={{
                                                                    boxShadow: "0px 0px 4px #1e2e97",
                                                                    color: "#1e2f97"
                                                                }}
                                                            ><AddIcon /></div>
                                                    }


                                                </div>

                                                <div>
                                                    <h1>(5.0)</h1><p>20 reviews</p>
                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>
                                {selectedServices.length > 0 && <div className='select_barber_services_btn'><button onClick={selectbarbercontinueHandler}>Continue</button></div>}
                            </>}

                            {modal3 && <>
                                <h1>Select Services</h1>
                                <div className='select_barber_services_container'>
                                    {
                                        getAllSalonServicesloading ? <div><h2>Loading...</h2></div> : getAllSalonServicesisSuccess && getAllSalonServicesdata?.response.map((item) => (
                                            <div className='select_barber_services_item' key={item._id}
                                                style={{ background: selectedServices.find((select) => select._id === item._id) ? "var(--quarterny-color)" : "" }}
                                            >
                                                <div className='select_barber_services_item_header'>
                                                    <h1>Service</h1>
                                                    <h1>PRICE</h1>
                                                    <h1>EWT</h1>
                                                    <div></div>
                                                </div>

                                                <div className='select_barber_services_item_content'>
                                                    <h1>{item.serviceName}</h1>
                                                    <h1>${item.servicePrice}</h1>
                                                    <h1>{item.serviceEWT}</h1>
                                                    {
                                                        selectedServices.find((select) => select._id === item._id) ?
                                                            <div onClick={() => deleteSelectServicesHandler(item._id)}
                                                                style={{
                                                                    boxShadow: "0px 0px 4px red",
                                                                    color: "red"
                                                                }}
                                                            ><DeleteIcon /></div> :
                                                            <div onClick={() => selectedServicesHandler(item)}
                                                                style={{
                                                                    boxShadow: "0px 0px 4px #1e2e97",
                                                                    color: "#1e2f97"
                                                                }}
                                                            ><AddIcon /></div>
                                                    }


                                                </div>

                                                <div>
                                                    <h1>(5.0)</h1><p>40 reviews</p>
                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>
                                {selectedServices.length > 0 && <div className='select_barber_services_btn'><button onClick={selectserviceHandler}>Select Barber</button></div>}
                            </>}

                            {modal4 && <>
                                <div className='select__barber__modal2__head'>
                                    <div onClick={modalfourbackHandler}><BackIcon /></div>
                                    <h1>Select Barber </h1>
                                </div>
                                <div className='select_barber_container'>
                                    {
                                        getBarberByServicesKioskloading ? <div><h2>Loading...</h2></div> : getBarberByServicesKioskisSuccess && barbers?.length > 0 ? getBarberByServicesKioskdata?.response.map((b) => (
                                            <div className='select_barber_item' key={b._id}
                                                onClick={() => searchSelectedBarber(b)}
                                                style={{
                                                    background: selectedBarber === b.name ? "var(--quarterny-color)" : "var(--secondary-color)"
                                                }}
                                            >
                                                <div className='select_barber_item_top'>
                                                    <div><img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="barbername" /></div>
                                                    <div>
                                                        <p>{b.name}</p>
                                                        {/* <p>Cutting, Styling, Hair Color, Straightening</p> */}
                                                    </div>

                                                </div>
                                                <div className='select_barber_item_top_border' />

                                                <div className='select_barber_item_bottom'>
                                                    <div>
                                                        <p>Next Available</p>
                                                        <p>Position</p>
                                                        <p>{b.queueCount + 1}</p>
                                                    </div>
                                                    <div className='select_barber_item_bottom_border' />
                                                    <div>
                                                        <p>Estimated</p>
                                                        <p>Time</p>
                                                        <p>{b.barberEWT} mins</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (<h2>No barber Available</h2>)
                                    }

                                </div>

                                { selectedBarber && <div className='select_barber_services_btn'><button onClick={() => selectservicecontinueHandler()}>Continue</button></div> }
                            </>}

                        </Modal>
                    }


                </div>
            </div>
        </main>
    )
}

export default JoinQueue