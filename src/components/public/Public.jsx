import React, { useEffect, useRef, useState } from 'react'
import style from './Public.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from 'react-redux';
import { useAdminConnectKioskMutation, useGerAllAdvertisementsKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByKioskMutation, useLazyGetAllBarbersBySalonIdQuery } from './publicApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLazyGetQlistBySalonIdKioskQuery } from '../QueueList/QueueApiSlice';

const Public = () => {
  
  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [salonId, setSalonId] = useState(adminInfo?.salonId)
  const [salonName, setSalonName] = useState("")


  const [
    getDefaultSalonByKiosk,
    {
      data,
      isSuccess,
      isError,
      error,
      isLoading
    }
  ] = useGetDefaultSalonByKioskMutation()

  const [
    adminConnectKiosk,
    {
      data: adminConnectKioskdata,
      isSuccess: adminConnectKioskisSuccess,
      isError: adminConnectKioskisError,
      error: adminConnectKioskerror,
      isLoading: adminConnectKioskisLoading
    }
  ] = useAdminConnectKioskMutation()

  const [
    getAllSalonsByAdmin,
    {
      data: getAllSalonsByAdmindata,
      isSuccess: getAllSalonsByAdminisSuccess,
      isError: getAllSalonsByAdminisError,
      error: getAllSalonsByAdminerror,
      isLoading: getAllSalonsByAdminisLoading
    }
  ] = useGetAllSalonsByAdminMutation()

  const [
    gerAllAdvertisementsKiosk,
    {
      data: gerAllAdvertisementsKioskdata,
      isSuccess: gerAllAdvertisementsKioskisSuccess,
      isError: gerAllAdvertisementsKioskisError,
      error: gerAllAdvertisementsKioskerror,
      isLoading: gerAllAdvertisementsKioskisLoading
    }
  ] = useGerAllAdvertisementsKioskMutation()

  useEffect(() => {
    if (adminInfo?.email) {
      const salondata = {
        email: adminInfo?.email,
        role: adminInfo?.role
      }
      getDefaultSalonByKiosk(salondata)
      getAllSalonsByAdmin(adminInfo?.email)
    }
  }, [adminInfo])

  useEffect(() => {
    if (adminInfo && isSuccess) {
      setSalonName(data?.response?.salonName)
      setSalonId(data?.response?.salonId)
      gerAllAdvertisementsKiosk(data?.response?.salonId)
    }
  }, [adminInfo, isSuccess])


  useEffect(() => {
    if (adminInfo?.role === "Barber") {
      gerAllAdvertisementsKiosk(adminInfo?.salonId)
    }
  }, [adminInfo])


  useEffect(() => {
    if (adminConnectKioskisSuccess) {
      window.location.reload()
    }
  }, [adminConnectKioskisSuccess])



  const [themecolor, setThemeColor] = useState(false)

  const [
    useLazyGetQlistBySalonIdKioskfunc,
    {
      data: queuelist_data,
      isSuccess: queuelist_success,
      isError: queuelist_isError,
      error: queuelist_error,
      isLoading: queuelist_isLoading
    }
  ] = useLazyGetQlistBySalonIdKioskQuery()

  useEffect(() => {
    if (adminInfo && adminInfo?.salonId) {
      useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
    }

  }, [adminInfo])



  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 0px) and (max-width: 884px)');

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);


  const [
    useLazyGetAllBarbersBySalonIdKioskQuery,
    {
      data: allbarbersdata,
      isSuccess: allbarbersdata_isSuccess,
      isError: allbarbersdata_isError,
      error: allbarbersdata_error,
      isLoading: allbarbersdata_isLoading
    }
  ] = useLazyGetAllBarbersBySalonIdQuery()

  useEffect(() => {
    if (adminInfo && adminInfo?.salonId) {
      useLazyGetAllBarbersBySalonIdKioskQuery(adminInfo?.salonId)
    }

  }, [adminInfo])


  const [barberlist_pages, setBarberlist_pages] = useState(0)

  useEffect(() => {
    setBarberlist_pages(Math.ceil(allbarbersdata?.getAllBarbers?.length / 6))
  }, [allbarbersdata])


  const chunkArray = (array, chunkSize) => {
    const chunks = [];

    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const barberChunks = chunkArray(allbarbersdata?.getAllBarbers || [], 6);

  return (
    <section className={style.kiyosk_dashboard_container}>

      <main className={style.kiyosk_body}
        style={{
          background: themecolor ? "#9ebbc9" : "#dbe9ff"
        }}
      >
        <div className={style.kiyosk_body_left}>

          <div className={style.kiyosk_body_left_top_container}>

            {
              gerAllAdvertisementsKioskisLoading ?
                (<div className={style.carousel_item_container}>
                  <Skeleton count={1} height={"100%"} width={"100%"} style={{ borderRadius: "6px" }} />
                </div>) :
                gerAllAdvertisementsKioskisSuccess && gerAllAdvertisementsKioskdata?.advertisements?.length > 0 ?
                  (<Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={4000}
                    showStatus={false}
                    showArrows={false}
                    stopOnHover={true}
                    showIndicators={true}
                  >
                    {
                      gerAllAdvertisementsKioskdata?.advertisements?.map((advertisement) => {
                        return (
                          <div className={style.carousel_item_container} key={advertisement._id}>
                            <img src={advertisement.url} alt="kyosk_images" />
                          </div>
                        )
                      })
                    }
                  </Carousel>) :
                  (<div className={style.carousel_item_container_error}>
                    <img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="no_image" />
                  </div>)
            }

          </div>


          <div className={style.kiyosk_body_left_bottom_container}>

            {
              allbarbersdata_isLoading ? (<div className={style.barber_onlinelist_container_loader}
              >
                <div className={style.barber_onlinelist_row_loader}>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>

                </div>
                <div className={style.barber_onlinelist_row_loader}>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
                  <div style={{ width: "33%" }}><Skeleton count={1} height={"10rem"} width={"100%"} style={{ borderRadius: "0.6rem" }} /></div>
                </div>
              </div>) : !allbarbersdata_isLoading && allbarbersdata_isSuccess && barberlist_pages > 0 ? (<Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={4000}
                showStatus={false}
                showArrows={false}
                stopOnHover={true}
                showIndicators={true}
              >

                {
                  Array.from({ length: barberlist_pages }).map((_, containerIndex) => (
                    <div key={containerIndex}
                      className={style.barber_onlinelist_container}>
                      {barberChunks[containerIndex]?.map((item, itemIndex) => (
                        <div className={style.barber_online_item}
                          style={{
                            borderLeft: item.isOnline ? "0.5rem solid limegreen" : "0.5rem solid red"
                          }}
                          key={item._id}
                        >
                          <div>
                            <img src={item?.profile?.[0]?.url} alt="img" />
                            <div className={style.barber_online_dot}
                              style={{
                                backgroundColor: item.isOnline ? "limegreen" : "red"
                              }}
                            ></div>
                          </div>
                          <div>
                            <p>{item.name}</p>
                            <p>Queue Count : {item.queueCount}</p>
                            <p>EWT : {item.barberEWT} mins</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                }

              </Carousel>) : null
            }


          </div>

          <div className={style.kiyosk_body_left_mobile_bottom_container}>

            {
              allbarbersdata_isLoading ? (
                <>
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{borderRadius: "0.6rem" }} />
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{borderRadius: "0.6rem" }} />
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{borderRadius: "0.6rem" }} />
                  <Skeleton count={1} height={"10rem"} width={"30rem"} style={{borderRadius: "0.6rem" }} />
                </>
              ) : allbarbersdata_isSuccess && allbarbersdata?.getAllBarbers?.length > 0 ? (<>

                {
                  allbarbersdata?.getAllBarbers?.map((item) => {
                    return (
                      <div className={style.kiyosk_body_left_barber_mobile_item}
                        key={item?._id}
                        style={{
                          borderLeft: item?.isOnline ? "0.5rem solid limegreen" : "0.5rem solid red"
                        }}
                      >
                        <div>
                          <img src={item?.profile?.[0]?.url} alt="img" />
                          <div className={style.barber_online_dot}
                            style={{
                              background: item?.isOnline ? "limegreen" : "red"
                            }}
                          ></div>
                        </div>
                        <div>
                          <p>{item?.name?.length > 12 ? item?.name.slice(0, 12) + "..." : item?.name}</p>
                          <p>Queue Count : {item?.queueCount}</p>
                          <p>EWT : {item?.barberEWT} mins</p>
                        </div>
                      </div>
                    )
                  })
                }

              </>) : null
            }

          </div>
        </div>

        <div className={style.kiyosk_body_right}>
          <div className={style.kiyosk_queuelist_header}
            style={{
              background: themecolor ? "#3A6D8C" : "#fff"
            }}
          >
            <p style={{ color: themecolor ? "#fff" : "#000" }}>#</p>
            <p style={{ color: themecolor ? "#fff" : "#000" }}>Customer</p>
            <p style={{ color: themecolor ? "#fff" : "#000" }}>Barber</p>
            <p style={{ color: themecolor ? "#fff" : "#000" }}>EWT</p>
          </div>

          {
            queuelist_isLoading ?
              (<div className={style.kiyosk_queuelist_body_isLoading}>
                <Skeleton count={isMobile ? 5 : 10} style={{ height: isMobile ? "8rem" : "6rem", marginBottom: "1rem" }} />
              </div>) :
              queuelist_success && queuelist_data?.response?.length > 0 ?
                (<div className={style.kiyosk_queuelist_body}>
                  {
                    queuelist_data?.response?.map((queue, index) => {
                      return (
                        <div className={style.kiyosk_queuelist_item}
                          style={{
                            borderBottom: queuelist_data?.response?.length - 1 === index && "none"
                          }}
                          key={queue._id}
                        >
                          <p>{queue.qPosition}</p>
                          <p>{queue.name}</p>
                          <p>{queue.barberName}</p>
                          <p>{queue.serviceEWT} mins</p>
                        </div>
                      )
                    })
                  }
                </div>) :
                (<div className={style.kiyosk_queuelist_body_error}>
                  <p>No queuelist available</p>
                </div>)
          }

        </div>
      </main>
    </section>
  )
}

export default Public
