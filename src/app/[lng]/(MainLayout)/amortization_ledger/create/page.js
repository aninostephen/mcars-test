'use client'
import LedgerForm from "@/Components/AmortLedger/Form";
import { culedger } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const LedgerCreate = () => {
  const { mutate, isLoading } = useCreate(culedger, false, "/amortization_ledger");
  return (
    <FormWrapper title="Ledger">
      <LedgerForm loading={isLoading} mutate={mutate} />
    </FormWrapper>
  );
};

export default LedgerCreate;
