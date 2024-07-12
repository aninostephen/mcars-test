'use client'
import CarUnitForm from "@/Components/CarUnit/CarUnitForm";
import { cu } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { useState } from "react";

const CmCreate = () => {
  const [resetKey, setResetKey] = useState(false);
  const { mutate, isLoading } = useCreate(cu,false,'/car_unit',false,
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setResetKey(true);
      }
    }
  );
  return (
    <CarUnitForm
      mutate={mutate}
      loading={isLoading}
      title={"AddCarUnit"}
      key={resetKey}
    />
  );
};

export default CmCreate;
