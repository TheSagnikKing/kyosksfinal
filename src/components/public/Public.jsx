// import React, { useEffect, useRef, useState } from 'react'
// import style from './Public.module.css'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useSelector } from 'react-redux';
// import { useAdminConnectKioskMutation, useGerAllAdvertisementsKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByKioskMutation, useLazyGetAllBarbersBySalonIdQuery } from './publicApiSlice'
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { useLazyGetQlistBySalonIdKioskQuery } from '../QueueList/QueueApiSlice';

// const Public = () => {

//   const adminInfo = useSelector(selectCurrentAdminInfo)

//   const [salonId, setSalonId] = useState(adminInfo?.salonId)
//   const [salonName, setSalonName] = useState("")


//   const [
//     getDefaultSalonByKiosk,
//     {
//       data,
//       isSuccess,
//       isError,
//       error,
//       isLoading
//     }
//   ] = useGetDefaultSalonByKioskMutation()

//   const [
//     adminConnectKiosk,
//     {
//       data: adminConnectKioskdata,
//       isSuccess: adminConnectKioskisSuccess,
//       isError: adminConnectKioskisError,
//       error: adminConnectKioskerror,
//       isLoading: adminConnectKioskisLoading
//     }
//   ] = useAdminConnectKioskMutation()

//   const [
//     getAllSalonsByAdmin,
//     {
//       data: getAllSalonsByAdmindata,
//       isSuccess: getAllSalonsByAdminisSuccess,
//       isError: getAllSalonsByAdminisError,
//       error: getAllSalonsByAdminerror,
//       isLoading: getAllSalonsByAdminisLoading
//     }
//   ] = useGetAllSalonsByAdminMutation()

//   const [
//     gerAllAdvertisementsKiosk,
//     {
//       data: gerAllAdvertisementsKioskdata,
//       isSuccess: gerAllAdvertisementsKioskisSuccess,
//       isError: gerAllAdvertisementsKioskisError,
//       error: gerAllAdvertisementsKioskerror,
//       isLoading: gerAllAdvertisementsKioskisLoading
//     }
//   ] = useGerAllAdvertisementsKioskMutation()

//   useEffect(() => {
//     if (adminInfo?.email) {
//       const salondata = {
//         email: adminInfo?.email,
//         role: adminInfo?.role
//       }
//       getDefaultSalonByKiosk(salondata)
//       getAllSalonsByAdmin(adminInfo?.email)
//     }
//   }, [adminInfo])

//   useEffect(() => {
//     if (adminInfo && isSuccess) {
//       setSalonName(data?.response?.salonName)
//       setSalonId(data?.response?.salonId)
//       gerAllAdvertisementsKiosk(data?.response?.salonId)
//     }
//   }, [adminInfo, isSuccess])


//   useEffect(() => {
//     if (adminInfo?.role === "Barber") {
//       gerAllAdvertisementsKiosk(adminInfo?.salonId)
//     }
//   }, [adminInfo])


//   useEffect(() => {
//     if (adminConnectKioskisSuccess) {
//       window.location.reload()
//     }
//   }, [adminConnectKioskisSuccess])



//   const [themecolor, setThemeColor] = useState(false)

//   const [
//     useLazyGetQlistBySalonIdKioskfunc,
//     {
//       data: queuelist_data,
//       isSuccess: queuelist_success,
//       isError: queuelist_isError,
//       error: queuelist_error,
//       isLoading: queuelist_isLoading
//     }
//   ] = useLazyGetQlistBySalonIdKioskQuery()

//   useEffect(() => {
//     if (adminInfo && adminInfo?.salonId) {
//       useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
//     }

//   }, [adminInfo])



//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(min-width: 0px) and (max-width: 884px)');

//     const handleMediaQueryChange = (e) => {
//       setIsMobile(e.matches);
//     };

//     mediaQuery.addEventListener('change', handleMediaQueryChange);

//     setIsMobile(mediaQuery.matches);

