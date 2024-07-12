'use client'
import BtForm from "@/Components/BodyType/Form";
import { bt } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const BtCreate = () => {
  const { mutate, isLoading } = useCreate(bt, false, "/body_type");
  return (
    <FormWrapper title="BodyType">
      <BtForm loading={isLoading} mutate={mutate} />
    </FormWrapper>
  );
};

export default BtCreate;
