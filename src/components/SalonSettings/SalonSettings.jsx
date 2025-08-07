import React, { useEffect, useState } from 'react'
import style from './SalonSettings.module.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeSalonOnlineStatusKioskMutation, useKioskBookingAvailabilityStatusMutation, useMobileBookingAvailabilityStatusMutation } from '../Dashboard/dashboardApiSlice'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Switch from "react-switch";
import { useNavigate } from 'react-router-dom'
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'

const SalonSettings = () => {

  const { colors, currentTheme } = useSelector(state => state.theme);
  const { modecolors } = useSelector(state => state.modeColor)


  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [salonbtnCheck, setSalonbtnCheck] = useState(null)


  useEffect(() => {
    if (adminInfo) {
      setSalonbtnCheck(adminInfo?.isSalonOnline)
    }
  }, [adminInfo])

  const [
    changeSalonOnlineStatusKiosk,
    {
      data,
      isSuccess,
      isError,
      error,
      isLoading
    }
  ] = useChangeSalonOnlineStatusKioskMutation()


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      setTimeout(() => {
        window.location.reload()
      }, 500)

      setSalonbtnCheck(data?.response?.isOnline)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      setSalonbtnCheck(adminInfo?.isSalonOnline)
    }
  }, [isError])


  const salonOnlineHandler = () => {
    const confirm = window.confirm("Change Salon Status ?")

    const salondata = {
      salonId: adminInfo?.salonId,
      isOnline: !salonbtnCheck
    }

    if (confirm) {
      changeSalonOnlineStatusKiosk(salondata)
    }

  }

  // For the mobile Part

  const [mobilebtnCheck, setMobilebtnCheck] = useState(false)
  const [kioskbtnCheck, setKioskbtnCheck] = useState(false)

  // console.log("AdminInfo ", adminInfo?.mobileBookingAvailability)

  useEffect(() => {
    if (adminInfo) {
      setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
      setKioskbtnCheck(adminInfo?.kioskAvailability)
    }
  }, [adminInfo])

  const mobileBookdata = {
    salonId: adminInfo?.salonId,
    mobileBookingAvailability: !adminInfo?.mobileBookingAvailability
  }

  const kioskBookdata = {
    salonId: adminInfo?.salonId,
    kioskAvailability: !adminInfo?.kioskAvailability
  }


  const [
    mobileBookingAvailabilityStatus,
    {
      data: mobilebookdata,
      isSuccess: mobilebookisSuccess,
      isError: mobilebookdataisError,
      error: mobilebookError,
      isLoading: mobilebookisLoading
    }
  ] = useMobileBookingAvailabilityStatusMutation()

  const [
    kioskBookingAvailabilityStatus,
    {
      data: kioskbookdata,
      isSuccess: kioskbookisSuccess,
      isError: kioskbookdataisError,
      error: kioskbookError,
      isLoading: kioskbookisLoading
    }
  ] = useKioskBookingAvailabilityStatusMutation()


  useEffect(() => {
    if (mobilebookisSuccess) {
      toast.success(mobilebookdata?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      setTimeout(() => {
        window.location.reload()
      }, 500)

      setMobilebtnCheck(mobilebookdata?.response?.mobileBookingAvailability)
    }
  }, [mobilebookisSuccess])

  useEffect(() => {
    if (mobilebookdataisError) {
      toast.error(mobilebookError?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
    }
  }, [mobilebookdataisError])


  const mobileBookOnlineHandler = () => {
    const confirm = window.confirm("Change Mobile Book Status ?")

    if (confirm) {
      mobileBookingAvailabilityStatus(mobileBookdata)
    }

  }


  useEffect(() => {
    if (kioskbookisSuccess) {
      toast.success(kioskbookdata?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      setTimeout(() => {
        window.location.reload()
      }, 500)

      setKioskbtnCheck(kioskBookdata?.response?.kioskAvailability)
    }
  }, [kioskbookisSuccess])

  useEffect(() => {
    if (kioskbookdataisError) {
      toast.error(kioskbookError?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--tertiary-text)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      setKioskbtnCheck(adminInfo?.kioskAvailability)
    }
  }, [kioskbookdataisError])


  const kioskBookOnlineHandler = () => {
    const confirm = window.confirm("Change Kiosk Status ?")

    if (confirm) {
      kioskBookingAvailabilityStatus(kioskBookdata)
    }

  }


  const [
    getDefaultSalonByKiosk,
    {
      data: defaultsalondata,
      isLoading: defaultsalonisLoading,
      isSuccess: defaultsalonsuccess,
      isError: defaultsalonisError,
      error: defaultsalonerror
    }
  ] = useGetDefaultSalonByKioskMutation()

  useEffect(() => {
    if (adminInfo?.email) {
      const salondata = {
        email: adminInfo?.email,
        role: adminInfo?.role
      }
      getDefaultSalonByKiosk(salondata)
    }
  }, [adminInfo])

  const settingsData = [
    {
      id: 1,
      name: "Salon Status",
      desc: "The system will disable the availability of all barbers and mobile bookings, effectively setting their Status to offline or shutting them down.",
      value: adminInfo?.isSalonOnline,
      img: "./shop.png",
      handler: salonOnlineHandler
    },
    {
      id: 2,
      name: "Mobile Queuing",
      desc: "Mobile Queuing can be set to online or offline. When offline, will not be able to join the queue through the app.",
      value: adminInfo?.mobileBookingAvailability,
      img: "./mobile.png",
      handler: mobileBookOnlineHandler
    },
    {
      id: 3,
      name: "Kiosk Queuing",
      desc: "Kiosk Queuing can be set to online or offline. When offline, Customers will not be able to join the queue through the kiosk.",
      value: adminInfo?.kioskAvailability,
      img: "./Kiosk.png",
      handler: kioskBookOnlineHandler
    },
  ]

  const [a, setA] = useState(false)
  return (
    <section className={style.salon_settings_container}
      style={{
        backgroundColor: colors.color4
      }}
    >
      <div className={style.salon_settings_left}>
        <img src="./My_Bookings.png" alt="salon_settings_img" />
      </div>
      <div className={style.salon_settings_right}>
        <h2>Salon Settings</h2>

        <div className={style.salon_main_container}>
          <div
            style={{
              backgroundColor: colors.cardColor,
              border: `0.1rem solid ${colors.queueBorder}`,
            }}
            className={style.settings_item}>
            <div style={{
              borderRight: `0.1rem solid ${colors.queueBorder}`
            }}>
              <div>
                <div><img src={settingsData[0]?.img} alt="" style={{ filter: currentTheme === "Dark" ? "brightness(0) invert(1)" : "brightness(0) invert(0)" }} /></div>
                <h2>{settingsData[0].name}</h2>
                <div>
                  {
                    typeof settingsData[0].value === 'boolean' ? (
                      <Switch
                        width={80}
                        handleDiameter={20}
                        offColor="#F44336"
                        onColor="#00A36C"
                        uncheckedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: "1.4rem",
                              fontWeight: "600",
                              color: "#F4F4F5",
                              paddingRight: "1.5rem",
                            }}
                          >
                            Offline
                          </div>
                        }
                        checkedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: "1.4rem",
                              fontWeight: "600",
                              color: "#F4F4F5",
                              paddingLeft: "1.5rem"
                            }}
                          >
                            Online
                          </div>
                        }
                        onChange={() => settingsData[0]?.handler()}
                        checked={settingsData[0].value}
                      />
                    ) : (
                      <div style={{ height: "2.8rem" }} />
                    )
                  }

                </div>
              </div>
            </div>
            <div>
              <p>{settingsData[0].desc}</p>
            </div>
          </div>


          <div>


            {
              settingsData.map((item, index) => {
                if (index === 0) return null;

                return (
                  <div
                    style={{
                      backgroundColor: colors.cardColor,
                      border: `0.1rem solid ${colors.queueBorder}`
                    }}
                    className={style.settings_item} key={item.id}>
                    <div style={{
                      borderRight: `0.1rem solid ${colors.queueBorder}`
                    }}>
                      <div>
                        <div><img src={item.img} alt="" style={{ filter: currentTheme === "Dark" ? "brightness(0) invert(1)" : "brightness(0) invert(0)" }} /></div>
                        <h2>{item.name}</h2>
                        <div>
                          {/* <Switch
                            width={80}
                            handleDiameter={20}
                            offColor="#F44336"
                            onColor="#00A36C"
                            uncheckedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: "1.4rem",
                                  fontWeight: "600",
                                  color: "#F4F4F5",
                                  paddingRight: "1.5rem",
                                }}
                              >
                                Offline
                              </div>
                            }
                            checkedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: "1.4rem",
                                  fontWeight: "600",
                                  color: "#F4F4F5",
                                  paddingLeft: "1.5rem"
                                }}
                              >
                                Online
                              </div>
                            }
                            onChange={() => item?.handler()}
                            checked={item.value}
                          /> */}

                          {typeof item?.value === 'boolean' ? (
                            <Switch
                              width={80}
                              handleDiameter={20}
                              offColor="#F44336"
                              onColor="#00A36C"
                              uncheckedIcon={
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: "1.4rem",
                                    fontWeight: "600",
                                    color: "#F4F4F5",
                                    paddingRight: "1.5rem",
                                  }}
                                >
                                  Offline
                                </div>
                              }
                              checkedIcon={
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: "1.4rem",
                                    fontWeight: "600",
                                    color: "#F4F4F5",
                                    paddingLeft: "1.5rem",
                                  }}
                                >
                                  Online
                                </div>
                              }
                              onChange={() => item?.handler()}
                              checked={item.value}
                            />

                          ) : (<div style={{ height: "2.8rem" }} />)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                )
              })
            }


          </div>
        </div>

      </div>
    </section>
  )
}

export default SalonSettings

