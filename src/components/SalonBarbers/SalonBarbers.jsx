import React, { useEffect } from 'react'
import style from './SalonBarbers.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGlobal } from '../../context/GlobalContext';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { formatMinutesToHrMin } from '../../utils/formatMinutesToHrMin';
import { useGetBarberByServicesKioskMutation } from './salonBarbersApiSlice';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';

const SalonBarbers = () => {

    const { selectedServices, selectBarber, setSelectedBarber } = useGlobal()
    const adminInfo = useSelector(selectCurrentAdminInfo);

    // console.log(selectedServices)

    const navigate = useNavigate()
    const { colors } = useSelector(state => state.theme);

    const totalPrice = selectedServices.reduce((acc, service) => acc + service.servicePrice, 0);
    const totalTime = selectedServices.reduce((acc, service) => acc + service.serviceEWT, 0);
    const totalServices = selectedServices.length;

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata
        }
    ] = useGetDefaultSalonByKioskMutation();

    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo.email,
                role: adminInfo.role
            };
            getDefaultSalonByAdmin(salondata);
        }
    }, [adminInfo]);


    const [
        getBarberByServicesKiosk,
        {
            data: getBarberByServicesKioskData,
            isLoading: getBarberByServicesKioskisLoading
        }
    ] = useGetBarberByServicesKioskMutation();


    useEffect(() => {
        if (selectedServices.length > 0 && adminInfo?.salonId) {
            getBarberByServicesKiosk({ salonId: adminInfo?.salonId, selectedServices })
        }

    }, [adminInfo])


    return (
        <main
            className={style.container}
            style={{
                backgroundColor: colors.color4,
            }}
        >
            <div style={{
                marginBottom: "7rem"
            }}>
                {
                    getBarberByServicesKioskisLoading ? (
                        <>
                            <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                            <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                            <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                            <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                        </>
                    ) : getBarberByServicesKioskData?.response?.length > 0 ? (
                        getBarberByServicesKioskData?.response?.map((item, index) => {
                            return (
                                <button
                                    onClick={() => {
                                        setSelectedBarber(item)
                                    }}
                                    key={item?.barberId}
                                    className={style.serviceCard}
                                    style={{
                                        backgroundColor: colors.color4,
                                        border: selectBarber?.barberId === item?.barberId ? `0.2rem solid #0BA3AD` : `0.1rem solid ${colors.borderColor}`
                                    }}
                                >
                                    <div>
                                        <img src={item?.profile?.[0]?.url} alt="" style={{ border: "0.1rem solid #efefef" }} />
                                        <p>{item?.name}</p>
                                        <p style={{
                                            fontSize: "1.2rem",
                                            textAlign: "center"
                                        }}>~{formatMinutesToHrMin(item?.barberEWT)}</p>
                                    </div>

                                </button>
                            )
                        })
                    ) : (
                        <p>No Barbers available</p>
                    )

                }
            </div>

            {
                selectedServices.length > 0 && (
                    <div
                        className={style.bottomContainer}
                        style={{
                            backgroundColor: colors.color4,
                            borderTop: `0.1rem solid ${colors.borderColor}`
                        }}
                    >
                        <div>
                            <h3>{getDefaultSalonByAdmindata?.response?.currency} {totalPrice.toFixed(2)}</h3>
                            <p>{totalServices} {totalServices === 1 ? "service" : "services"} |{" "}
                                {formatMinutesToHrMin(totalTime)}</p>
                        </div>

                        <button
                            onClick={() => {
                                if (!selectBarber) {
                                    toast.error("Please select a barber", {
                                        duration: 3000,
                                        style: {
                                            fontSize: "var(--list-modal-header-normal-font)",
                                            borderRadius: "0.3rem",
                                            background: "#333",
                                            color: "#fff",
                                        },
                                    });
                                    return
                                }
                                navigate("/joinQueuePage")
                            }}
                            className={style.btn}>Continue</button>
                    </div>
                )
            }
        </main>
    )
}

export default SalonBarbers