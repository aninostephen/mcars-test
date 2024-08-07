import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { reservation, cu, client } from "../../Utils/AxiosUtils/API";
import { YupObject } from "@/Utils/Validation/BodyTypeValidationSchemas";
import Loader from "../CommonComponent/Loader";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import CalendarField from "./CalendarField";
import { MoneyFormat, NumericFormat } from "@/Utils/utils";
import { nameSchema } from "../CarUnit/ValidationSchemas";
import Btn from "@/Elements/Buttons/Btn";
import { REMIT_STATUS } from "@/Utils/Enums";
import { Alert } from "@mui/material";

const ReservationForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
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
    updateId && refetch();
  }, [updateId]);

  useEffect(() => {
    unitRefetch();
    unitUser();
  }, [])

  if (isFetching || isFetchingUnit || isFetchingUser) return <Loader />
  return (
    <>
      {updateId && (
        <>
          {oldData?.data?.remit?.is_remitted === REMIT_STATUS.APPROVED
            ? (
              <Btn
                className="btn-outline btn-lg"
                title="Release Unit"
                onClick={() => router.push(`/${i18Lang}/transaction/create?unit=${updateId}`)}
              />
            ) : <Alert severity="info">Remit the reservation fee first, before releasing the unit.</Alert>}
          
        </>
      )}
      
      <Formik
        enableReinitialize
        initialValues={{
          car_unit_id: updateId ? oldData?.data?.car_unit_id || "" : "",
          new_owner_id: updateId ? oldData?.data?.new_owner_id || "" : "",
          from: updateId ? oldData?.data?.from || "" : "",
          amount: updateId ? oldData?.data?.amount || "" : "",
          status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
          // have_fee: updateId ? Boolean(Number(oldData?.data?.have_fee)) : false,
          target_date: updateId ? oldData?.target_date || new Date() : new Date(),
        }}
        validationSchema={YupObject({
          car_unit_id: nameSchema,
          new_owner_id: nameSchema,
          from: nameSchema,
          amount: nameSchema,
          target_date: nameSchema,
        })}
        onSubmit={(values) => {
          values.amount = values?.amount ? NumericFormat(values?.amount) : 0;
          mutate({ ...values, status: Number(values.status) });
        }}>
        {({ values, errors, setFieldValue, touched }) => (
          <Form className="theme-form theme-form-2 mega-form">
            <SearchableSelectInput
              nameList={[
                {
                  title: t("Unit"),
                  name: "car_unit_id",
                  require: "true",
                  inputprops: {
                    name: "car_unit_id",
                    id: "car_unit_id",
                    options: unit,
                  },
                },
              ]}
            />

            <SearchableSelectInput
              nameList={[
                {
                  title: t("Client"),
                  name: "new_owner_id",
                  require: "true",
                  inputprops: {
                    name: "new_owner_id",
                    id: "new_owner_id",
                    options: userdt,
                  },
                },
              ]}
            />
            
            <SimpleInputField
              nameList={
              [
                  {
                      value: MoneyFormat(values.amount),
                      title: "Amount",
                      name: "amount",
                      inputaddon: "true",
                      require: "true",
                      placeholder: "Amount"
                  },
              ]
            } />

            <CalendarField
              values={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              label="Target Date"
              name="target_date"
            />

            <SearchableSelectInput
              nameList={[
                {
                  title: t("InquireFrom"),
                  name: "from",
                  require: "true",
                  inputprops: {
                    name: "from",
                    id: "from",
                    options: [
                      { id: "PAGES", name: "Pages" },
                      { id: "AGENT", name: "Agent" },
                      { id: "WALKIN", name: "Walk-in" },
                    ],
                  },
                },
              ]}
            />

            <CheckBoxField name="status" />
            <FormBtn loading={loading} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReservationForm;
