'use client'
import ClientForm from "@/Components/Client/Form";
import { client } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const CmCreate = () => {
  const { mutate, isLoading } = useCreate(client, false, "/client", "Successfully Save");
  return (
    <FormWrapper title="Client">
      <ClientForm loading={isLoading} mutate={mutate} />
    </FormWrapper>
  );
};

export default CmCreate;
