'use client'
import ReservationForm from "@/Components/Reservation/Form";
import { reservation } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import { useState } from "react";

const ReservationCreate = () => {
  const [resetKey, setResetKey] = useState(false);
  const { mutate, isLoading } = useCreate(reservation,false,'/reservation',false,
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setResetKey(true);
      }
    }
  );
  return (
    <FormWrapper title="Reservation">
      <ReservationForm
        mutate={mutate}
        loading={isLoading}
        title={"Reservation"}
        key={resetKey}
      />
    </FormWrapper>
  );
};

export default ReservationCreate;
