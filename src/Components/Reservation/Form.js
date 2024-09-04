import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, useRef } from "react";
import request from "../../Utils/AxiosUtils";
import { reservation, cu, client } from "../../Utils/AxiosUtils/API";
import Loader from "../CommonComponent/Loader";
import { REMIT_STATUS } from "@/Utils/Enums";
import { Alert } from "@mui/material";
import FormReservation from "./FormReservation";
import TermsInfo from "./TermsInfo";

const ReservationForm = ({ mutate, updateId, loading }) => {
  const [modal, setModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    car_unit_id: "",
    new_owner_id: "",
    from: "",
    amount: "",
    status: true,
    target_date: new Date(),
    payment_type: '',
    price: 0,
    already_payment: 0,
    later_payment: 0,
    staggered_payment: 0,
    release_type: 0,
    appointment: '',
    remarks: '',
    downpayment: '',
    later_payment_target_date: '',
    staggered_payment_target_date: '',
    password: '',
  });
  const router = useRouter();
  const { data: oldData, isFetching, refetch } = useQuery([updateId], () => request({ url: reservation + "/" + updateId }), { refetchOnMount: false, enabled: false });

  const { data: unit, isFetching: isFetchingUnit, refetch: unitRefetch } = useQuery([cu], () => request({ 
    url: cu,
    params: { stock_status: 'ON-HAND' }
  }),
  { 
    refetchOnMount: false,
    enabled: false ,
    select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.car_name, ...item })) 
  });

  const { data: userdt, isFetching: isFetchingUser, refetch: unitUser } = useQuery([client], () => request({ 
    url: client
  }),
  { 
    refetchOnMount: false,
    enabled: false ,
    select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.car_name, ...item })) 
  });
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);

  useEffect(() => {
    if (updateId) {
      const releaseStation = oldData?.data?.release_station;
      setInitialValues({
        car_unit_id: oldData?.data?.car_unit_id,
        new_owner_id: oldData?.data?.new_owner_id,
        from: oldData?.data?.from,
        amount: oldData?.data?.amount,
        status: Boolean(Number(oldData?.data?.status)),
        target_date: oldData?.data?.target_date,
        payment_type: releaseStation?.payment_type,
        price: releaseStation?.price ? releaseStation?.price : '',
        already_payment: releaseStation?.already_payment ? releaseStation?.already_payment : '',
        later_payment: releaseStation?.later_payment ? releaseStation?.later_payment : '',
        staggered_payment: releaseStation?.staggered_payment ? releaseStation?.staggered_payment : '',
        release_type: releaseStation?.release_type,
        appointment: releaseStation?.appointment,
        remarks: releaseStation?.remarks,
        downpayment: releaseStation?.downpayment ? releaseStation?.downpayment : '',
        later_payment_target_date: releaseStation?.later_payment_target_date,
        staggered_payment_target_date: releaseStation?.staggered_payment_target_date,
        password: '',
      });
    } else {
      setInitialValues({
        car_unit_id: "",
        new_owner_id: "",
        from: "",
        amount: "",
        status: Boolean(Number(oldData?.data?.status)),
        target_date: new Date(),
        payment_type: '',
        price: 0,
        already_payment: 0,
        later_payment: 0,
        staggered_payment: 0,
        release_type: 0,
        appointment: '',
        remarks: '',
        downpayment: '',
        later_payment_target_date: new Date(),
        staggered_payment_target_date: new Date(),
        password: '',
      });
    }
  }, [oldData]);

  useEffect(() => {
    unitRefetch();
    unitUser();
  }, []);

  const submitFormRef = useRef();
  const handleModalPopup = (values) => {
    setInitialValues({...initialValues, ...values});
    //submitFormRef.current = submitForm;
    setModal(true);
  }

  const handleSubmitModalPopup = (submitForm) => {
    submitForm();
  }
  if (isFetching || isFetchingUnit || isFetchingUser) return <Loader />
  return (
    <>
      {updateId && (
        <>
          {oldData?.data?.remit?.is_remitted === REMIT_STATUS.APPROVED
            ? (
              <Alert severity="success">This Unit has been approved</Alert>
            ) :
            oldData?.data?.remit?.is_remitted === REMIT_STATUS.REJECTED 
              ? <Alert severity="error">This transaction is rejected!</Alert>
              : <Alert severity="info">Remit the reservation fee first, before releasing the unit.</Alert>
            }
        </>
      )}

      {
        oldData?.data?.remit?.is_remitted === REMIT_STATUS.APPROVED || oldData?.data?.remit?.is_remitted === REMIT_STATUS.REJECTED
        ? (
          <>
            <TermsInfo data={oldData?.data}/>
          </>
        ) : 
          <FormReservation
            handleModalPopup={handleModalPopup}
            handleSubmitModalPopup={handleSubmitModalPopup}
            initialValues={initialValues}
            modal={modal}
            unit={unit}
            setModal={setModal}
            userdt={userdt}
            loading={loading}
            mutate={mutate}
          />
        }
      
    </>
  );
};

export default ReservationForm;