//     return () => {
//       mediaQuery.removeEventListener('change', handleMediaQueryChange);
//     };
//   }, []);


//   const [
//     useLazyGetAllBarbersBySalonIdKioskQuery,
//     {
//       data: allbarbersdata,
//       isSuccess: allbarbersdata_isSuccess,
//       isError: allbarbersdata_isError,
//       error: allbarbersdata_error,
//       isLoading: allbarbersdata_isLoading
//     }
//   ] = useLazyGetAllBarbersBySalonIdQuery()

//   useEffect(() => {
//     if (adminInfo && adminInfo?.salonId) {
//       useLazyGetAllBarbersBySalonIdKioskQuery({ email: "", salonId: adminInfo?.salonId })
//     }

//   }, [adminInfo])


//   const [barberlist_pages, setBarberlist_pages] = useState(0)

//   useEffect(() => {
//     setBarberlist_pages(Math.ceil(allbarbersdata?.getAllBarbers?.length / 6))
//   }, [allbarbersdata])


//   const chunkArray = (array, chunkSize) => {
//     const chunks = [];

//     for (let i = 0; i < array.length; i += chunkSize) {
//       chunks.push(array.slice(i, i + chunkSize));
//     }
//     return chunks;
//   };

//   const barberChunks = chunkArray(allbarbersdata?.getAllBarbers || [], 6);

//   return (
//     <section className={style.kiyosk_dashboard_container}>

//       <main className={style.kiyosk_body}
//         style={{
//           // background: themecolor ? "#9ebbc9" : "#dbe9ff"
//         }}
//       >
//         <div className={style.kiyosk_body_left}>

//           <div className={style.kiyosk_body_left_top_container}>

//             {
//               gerAllAdvertisementsKioskisLoading ?
//                 (<div className={style.carousel_item_container}>
//                   <Skeleton count={1} height={"100%"} width={"100%"} style={{ borderRadius: "6px" }} />
//                 </div>) :
//                 gerAllAdvertisementsKioskisSuccess && gerAllAdvertisementsKioskdata?.advertisements?.length > 0 ?
//                   (<Carousel
//                     showThumbs={false}
//                     infiniteLoop={true}
//                     autoPlay={true}
//                     interval={4000}
//                     showStatus={false}
//                     showArrows={false}
//                     stopOnHover={true}
//                     showIndicators={true}
//                   >
//                     {
//                       gerAllAdvertisementsKioskdata?.advertisements?.map((advertisement) => {
//                         return (
//                           <div className={style.carousel_item_container} key={advertisement._id}>
//                             <img src={advertisement.url} alt="kyosk_images" />
//                           </div>
//                         )
//                       })
//                     }
//                   </Carousel>) :
//                   (<div className={style.carousel_item_container_error}>
//                     <img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="no_image" />
//                   </div>)
//             }

//           </div>


//           <div className={style.kiyosk_body_left_bottom_container}>

//             {
//               allbarbersdata_isLoading ? (<div className={style.barber_onlinelist_container_loader}
//               >
//                 <div className={style.barber_onlinelist_row_loader}>
//                   <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
//                   <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
//                   <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>

//                 </div>
//                 <div className={style.barber_onlinelist_row_loader}>
//                   <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
//                   <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
//                   <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
//                 </div>
//               </div>) : !allbarbersdata_isLoading && allbarbersdata_isSuccess && barberlist_pages > 0 ? (<Carousel
//                 showThumbs={false}
//                 infiniteLoop={true}
//                 autoPlay={true}
//                 interval={4000}
//                 showStatus={false}
//                 showArrows={false}
//                 stopOnHover={true}
//                 showIndicators={true}
//               >

