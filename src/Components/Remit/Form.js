import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import Loader from "../CommonComponent/Loader";
import DetailTable from "./DetailTable";
import ReleaseStation from "./components/ReleaseStation";
import SettingContext from '@/Helper/SettingContext';
import { Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ModalVerification from "../ModalVerification";
import { nameSchema } from "@/Utils/Validation/ValidationSchemas";
import { PayModal } from "./components/PayModal";
import { MoneyFormat } from "@/Utils/utils";
import Btn from "@/Elements/Buttons/Btn";
import ModalPrint from "./ModalPrint";
import TermsInfo from "./TermsInfo";

const RemitForm = ({ updateId }) => {
  const { currencySymbol } = useContext(SettingContext);
  const { data: oldData, isFetching: isFetchingUser, refetch } = useQuery([updateId], () => request({ url: `/remit/${updateId}` }), { enabled: false, refetchOnWindowFocus:false });
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  if (isFetchingUser) return <Loader />;

  const onHandleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      return false;
    }
    let info = [],
    itemKey = {},
    validation = {};
    info = [
      {
        label: 'Payment Action',
        value: value,
      },
      {
        label: 'Transaction Type',
        value: oldData?.data?.module,
      },
      {
        label: 'Payment Type',
        value: oldData?.data?.payment_type
      },
      {
        label: 'Amount',
        value: `${currencySymbol} ${MoneyFormat(oldData?.data?.amount)}`
      }
    ]

    itemKey = {
      id: updateId,
      password: '',
      payment_status: value,
    };

    validation = {
      id: nameSchema,
      password: nameSchema,
      payment_status: nameSchema,
    };

    setItem(
      PayModal({
        api: '/remit-verify',
        redirection: '/remit',
        title: "Remit payment",
        info: info,
        itemKey: itemKey,
        validation: validation,
      })
    );
    setModal(true);
  };

  return (
    <>
      {oldData?.data?.is_remitted === 'APPROVED' && (
          <Btn
            className="btn-outline btn-lg"
            title="Print"
            onClick={() => setModal(true)}
          />
      )}
      <Stack direction='row' spacing={2.5} sx={{ marginBottom: '10px', marginTop: '10px' }}>
        <Stack direction='column' sx={{ width: '100%' }}>
          <Typography variant="h6">
            Refference # : {oldData?.data?.ref}
          </Typography>
          <Divider />
        </Stack>
      </Stack>
      <div id="remit-details">
        <ReleaseStation data={oldData?.data}/>
        <Divider />
        {(oldData?.data && oldData?.data?.reservations) && (
          <TermsInfo data={oldData?.data} />
        )}
        <DetailTable
          data={oldData}
          onHandleChange={onHandleChange}
        />
      </div>
      {oldData?.data?.is_remitted !== 'APPROVED' && (
        <ModalVerification
          modal={modal}
          setModal={setModal}
          item={item}
        />
      )}

      {oldData?.data?.is_remitted === 'APPROVED' && (
        <ModalPrint
          modal={modal}
          setModal={setModal}
          title='Print payment'
          data={oldData}
        />
      )}
    </>
  );
};

export default RemitForm;
