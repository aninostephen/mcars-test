'use client'
import CmForm from "@/Components/CarMake/Form";
import { cm } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const CmCreate = () => {
  const { mutate, isLoading } = useCreate(cm, false, "/car_make", "Successfully Save");
  return (
    <FormWrapper title="Car Make">
      <CmForm loading={isLoading} mutate={mutate} />
    </FormWrapper>
  );
};

export default CmCreate;