//                 {
//                   Array.from({ length: barberlist_pages }).map((_, containerIndex) => (
//                     <div key={containerIndex}
//                       className={style.barber_onlinelist_container}>
//                       {barberChunks[containerIndex]?.map((item, itemIndex) => (
//                         <div className={style.barber_online_item}
//                           style={{
//                             borderLeft: item.isOnline ? "0.5rem solid limegreen" : "0.5rem solid red"
//                           }}
//                           key={item._id}
//                         >
//                           <div>
//                             <img src={item?.profile?.[0]?.url} alt="img" />
//                             <div className={style.barber_online_dot}
//                               style={{
//                                 backgroundColor: item.isOnline ? "limegreen" : "red"
//                               }}
//                             ></div>
//                           </div>
//                           <div>
//                             <p>{item.name}</p>
//                             <p>Queue Count : {item.queueCount}</p>
//                             <p>EWT : {item.barberEWT} mins</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))
//                 }

//               </Carousel>) : null
//             }


//           </div>

//           <div className={style.kiyosk_body_left_mobile_bottom_container}>

//             {
//               allbarbersdata_isLoading ? (
//                 <>
//                   <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "0.6rem" }} />
//                   <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "0.6rem" }} />
//                   <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "0.6rem" }} />
//                   <Skeleton count={1} height={"10rem"} width={"30rem"} style={{ borderRadius: "0.6rem" }} />
//                 </>
//               ) : allbarbersdata_isSuccess && allbarbersdata?.getAllBarbers?.length > 0 ? (<>

//                 {
//                   allbarbersdata?.getAllBarbers?.map((item) => {
//                     return (
//                       <div className={style.kiyosk_body_left_barber_mobile_item}
//                         key={item?._id}
//                         style={{
//                           borderLeft: item?.isOnline ? "0.5rem solid limegreen" : "0.5rem solid red"
//                         }}
//                       >
//                         <div>
//                           <img src={item?.profile?.[0]?.url} alt="img" />
//                           <div className={style.barber_online_dot}
//                             style={{
//                               background: item?.isOnline ? "limegreen" : "red"
//                             }}
//                           ></div>
//                         </div>
//                         <div>
//                           <p>{item?.name?.length > 12 ? item?.name.slice(0, 12) + "..." : item?.name}</p>
//                           <p>Queue Count : {item?.queueCount}</p>
//                           <p>EWT : {item?.barberEWT} mins</p>
//                         </div>
//                       </div>
//                     )
//                   })
//                 }

//               </>) : null
//             }

//           </div>
//         </div>

//         <div className={style.kiyosk_body_right}>
//           <div className={style.kiyosk_queuelist_header}
//             style={{
//               background: themecolor ? "#3A6D8C" : "#fff"
//             }}
//           >
//             <p style={{ color: themecolor ? "#fff" : "#000" }}>#</p>
//             <p style={{ color: themecolor ? "#fff" : "#000" }}>Customer</p>
//             <p style={{ color: themecolor ? "#fff" : "#000" }}>Barber</p>
//             <p style={{ color: themecolor ? "#fff" : "#000" }}>EWT</p>
//           </div>

//           {
//             queuelist_isLoading ?
//               (<div className={style.kiyosk_queuelist_body_isLoading}>
//                 <Skeleton count={isMobile ? 5 : 10} style={{ height: isMobile ? "8rem" : "6rem", marginBottom: "1rem" }} />
//               </div>) :
//               queuelist_success && queuelist_data?.response?.length > 0 ?
//                 (<div className={style.kiyosk_queuelist_body}>
//                   {
//                     queuelist_data?.response?.map((queue, index) => {
//                       return (
//                         <div className={style.kiyosk_queuelist_item}
//                           style={{
//                             borderBottom: queuelist_data?.response?.length - 1 === index && "none"
//                           }}
//                           key={queue._id}
//                         >
//                           <p>{queue.qPosition === 1 ? "Next" : queue.qPosition}</p>
//                           <p>{queue.name}</p>
//                           <p>{queue.barberName}</p>
//                           <p>{queue.customerEWT === 0 ? "-" : queue.customerEWT + " " + "mins"}</p>
//                         </div>
//                       )
//                     })
//                   }
//                 </div>)
//                 :
//                 (<div className={style.kiyosk_queuelist_body_error}>
//                   <p>No queuelist available</p>
//                 </div>)
//           }

