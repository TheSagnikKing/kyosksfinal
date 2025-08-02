import React, { useEffect, useState } from 'react';
import style from './SalonServices.module.css';
import { AddIcon, ClockIcon, DeleteIcon, SearchIcon } from '../../icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetAllSalonCategoriesMutation,
  useGetSalonServicesByCategoryMutation
} from './salonServicesApiSlice';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { Skeleton } from '@mui/material';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';
import toast from 'react-hot-toast';
import { useGlobal } from '../../context/GlobalContext';
import { formatMinutesToHrMin } from '../../utils/formatMinutesToHrMin';

const SalonServices = () => {

  const { selectedServices, setSelectedServices } = useGlobal()

  const adminInfo = useSelector(selectCurrentAdminInfo);
  const { colors } = useSelector(state => state.theme);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchServiceQuery, setSearchServiceQuery] = useState("");


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const customerName = searchParams.get("customerName");
  const customerEmail = searchParams.get("customerEmail");
  const mobileNumber = searchParams.get("mobileNumber");
  const countryflag = searchParams.get("countryflag");

  const [
    getAllSalonCategories,
    {
      data: getAllSalonCategoriesData,
      isLoading: getAllSalonCategoriesisLoading
    }
  ] = useGetAllSalonCategoriesMutation();

  const [
    getSalonServicesByCategory,
    {
      data: getSalonServicesByCategoryData,
      isLoading: getSalonServicesByCategoryisLoading
    }
  ] = useGetSalonServicesByCategoryMutation();

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

  useEffect(() => {
    if (adminInfo?.salonId) {
      getAllSalonCategories(adminInfo.salonId);
    }
  }, [adminInfo]);

  useEffect(() => {
    if (adminInfo?.salonId && selectedCategory) {
      getSalonServicesByCategory({
        salonId: adminInfo.salonId,
        serviceCategoryName: selectedCategory
      });
    }
  }, [adminInfo, selectedCategory]);

  useEffect(() => {
    if (getAllSalonCategoriesData?.response?.length > 0) {
      setSelectedCategory(getAllSalonCategoriesData.response[0].serviceCategoryName);
    }
  }, [getAllSalonCategoriesData]);

  const filteredServices = getSalonServicesByCategoryData?.response?.filter(service =>
    service?.serviceName?.toLowerCase().includes(searchServiceQuery.toLowerCase())
  );


  const addServiceHandler = (service) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.serviceId === service.serviceId);
      if (exists) return prev;
      return [...prev, service];
    });
  };

  const removeServiceHandler = (service) => {
    setSelectedServices(prev =>
      prev.filter(s => s.serviceId !== service.serviceId)
    );
  };

  return (
    <main className={style.container} style={{ backgroundColor: colors.color4 }}>
      <div>
        <div>
          <input
            placeholder='Search'
            style={{
              backgroundColor: colors.color4,
              border: `0.1rem solid ${colors.borderColor}`,
              padding: "0.8rem 1rem",
              width: "100%",
              borderRadius: "0.4rem"
            }}
            value={searchServiceQuery}
            onChange={(e) => setSearchServiceQuery(e.target.value)}
          />
          <button><SearchIcon color='#fff' size="2.5rem" /></button>
        </div>
      </div>

      <div className={style.servicesContainer}>
        <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", flexWrap: "wrap", alignSelf: "flex-start" }}>
          {getAllSalonCategoriesisLoading ? (
            <>
              <Skeleton variant="rectangular" className={style.skeleton} />
              <Skeleton variant="rectangular" className={style.skeleton} />
              <Skeleton variant="rectangular" className={style.skeleton} />
              <Skeleton variant="rectangular" className={style.skeleton} />
            </>
          ) : (
            getAllSalonCategoriesData?.response?.map((item) => (
              <button
                key={item._id}
                style={{
                  height: "4rem",
                  paddingInline: "1.5rem",
                  background: selectedCategory === item.serviceCategoryName ? "#0BA3AD" : "#0BA3AD1A",
                  border: "none",
                  borderRadius: "0.4rem",
                  color: selectedCategory === item.serviceCategoryName ? "#fff" : "#0BA3AD",
                  fontSize: "1.2rem"
                }}
                onClick={() => setSelectedCategory(item.serviceCategoryName)}
              >
                {item.serviceCategoryName}
              </button>
            ))
          )}
        </div>

        <div className={style.serviceCardContainer}>
          {getSalonServicesByCategoryisLoading ? (
            <>
              <Skeleton variant="rectangular" className={style.serviceCardLoader} />
              <Skeleton variant="rectangular" className={style.serviceCardLoader} />
              <Skeleton variant="rectangular" className={style.serviceCardLoader} />
              <Skeleton variant="rectangular" className={style.serviceCardLoader} />
            </>
          ) : filteredServices?.length > 0 ? (
            filteredServices.map((item, index) => {
              const isSelected = selectedServices.find(s => s.serviceId === item.serviceId);
              return (
                <div
                  key={index}
                  className={style.serviceCard}
                  style={{
                    backgroundColor: colors.color4,
                    border: `0.1rem solid ${colors.borderColor}`
                  }}
                >
                  <div>
                    <img src={item?.serviceIcon?.url} alt="service" style={{ border: "0.1rem solid #efefef" }} />
                    <p>{item.serviceName}</p>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem" }}>
                      <p><ClockIcon /></p>
                      <p>~{formatMinutesToHrMin(item.serviceEWT)}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
                    <p style={{ fontWeight: 500, fontSize: "2rem" }}>
                      {getDefaultSalonByAdmindata?.response?.currency} {item.servicePrice}
                    </p>
                    <button
                      style={{
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: isSelected ? "red" : "#0BA3AD",
                        borderRadius: "0.5rem",
                        border: "none"
                      }}
                      onClick={() =>
                        isSelected
                          ? removeServiceHandler(item)
                          : addServiceHandler(item)
                      }
                    >
                      {isSelected ? <DeleteIcon color="#fff" /> : <AddIcon color='#fff' />}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ color: colors.textColor, fontSize: "1.4rem", marginTop: "2rem" }}>
              No services found.
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          if (selectedServices.length === 0) {
            toast.error("Atleast one service need to be selected", {
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
          navigate("/salonBarbers")
        }}
        className={style.btn}
      >
        Continue
      </button>

    </main>
  );
};

export default SalonServices;
