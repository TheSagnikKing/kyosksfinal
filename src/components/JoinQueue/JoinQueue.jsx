import React, { useEffect, useState } from 'react'
import style from './JoinQueue.module.css'
import { AddIcon, BackIcon, DeleteIcon, DropdownIcon } from '../../icons'
import Modal from '../modal/Modal'
import { useGetBarberByServicesKioskMutation, useGetServicesByBarberKioskMutation, useJoinQueueKioskMutation, useLazyGetAllSalonServicesKioskQuery, useLazyGetAvailableBarbersForQKioskQuery } from './joinqueueApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { ColorRing } from 'react-loader-spinner'
import { RiVipCrownFill } from 'react-icons/ri'

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'
import CommonHeader from '../CommonHeader/CommonHeader'
import { PhoneNumberUtil } from 'google-libphonenumber';

const JoinQueue = () => {

    const adminInfo = useSelector(selectCurrentAdminInfo)

    // const GetDefaultSalonByKiosk

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata,
            isSuccess: getDefaultSalonByAdminisSuccess,
            isError: getDefaultSalonByAdminisError,
            error: getDefaultSalonByAdminerror,
            isLoading: getDefaultSalonByAdminisLoading
        }
    ] = useGetDefaultSalonByKioskMutation()


    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo?.email,
                role: adminInfo?.role
            }
            getDefaultSalonByAdmin(salondata)
        }
    }, [adminInfo])

    // console.log("join queue default salon ", getDefaultSalonByAdmindata)

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

    // console.log(selectedBarberId)

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

    const [mobileCountryCode, setMobileCountryCode] = useState("")

    const joinqueuedata = {
        salonId: adminInfo?.salonId,
        name: customerName,
        customerEmail: customerEmail,
        joinedQType: "Single-Join",
        methodUsed: "Walk-In",
        mobileNumber: Number(mobileNumber),
        mobileCountryCode: Number(mobileCountryCode),
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

    const [invalidNumber, setInvalidNumber] = useState(false)

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
        } else if (invalidNumber) {
            toast.error("Invalid Mobile Number", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            console.log("Join Kiosk Data ", joinqueuedata)
            joinQueueKiosk(joinqueuedata)
        }
    }

    const modelcolorfnc = (b) => {
        const modelcolor = selectedBarber === b.name ? "var(--primary-color)" : "var(--primary-color)"
        return modelcolor
    }

    const modelcolorfnc2 = (selectedServices, item) => {
        const modelcolor2 = selectedServices.find((select) => select._id === item._id) ? "var(--primary-color)" : "var(--primary-color)"
        return modelcolor2;
    }

    const [themecolor, setThemeColor] = useState(false)

    const [phoneinputborder, setPhoneinputBorder] = useState(false)

    const phoneUtil = PhoneNumberUtil.getInstance();

    const isPhoneValid = (phone) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
        } catch (error) {
            return false;
        }
    };



    const handlePhoneChange = (phone, meta) => {

        const { country, inputValue } = meta;

        const isValid = isPhoneValid(phone);

        if (isValid) {
            console.log(phone)
            setMobileNumber(phone)
            setMobileCountryCode(country?.dialCode)
            setInvalidNumber(false)
        } else {
            setInvalidNumber(true)
        }

    };

    // console.log(mobileNumber)
    // console.log(mobileCountryCode)

    return (
        <>
            <CommonHeader
                themecolor={themecolor}
                setThemeColor={setThemeColor}
            />

            <main className={style.joinqueue_container}>
                <div className={style.joinqueue_container_left}>
                    <img src="/Forgot_Password.png" alt="joinqueue" />
                </div>
                <div className={style.joinqueue_container_right}>

                    <div className={style.joinqueue__main__right__form}>
                        <h1>Join Queue</h1>

                        <div className={style.joinqueue__main__right__form_top}>

                            <div className={style.common_input_container}>
                                <input
                                    type="text"
                                    placeholder='Enter Your Full Name'
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />

                            </div>

                            <div className={style.phone_input_container}
                                onMouseEnter={() => setPhoneinputBorder(true)}
                                onMouseLeave={() => setPhoneinputBorder(false)}
                                style={{
                                    borderBottom: phoneinputborder ? "1px solid #0a84ff" : "1px solid rgba(0,0,0,0.6)"
                                }}
                            >
                                <PhoneInput
                                    forceDialCode={true}
                                    defaultCountry="gb"
                                    value={mobileNumber}
                                    onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                                />
                            </div>
                        </div>

                        <div className={style.joinqueue__main__right__form_middle}>

                            <div className={style.common_input_container}>
                                <input
                                    type="text"
                                    placeholder='Enter Your Email ID (Optional)'
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                />

                            </div>
                        </div>

                        <div className={style.joinqueue__main__right__form_bottom}>
                            <div className={style.common_input_type2_container}>
                                <input
                                    type="text"
                                    placeholder="Select Barber"
                                    value={selecteBarberdata === false ? "" : selecteBarberdata}
                                />
                                <div onClick={SelectBarberDropdownHandler} style={{ cursor: "pointer" }}><DropdownIcon /></div>
                            </div>

                            <div className={style.common_input_type2_container}>
                                <input
                                    type="text"
                                    placeholder="Select Services"
                                    value={selectedBarberServices.map((s) => s.serviceName + " ")}
                                />
                                <div onClick={SelectServicesDropdownHandler} style={{ cursor: "pointer" }}><DropdownIcon /></div>
                            </div>

                        </div>

                        {joinQueueKioskloading ? <button className={style.joinqueuebtn}><ColorRing
                            visible={true}
                            height="4rem"
                            width="4rem"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /></button> : <button className={style.joinqueuebtn} onClick={joinqueueHandler}>Join</button>}

                        {
                            isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} setModal1={setModal1} setModal2={setModal2} setModal3={setModal3} setModal4={setModal4} setSelectedServices={setSelectedServices} setSelectedBarber={setSelectedBarber}>
                                {modal1 && <>
                                    <h1>Select Barber</h1>
                                    <div className={style.select_barber_container}>
                                        {
                                            getavailablebarberloading ? <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                width: "100%"
                                            }}><ColorRing
                                                    visible={true}
                                                    height="80"
                                                    width="80"
                                                    ariaLabel="color-ring-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="color-ring-wrapper"
                                                    colors={["#000"]}
                                                /></div> : getavailablebarberisSuccess && getavailablebarberdata?.response?.length > 0 ? getavailablebarberdata?.response?.map((b) => (
                                                    <div className={style.select_barber_item}
                                                        style={{
                                                            background: selectedBarber === b.name ? "#0a84ff37" : "var(--secondary-color)",
                                                            border: selectedBarber === b.name && "1px solid #0a84ff",
                                                        }}
                                                        key={b._id}
                                                        onClick={() => searchSelectedBarber(b)}
                                                    >
                                                        <div className={style.select_barber_item_top}>
                                                            <div className={style.select_barber_item_top_left}>
                                                                <div>
                                                                    <div>
                                                                        {b?.profile?.[0]?.url ? (
                                                                            <img src={b.profile[0].url} alt="barbername" />
                                                                        ) : (
                                                                            <img src="./queue-no-image.jpg" alt="barbername" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        <p>{b?.name}</p>
                                                                        <p>{b?.barberServices?.[0]?.serviceName.length > 15 ? b?.barberServices?.[0]?.serviceName + "..." : b?.barberServices?.[0]?.serviceName} &nbsp; +{b?.barberServices?.length} more</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={style.select_barber_item_top_right}>
                                                                <div>
                                                                    <p>Queueing</p>
                                                                    <p>{b?.queueCount}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={style.select_barber_item_bottom}>
                                                            <div>
                                                                <div>
                                                                    <p>Next available position</p>
                                                                    <p>{b?.queueCount + 1}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <p>Estimated Time</p>
                                                                    <p>{b?.barberEWT} mins</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : (<div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    width: "100%"
                                                }}><h2>No currently barbers available</h2></div>)
                                        }

                                    </div>

                                    {selectedBarber && <div className={style.select_barber_services_btn}><button onClick={selectbarberHandler}>Select Services</button></div>}
                                </>}

                                {modal2 && <>
                                    <div className={style.select__barber__modal2__head}>
                                        <div onClick={modaltwobackHandler}><BackIcon /></div>
                                        <h1>Select Services</h1>
                                    </div>
                                    <div className={style.select_barber_services_container}>
                                        {
                                            getServicesByBarberloading ?
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    width: "100%"
                                                }}><ColorRing
                                                        visible={true}
                                                        height="80"
                                                        width="80"
                                                        ariaLabel="color-ring-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="color-ring-wrapper"
                                                        colors={["#000"]}
                                                    /></div> :
                                                getServicesByBarberisSuccess && getServicesByBarberdata?.response?.length > 0 ? getServicesByBarberdata?.response?.map((item) => (
                                                    <div className={style.select_barber_services_item} key={item._id}
                                                        style={{
                                                            background: selectedServices.find((select) => select._id === item._id) ? "#0a84ff37" : "var(--secondary-color)",
                                                            border: selectedServices.find((select) => select._id === item._id) && "1px solid #0a84ff",
                                                        }}
                                                    >
                                                        <div className={style.select_barber_services_item_header}>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>Service</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>PRICE</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>EWT</p>
                                                            <div></div>
                                                        </div>

                                                        <div className={style.select_barber_services_item_content}>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceName}</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{getDefaultSalonByAdmindata?.response?.currency}{item.servicePrice}</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.barberServiceEWT}{" "}mins</p>
                                                            {item.vipService ? <div><RiVipCrownFill /></div> : <div />}
                                                            {
                                                                selectedServices.find((select) => select._id === item._id) ?
                                                                    <div onClick={() => deleteSelectServicesHandler(item._id)}
                                                                        style={{
                                                                            border: "1px solid rgba(0,0,0,0.2)",
                                                                            color: "red"
                                                                        }}
                                                                    ><DeleteIcon /></div> :
                                                                    <div onClick={() => selectedServicesHandler(item)}
                                                                        style={{
                                                                            border: "1px solid rgba(0,0,0,0.2)",
                                                                            color: "#1e2f97"
                                                                        }}
                                                                    ><AddIcon /></div>
                                                            }


                                                        </div>

                                                    </div>
                                                )) :
                                                    <div className={style.select_barber_services_item_error}>
                                                        <h2>No services available</h2>
                                                    </div>
                                        }

                                    </div>
                                    {selectedServices.length > 0 && <div className={style.select_barber_services_btn}><button onClick={selectbarbercontinueHandler}>Continue</button></div>}
                                </>}

                                {modal3 && <>
                                    <h1>Select Services</h1>
                                    <div className={style.select_barber_services_container}>
                                        {
                                            getAllSalonServicesloading ? <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                width: "100%"
                                            }}><ColorRing
                                                    visible={true}
                                                    height="80"
                                                    width="80"
                                                    ariaLabel="color-ring-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="color-ring-wrapper"
                                                    colors={["#000"]}
                                                /></div> :
                                                getAllSalonServicesisSuccess && getAllSalonServicesdata?.response?.length > 0 ? getAllSalonServicesdata?.response?.map((item) => (
                                                    <div className={style.select_barber_services_item} key={item._id}
                                                        style={{
                                                            background: selectedServices.find((select) => select._id === item._id) ? "#0a84ff37" : "var(--secondary-color)",
                                                            border: selectedServices.find((select) => select._id === item._id) && "1px solid #0a84ff",
                                                        }}
                                                    >
                                                        <div className={style.select_barber_services_item_header}>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>Service</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>PRICE</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>EWT</p>
                                                            <div></div>
                                                        </div>

                                                        <div className={style.select_barber_services_item_content}>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceName}</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{getDefaultSalonByAdmindata?.response?.currency}{item.servicePrice}</p>
                                                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceEWT}{" "}mins</p>
                                                            {item.vipService ? <div><RiVipCrownFill /></div> : <div />}
                                                            {
                                                                selectedServices.find((select) => select._id === item._id) ?
                                                                    <div onClick={() => deleteSelectServicesHandler(item._id)}
                                                                        style={{
                                                                            border: "1px solid rgba(0,0,0,0.2)",
                                                                            color: "red"
                                                                        }}
                                                                    ><DeleteIcon /></div> :
                                                                    <div onClick={() => selectedServicesHandler(item)}
                                                                        style={{
                                                                            border: "1px solid rgba(0,0,0,0.2)",
                                                                            color: "#1e2f97"
                                                                        }}
                                                                    ><AddIcon /></div>
                                                            }


                                                        </div>

                                                    </div>
                                                )) :
                                                    <div className={style.select_barber_services_item_error}>
                                                        <h2>No services available</h2>
                                                    </div>

                                        }

                                    </div>
                                    {selectedServices.length > 0 && <div className={style.select_barber_services_btn}><button onClick={selectserviceHandler}>Select Barber</button></div>}
                                </>}

                                {modal4 && <>
                                    <div className={style.select__barber__modal2__head}>
                                        <div onClick={modalfourbackHandler}><BackIcon /></div>
                                        <h1>Select Barber </h1>
                                    </div>
                                    <div className={style.select_barber_container}>
                                        {
                                            getBarberByServicesKioskloading ? <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                width: "100%"
                                            }}><ColorRing
                                                    visible={true}
                                                    height="80"
                                                    width="80"
                                                    ariaLabel="color-ring-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="color-ring-wrapper"
                                                    colors={["#000"]}
                                                /></div> : getBarberByServicesKioskisSuccess && getBarberByServicesKioskdata?.response?.length > 0 ? getBarberByServicesKioskdata?.response?.map((b) => (
                                                    <div className={style.select_barber_item}
                                                        style={{
                                                            background: selectedBarber === b.name ? "#0a84ff37" : "var(--secondary-color)",
                                                            border: selectedBarber === b.name && "1px solid #0a84ff",
                                                        }}
                                                        key={b._id}
                                                        onClick={() => searchSelectedBarber(b)}
                                                    >
                                                        <div className={style.select_barber_item_top}>
                                                            <div className={style.select_barber_item_top_left}>
                                                                <div>
                                                                    <div>
                                                                        {b?.profile?.[0]?.url ? (
                                                                            <img src={b.profile[0].url} alt="barbername" />
                                                                        ) : (
                                                                            <img src="./queue-no-image.jpg" alt="barbername" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        <p>{b?.name}</p>
                                                                        <p>{b?.barberServices?.[0]?.serviceName.length > 15 ? b?.barberServices?.[0]?.serviceName + "..." : b?.barberServices?.[0]?.serviceName} &nbsp; +{b?.barberServices?.length} more</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={style.select_barber_item_top_right}>
                                                                <div>
                                                                    <p>Queueing</p>
                                                                    <p>{b?.queueCount}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={style.select_barber_item_bottom}>
                                                            <div>
                                                                <div>
                                                                    <p>Next available position</p>
                                                                    <p>{b?.queueCount + 1}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <p>Estimated Time</p>
                                                                    <p>{b?.barberEWT} mins</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : (<div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    width: "100%"
                                                }}><h2>No currently barbers available</h2></div>)
                                        }

                                    </div>

                                    {selectedBarber && <div className={style.select_barber_services_btn}><button onClick={() => selectservicecontinueHandler()}>Continue</button></div>}
                                </>}

                            </Modal>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default JoinQueue