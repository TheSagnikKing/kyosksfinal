import React, { useEffect, useState } from 'react'
import './JoinQueue.css'
import { AddIcon, BackIcon, DeleteIcon, DropdownIcon } from '../../icons'
import Modal from '../modal/Modal'
import { useGetBarberByServicesKioskMutation, useGetServicesByBarberKioskMutation, useJoinQueueKioskMutation, useLazyGetAllSalonServicesKioskQuery, useLazyGetAvailableBarbersForQKioskQuery } from './joinqueueApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { ColorRing } from 'react-loader-spinner'
import { RiVipCrownFill } from 'react-icons/ri'
import { IoMdHome } from 'react-icons/io'

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const JoinQueue = () => {

    const adminInfo = useSelector(selectCurrentAdminInfo)

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
        getavailablebarber({ salonId: adminInfo?.salonId })
        setModal2(false)
        setModal3(false)
        setModal4(false)
    }


    const selectbarberHandler = async () => {
        setModal1(false)
        setModal2(true)
        await getServicesByBarber({
            salonId: adminInfo?.salonId,
            barberId: selectedBarberId
        })
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
        getAllSalonServices({ salonId: adminInfo?.salonId })
        setModal4(false)
    }


    const selectserviceHandler = () => {
        setSelectedBarberServices(selectedServices)
        setModal1(false)
        setModal2(false)
        setModal3(false)

        const services = {
            salonId: adminInfo?.salonId,
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

    console.log(selectedBarberId)

    const searchSelectedBarber = (barber) => {
        setSelectedBarber(barber.name)
        setSelectedBarberData(barber.name)
        setSelectedBarberId(barber.barberId)
    }


    const selectbarbercontinueHandler = () => {
        setSelectedBarberServices(selectedServices)
        setSelectedServices([])
        setSelectedBarber(false)
        setModal1(false)
        setModal2(false)
        setIsOpen(false)
    }

    const selectservicecontinueHandler = () => {
        setSelectedServices([])
        setSelectedBarber(false)
        setModal3(false)
        setModal4(false)
        setIsOpen(false)
    }

    console.log("current services", selectedBarberServices)
    console.log("selected services", selectedServices)

    const joinqueuedata = {
        salonId: adminInfo?.salonId,
        name: customerName,
        customerEmail: customerEmail,
        joinedQType: "Single-Join",
        methodUsed: "Walk-In",
        mobileNumber,
        barberName: selecteBarberdata,
        barberId: selectedBarberId,
        services: selectedBarberServices
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (joinQueueKioskisSuccess) {
            toast.success("Join Queue Successfully", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            setSelectedBarber("")
            setSelectedBarberData("")
            setSelectedBarberServices([])
            setSelectedServices([])
            setCustomerName("")
            setCustomerEmail("")
            setMobileNumber("")
            navigate('/kiyosk')
        } else if (joinQueueKioskisError) {
            toast.error(joinQueueKioskerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [joinQueueKioskisSuccess, joinQueueKioskisError, navigate])

    const joinqueueHandler = () => {
        if (!customerName) {
            toast.error("Please Enter Customer Name", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else if (selectedBarberServices.length === 0) {
            toast.error("Please Choose Services", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else if (selecteBarberdata === false) {
            toast.error("Barber Name not Present", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            console.log(joinqueuedata)
            joinQueueKiosk(joinqueuedata)
        }
    }

    const modelcolorfnc = (b) => {
        // const modelcolor = selectedBarber === b.name ? "var(--secondary-color)" : "var(--primary-color)"
        const modelcolor = selectedBarber === b.name ? "var(--primary-color)" : "var(--primary-color)"
        return modelcolor
    }

    const modelcolorfnc2 = (selectedServices, item) => {
        // const modelcolor2 = selectedServices.find((select) => select._id === item._id) ? "var(--secondary-color)" : "var(--primary-color)"
        const modelcolor2 = selectedServices.find((select) => select._id === item._id) ? "var(--primary-color)" : "var(--primary-color)"
        return modelcolor2;
    }

    //rating bole kono property nai getAvailable Barbere

    return (
        <main className='joinqueue__main__container'>

            <div className='joinqueue__main__left'>
                <img src="/joinqueue.png" alt="joinqueue" />
            </div>

            <div className='joinqueue__main__right'>

                <Link to="/kiyosk"
                    className='homeiconClass'
                ><IoMdHome /></Link>

                <div className='joinqueue__main__right__form'>
                    <h1>Join Queue</h1>

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
                            <div className='phone_input_container'>
                                <PhoneInput
                                    forceDialCode={true}
                                    defaultCountry="gb"
                                    value={mobileNumber}
                                    onChange={(phone) => setMobileNumber(phone)}
                                />
                            </div>
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
                            <p>Select Barber:</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Any Barber"
                                    value={selecteBarberdata === false ? "" : selecteBarberdata}
                                />
                                <div onClick={SelectBarberDropdownHandler} style={{ cursor: "pointer" }}><DropdownIcon /></div>
                            </div>

                        </div>

                        <div>
                            <p>Select Services:</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Click to Choose"
                                    value={selectedBarberServices.map((s) => s.serviceName + " ")}
                                />
                                <div onClick={SelectServicesDropdownHandler} style={{ cursor: "pointer" }}><DropdownIcon /></div>
                            </div>

                        </div>
                    </div>

                    {joinQueueKioskloading ? <div className='joinqueuebtn'><ColorRing
                        visible={true}
                        height="4rem"
                        width="4rem"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#87a96b', '#87a96b', '#87a96b', '#87a96b', '#87a96b']}
                    /></div> : <div className='joinqueuebtn' onClick={joinqueueHandler}>Join</div>}

                    {
                        isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} setModal1={setModal1} setModal2={setModal2} setModal3={setModal3} setModal4={setModal4} setSelectedServices={setSelectedServices} setSelectedBarber={setSelectedBarber}>
                            {modal1 && <>
                                <h1>Select Barber</h1>
                                <div className='select_barber_container'>
                                    {
                                        getavailablebarberloading ? <div><h2>Loading...</h2></div> : getavailablebarberisSuccess && getavailablebarberdata?.response?.length > 0 ? getavailablebarberdata?.response?.map((b) => (
                                            <div className='select_barber_item' key={b._id} onClick={() => searchSelectedBarber(b)}
                                                style={{
                                                    background: selectedBarber === b.name ? "var(--queue-modal-bg)" : "var(--secondary-color)"
                                                }}
                                            >
                                                <div className='select_barber_item_top'>
                                                    <div><img src="./queue-no-image.jpg" alt="barbername" /></div>
                                                    <div>
                                                        <p style={{ color: modelcolorfnc(b) }}>{b.name}</p>
                                                        {/* <p style={{ color: modelcolorfnc(b) }}>Cutting, Styling, Hair Color, Straightening</p> */}
                                                    </div>

                                                </div>
                                                <div className='select_barber_item_top_border' style={{ background: modelcolorfnc(b) }} />

                                                <div className='select_barber_item_bottom'>
                                                    <div>
                                                        <p style={{ color: modelcolorfnc(b) }}>Next Available Positon</p>
                                                        {/* <p style={{color:modelcolorfnc(b)}}>Position</p> */}
                                                        <p style={{ color: modelcolorfnc(b) }}>{b.queueCount + 1}</p>
                                                    </div>
                                                    <div className='select_barber_item_bottom_border'
                                                        style={{ background: modelcolorfnc(b) }}
                                                    />
                                                    <div>
                                                        <p style={{ color: modelcolorfnc(b) }}>Estimated Time</p>
                                                        {/* <p style={{color:modelcolorfnc(b)}}>Time</p> */}
                                                        <p style={{ color: modelcolorfnc(b) }}>{b.barberEWT} mins</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (<h2>No currently barbers available</h2>)
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
                                                style={{ background: selectedServices.find((select) => select._id === item._id) ? "var(--queue-modal-bg)" : "" }}
                                            >
                                                <div className='select_barber_services_item_header'>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>Service</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>PRICE</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>EWT</h1>
                                                    <div></div>
                                                </div>

                                                <div className='select_barber_services_item_content'>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceName}</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>${item.servicePrice}</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.barberServiceEWT}</h1>
                                                    {item.vipService ? <div><RiVipCrownFill /></div> : <div />}
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

                                                {/* <div>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>(5.0)</h1><p style={{ color: modelcolorfnc2(selectedServices, item) }}>20 reviews</p>
                                                </div> */}

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
                                                style={{ background: selectedServices.find((select) => select._id === item._id) ? "var(--queue-modal-bg)" : "#fff" }}
                                            >
                                                <div className='select_barber_services_item_header'>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>Service</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>PRICE</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>EWT</h1>
                                                    <div></div>
                                                </div>

                                                <div className='select_barber_services_item_content'>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceName}</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>${item.servicePrice}</h1>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceEWT}</h1>
                                                    {item.vipService ? <div><RiVipCrownFill /></div> : <div />}
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

                                                {/* <div>
                                                    <h1 style={{ color: modelcolorfnc2(selectedServices, item) }}>(5.0)</h1><p style={{ color: modelcolorfnc2(selectedServices, item) }}>40 reviews</p>
                                                </div> */}

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
                                        getBarberByServicesKioskloading ? <div><h2>Loading...</h2></div> : getBarberByServicesKioskisSuccess ? getBarberByServicesKioskdata?.response.map((b) => (
                                            <div className='select_barber_item' key={b._id}
                                                onClick={() => searchSelectedBarber(b)}
                                                style={{
                                                    background: selectedBarber === b.name ? "var(--queue-modal-bg)" : "var(--secondary-color)"
                                                }}
                                            >
                                                <div className='select_barber_item_top'>
                                                    <div><img src="./queue-no-image.jpg" alt="barbername" /></div>
                                                    <div>
                                                        <p style={{ color: modelcolorfnc(b) }}>{b.name}</p>
                                                        {/* <p style={{ color: modelcolorfnc(b) }}>Cutting, Styling, Hair Color, Straightening</p> */}
                                                    </div>

                                                </div>
                                                <div className='select_barber_item_top_border' style={{ background: modelcolorfnc(b) }} />

                                                <div className='select_barber_item_bottom'>
                                                    <div>
                                                        <p style={{ color: modelcolorfnc(b) }}>Next Available Position</p>
                                                        {/* <p style={{color:modelcolorfnc(b)}}>Position</p> */}
                                                        <p style={{ color: modelcolorfnc(b) }}>{b.queueCount + 1}</p>
                                                    </div>
                                                    <div className='select_barber_item_bottom_border' style={{ background: modelcolorfnc(b) }} />
                                                    <div>
                                                        <p style={{ color: modelcolorfnc(b) }}>Estimated Time</p>
                                                        {/* <p style={{color:modelcolorfnc(b)}}>Time</p> */}
                                                        <p style={{ color: modelcolorfnc(b) }}>{b.barberEWT} mins</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (<h2>No currently barbers available</h2>)
                                    }

                                </div>

                                {selectedBarber && <div className='select_barber_services_btn'><button onClick={() => selectservicecontinueHandler()}>Continue</button></div>}
                            </>}

                        </Modal>
                    }
                </div>
            </div>
        </main>
    )
}

export default JoinQueue