//         </div>
//       </main>
//     </section>
//   )
// }

// export default Public

import React, { useEffect, useState } from 'react';
import style from './Public.module.css';
import { AddIcon, BackIcon, DeleteIcon, DropdownIcon, PersonIcon, TotalQueueIcon } from '../../icons';
import Marquee from "react-fast-marquee";
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { useSelector } from 'react-redux';
import { useGetDefaultSalonByKioskMutation } from './publicApiSlice';
import { useGetBarberByServicesKioskMutation, useGetServicesByBarberKioskMutation, useJoinQueueKioskMutation, useLazyGetAllSalonServicesKioskQuery, useLazyGetAvailableBarbersForQKioskQuery } from '../JoinQueue/joinqueueApiSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput } from 'react-international-phone';
import { Modal as MuiModal } from '@mui/material';
import { MdClose } from 'react-icons/md'
import { ColorRing } from 'react-loader-spinner';
import { RiVipCrownFill } from 'react-icons/ri';
import Modal from '../modal/Modal';

const Public = () => {

  const barberlists = [0, 1, 2, 3, 4, 5]


  // Kiosk Join Queue logic starts from here

  const adminInfo = useSelector(selectCurrentAdminInfo)

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
    setBarberError("")
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
    setServicesError("")
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
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
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
      navigate('/kiosk')
    } else if (joinQueueKioskisError) {
      toast.error(joinQueueKioskerror?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    }
  }, [joinQueueKioskisSuccess, joinQueueKioskisError, navigate])

  const [invalidNumber, setInvalidNumber] = useState(false)

  const [nameError, setNameError] = useState("")
  const [invalidNumberError, setInvalidNumberError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [servicesError, setServicesError] = useState("")
  const [barberError, setBarberError] = useState("")
  const [mobileNumberError, setMobileNumberError] = useState("")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const joinqueueCheckHandler = () => {
    if (!customerName) {
      toast.error("Please enter customer name", {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      return setNameError("Please enter customer name")
    }

    if (customerName.length === 0 || customerName.length > 20) {
      toast.error("Customer name must be between 1 to 20 characters", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setNameError("Customer name must be between 1 to 20 characters");
    }



    if (mobileNumberError.length > 3 && invalidNumber) {
      toast.error("Invalid Number", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      return setInvalidNumberError("Invalid Number")
    }


    if (customerEmail && !emailRegex.test(customerEmail)) {
      toast.error("Invalid email format", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: "0.3rem",
          background: "#333",
          color: "#fff",
        },
      });
      return setEmailError("Invalid email format");
    }

    if (selecteBarberdata === false) {
      toast.error("Please provide a barber", {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setBarberError("Please provide a barber")
    }

    if (selectedBarberServices.length === 0) {
      toast.error("Please provide a service", {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setServicesError("Please provide a service")
    }


    setJoinqueueModalOpen({
      open: true,
      data: joinqueuedata
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      joinqueueHandler();
    }
  };

  const modelcolorfnc = (b) => {
    const modelcolor = selectedBarber === b.name ? "var(--primary-color)" : "var(--primary-color)"
    return modelcolor
  }

  const modelcolorfnc2 = (selectedServices, item) => {
    // const modelcolor2 = selectedServices.find((select) => select._id === item._id) ? "var(--primary-color)" : "var(--primary-color)"
    // return modelcolor2;
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

  const [countryflag, setCountryFlag] = useState("gb")


  const handlePhoneChange = (phone, meta) => {
    setInvalidNumberError("")
    const { country } = meta;

    // if (phone.length == 3) {
    //     setInvalidNumber(false);
    //     return;
    // }
    setMobileNumberError(phone)

    const isValid = isPhoneValid(phone);

    if (isValid) {
      setMobileNumber(phone);
      setMobileCountryCode(country?.dialCode);
      setCountryFlag(country?.iso2);
      setInvalidNumber(false);
    } else {
      setInvalidNumber(true);
    }
  };


  const [joinqueueModalOpen, setJoinqueueModalOpen] = useState({
    open: false,
    data: {}
  })


  const joinHandler = () => {
    joinQueueKiosk(joinqueueModalOpen.data)
  }

  return (
    <main className={style.container}>
      <div className={style.top}>
        <div>

          <div className={style.top_chip}>
            <div>
              <div><TotalQueueIcon /></div>
              <p>Total Queue</p>
            </div>
            <b>200</b>
          </div>

          <div className={style.top_chip}>
            <div>
              <div><PersonIcon /></div>
              <p>Barbers on duty</p>
            </div>
            <b>10</b>
          </div>

        </div>
      </div>
      <div className={style.middle}>
        <div className={style.joinqueue__main__right__form}>
          <p>Join Queue</p>

          <div className={style.joinqueue__main__right__form_top}>

            <div className={style.common_input_container}>
              <input
                type="text"
                placeholder='Enter Your Full Name'
                value={customerName}
                onChange={(e) => {
                  setNameError("")
                  setCustomerName(e.target.value)
                }}
                onKeyDown={handleKeyPress}
                style={{
                  borderBottom: nameError && "0.1rem solid red"
                }}
              />
              <p className={style.error_message}>{nameError}</p>
            </div>

            <div className={style.phone_input_container}
              onMouseEnter={() => setPhoneinputBorder(true)}
              onMouseLeave={() => setPhoneinputBorder(false)}
              style={{
                borderBottom: phoneinputborder ? "0.1rem solid #000" : invalidNumberError ? "0.1rem solid red" : "0.1rem solid rgba(0,0,0,0.4)"
              }}
              onKeyDown={handleKeyPress}
            >
              <PhoneInput
                forceDialCode={true}
                defaultCountry={countryflag}
                value={mobileNumber}
                onChange={(phone, meta) => handlePhoneChange(phone, meta)}
              />
              <p className={style.error_message}>{invalidNumberError}</p>
            </div>
          </div>

          <div className={style.joinqueue__main__right__form_middle}>

            <div className={style.common_input_container}>
              <input
                type="text"
                placeholder='Enter Your Email ID (Optional)'
                value={customerEmail}
                onChange={(e) => {
                  setEmailError("")
                  setCustomerEmail(e.target.value)
                }}
                onKeyDown={handleKeyPress}
                style={{
                  borderBottom: emailError && "0.1rem solid red"
                }}
              />
              <p className={style.error_message}>{emailError}</p>
            </div>
          </div>

          <div className={style.joinqueue__main__right__form_bottom}>
            <div className={style.common_input_type2_container} onClick={SelectBarberDropdownHandler}>
              <input
                type="text"
                placeholder="Select Barber"
                value={selecteBarberdata === false ? "" : selecteBarberdata}
                readOnly
                style={{
                  borderBottom: barberError && "0.1rem solid red"
                }}
              />
              <p className={style.error_message}>{barberError}</p>
              <div style={{ cursor: "pointer" }}><DropdownIcon /></div>
            </div>

            <div className={style.common_input_type2_container} onClick={SelectServicesDropdownHandler}>
              <input
                type="text"
                placeholder="Select Services"
                value={selectedBarberServices.map((s) => s.serviceName + " ")}
                readOnly
                style={{
                  borderBottom: servicesError && "0.1rem solid red"
                }}
              />
              <p className={style.error_message}>{servicesError}</p>
              <div style={{ cursor: "pointer" }}><DropdownIcon /></div>
            </div>

          </div>

          <button className={style.joinqueuebtn} onClick={joinqueueCheckHandler}>Join</button>

          {
            isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} setModal1={setModal1} setModal2={setModal2} setModal3={setModal3} setModal4={setModal4} setSelectedServices={setSelectedServices} setSelectedBarber={setSelectedBarber}>
              {modal1 && <>
                <p className={style.modal_header}>Select Barber</p>
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
                        height="60"
                        width="60"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#000"]}
                      /></div> :
                      getavailablebarberisSuccess && getavailablebarberdata?.response?.length > 0 ? getavailablebarberdata?.response?.map((b) => (
                        <div className={style.select_barber_item}
                          style={{
                            border: selectedBarber === b.name && "0.1rem solid var(--primary-color)",
                          }}
                          key={b.barberId}
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
                                  <p>{b?.barberServices?.[0]?.serviceName} {b?.barberServices?.length - 1 === 0 ? null : <span>+ {b?.barberServices?.length - 1} more</span>}</p>
                                </div>
                              </div>
                            </div>

                            <div className={style.select_barber_item_top_right}>
                              <div>
                                <p>Queueing</p>
                                <p>{b?.queueCount === 0 ? "Next" : b?.queueCount}</p>
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
                      )) : (<div className={style.barber_service_error}><p>No currently barbers available</p></div>)
                  }

                </div>

                {selectedBarber && <div className={style.select_barber_services_btn}><button onClick={selectbarberHandler}>Select Services</button></div>}
              </>}

              {modal2 && <>
                <div className={style.select__barber__modal2__head}>
                  <div onClick={modaltwobackHandler}><BackIcon /></div>
                  <p>Select Services</p>
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
                          height="60"
                          width="60"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={["#000"]}
                        /></div> :
                      getServicesByBarberisSuccess && getServicesByBarberdata?.response?.length > 0 ? getServicesByBarberdata?.response?.map((item) => (
                        <div className={style.select_barber_services_item} key={item._id}
                          style={{
                            border: selectedServices.find((select) => select._id === item._id) && "0.1rem solid var(--primary-color)",
                          }}
                        >
                          <div className={style.select_barber_services_item_header}>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>Service</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>PRICE</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>EWT</p>
                            <p>Type</p>
                          </div>

                          <div className={style.select_barber_services_item_content}>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceName}</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{getDefaultSalonByAdmindata?.response?.currency}{item.servicePrice}</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.barberServiceEWT}{" "}mins</p>
                            {item.vipService ? <div><RiVipCrownFill /></div> : <div>-</div>}
                            {
                              selectedServices.find((select) => select._id === item._id) ?
                                <div onClick={() => deleteSelectServicesHandler(item._id)}
                                  className={style.delete_btn}
                                ><DeleteIcon /></div> :
                                <div onClick={() => selectedServicesHandler(item)}
                                  className={style.add_btn}
                                ><AddIcon /></div>
                            }


                          </div>

                        </div>
                      )) :
                        <div className={style.select_barber_services_item_error}>
                          <p>No services available</p>
                        </div>
                  }

                </div>
                {selectedServices.length > 0 && <div className={style.select_barber_services_btn}><button onClick={selectbarbercontinueHandler}>Continue</button></div>}
              </>}

              {modal3 && <>
                <p className={style.modal_header}>Select Services</p>
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
                        height="60"
                        width="60"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#000"]}
                      /></div> :
                      getAllSalonServicesisSuccess && getAllSalonServicesdata?.response?.length > 0 ? getAllSalonServicesdata?.response?.map((item) => (
                        <div className={style.select_barber_services_item} key={item._id}
                          style={{
                            border: selectedServices.find((select) => select._id === item._id) && "0.1rem solid var(--primary-color)",
                          }}
                        >
                          <div className={style.select_barber_services_item_header}>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>Service</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>PRICE</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>EWT</p>
                            <p>Type</p>
                          </div>

                          <div className={style.select_barber_services_item_content}>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceName}</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{getDefaultSalonByAdmindata?.response?.currency}{item.servicePrice}</p>
                            <p style={{ color: modelcolorfnc2(selectedServices, item) }}>{item.serviceEWT}{" "}mins</p>
                            {item.vipService ? <div><RiVipCrownFill /></div> : <div>-</div>}
                            {
                              selectedServices.find((select) => select._id === item._id) ?
                                <div onClick={() => deleteSelectServicesHandler(item._id)}
                                  className={style.delete_btn}
                                ><DeleteIcon /></div> :
                                <div onClick={() => selectedServicesHandler(item)}
                                  className={style.add_btn}
                                ><AddIcon /></div>
                            }


                          </div>

                        </div>
                      )) :
                        <div className={style.select_barber_services_item_error}>
                          <p>No services available</p>
                        </div>

                  }

                </div>
                {selectedServices.length > 0 && <div className={style.select_barber_services_btn}><button onClick={selectserviceHandler}>Select Barber</button></div>}
              </>}

              {modal4 && <>
                <div className={style.select__barber__modal2__head}>
                  <div onClick={modalfourbackHandler}><BackIcon /></div>
                  <p>Select Barber </p>
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
                        height="60"
                        width="60"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#000"]}
                      /></div> : getBarberByServicesKioskisSuccess && getBarberByServicesKioskdata?.response?.length > 0 ? getBarberByServicesKioskdata?.response?.map((b) => (
                        <div className={style.select_barber_item}
                          style={{
                            border: selectedBarber === b.name && "0.1rem solid var(--primary-color)",
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
                                  <p>{b?.barberServices?.[0]?.serviceName} {b?.barberServices?.length - 1 === 0 ? null : <span>+ {b?.barberServices?.length - 1} more</span>}</p>
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
                      )) : (<div className={style.barber_service_error}><p>No currently barbers available</p></div>)
                  }

                </div>

                {selectedBarber && <div className={style.select_barber_services_btn}><button onClick={() => selectservicecontinueHandler()}>Continue</button></div>}
              </>}

            </Modal>
          }

          <MuiModal
            open={joinqueueModalOpen.open}
            onClose={() => setJoinqueueModalOpen({
              open: false,
              data: {}
            })}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <main className={style.joinqueueModalContainer}>
              <div className={style.modal_head_content}>
                <p>Are you sure ?</p>
                <button onClick={() => setJoinqueueModalOpen({
                  open: false,
                  data: {}
                })} style={{ cursor: "pointer" }}><MdClose /></button>
              </div>

              <div className={style.join_queue_modal_content_container}>
                <p>Customer Name - <span>{joinqueueModalOpen?.data?.name}</span></p>
                <p>Barber Name - <span>{joinqueueModalOpen?.data?.barberName}</span></p>
                <p>Services - </p>
                <div>
                  {
                    joinqueueModalOpen?.data?.services?.map((ser, index) => {
                      return (

                        <div className={style.select_barber_services_item_modal} key={index}>
                          <div className={style.select_barber_services_item_header_modal}>
                            <p>Service</p>
                            <p>PRICE</p>
                            <p>EWT</p>
                            <p>Type</p>
                          </div>
                          <div className={style.select_barber_services_item_content_modal}>
                            <p>{ser.serviceName}</p>
                            <p>{getDefaultSalonByAdmindata?.response?.currency}{ser.servicePrice}</p>
                            <p>{ser.barberServiceEWT}{" "}mins</p>
                            {ser.vipService ? <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><RiVipCrownFill /></p> : <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> - </p>}
                          </div>

                        </div>
                      );
                    })
                  }
                </div>
              </div>

              {joinQueueKioskloading ? <button className={style.modaljoinqueue_btn}><ColorRing
                visible={true}
                height="4rem"
                width="4rem"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              /></button> : <button className={style.modaljoinqueue_btn} onClick={joinHandler}>Join</button>}

            </main>
          </MuiModal>

        </div>
      </div>

      <div className={style.end}>
        <Marquee
          speed={50}
          gradient={true}
          pauseOnHover={true}
          className={style.marquee}
        >
          {barberlists.map((_, index) => (
            <div key={index} className={style.marqueeItem}>
              <div>
                <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZAiN-sSCwI83NmjIYgDdUi8p-xDXlz9HvQw&s" alt="" /></div>
                <div>
                  <p>Adilson Jacinto</p>
                  <p>Waiting Time - 120mins</p>
                </div>
              </div>

              <div>
                <p>Q-Position</p>
                <p>Next</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>


    </main>
  );
}

export default Public;

