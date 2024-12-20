'use client'
import { useRouter } from "next/navigation";
import { useContext } from "react";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { reservation } from "@/Utils/AxiosUtils/API";
import ReservationForm from "@/Components/Reservation/Form";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import { Stack } from "@mui/material";
import I18NextContext from "@/Helper/I18NextContext";

const CuUpdate = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const { mutate, isLoading } = useUpdate(reservation, params?.updateId, "/reservation");
  return (
    <FormWrapper title="Reservation">
      {params?.updateId && (
        <Stack direction="column" spacing={1.5}>
          <ReservationForm mutate={mutate} updateId={params?.updateId} loading={isLoading} />
        </Stack>
      )}
    </FormWrapper>
  );
};

export default CuUpdate; 
