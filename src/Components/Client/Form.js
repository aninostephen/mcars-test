import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema, YupObject } from "../../Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import UserDetail1 from "./UserDetail1";
import UserAddress from "./UserAddress";
import UserPassword from "./UserPassword";
import ClientInfo from "./ClientInfo";
import { NumericFormat } from "@/Utils/utils";

const ClientForm = ({ mutate, loading, updateId, fixedRole, noRoleField, addAddress, type }) => {

  const { data: oldData, isFetching: isFetchingUser, refetch } = useQuery([updateId], () => request({ url: `/user/${updateId}` }), { enabled: false, refetchOnWindowFocus:false });
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  if (isFetchingUser) return <Loader />;
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        email: updateId ? oldData?.data?.email || "" : "",
        phone: updateId ? Number(oldData?.data?.phone) || "" : "",
        password: "",
        password_confirmation: "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        country_code: updateId ? oldData?.data?.country_code || '' : "91",
        age: updateId ? Number(oldData?.data?.client_information?.age) || "" : "",
        job: updateId ? oldData?.data?.client_information?.job || "" : "",
        montly_income: updateId ? oldData?.data?.client_information?.montly_income || '' : '',
        address: updateId ? oldData?.data?.client_information?.address || '' : '',
        purpose: updateId ? oldData?.data?.client_information?.purpose || '' : '',
        marital_status: updateId ? oldData?.data?.client_information?.marital_status || '' : '',
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        password: !updateId && passwordSchema,
        password_confirmation: !updateId && passwordConfirmationSchema,
        age: nameSchema,
        address: nameSchema,
        marital_status: nameSchema,
      })}
      onSubmit={(values) => {
        if (updateId) {
          delete values["password"];
          delete values["password_confirmation"];
        } 
        if(noRoleField){
          delete values["role_id"];
        }    
        values["status"] = Number(values["status"]);
        if (addAddress) values["address"][0]["is_default"] = Number(values["address"][0]["is_default"]) || false;
        if (type) values["address"][0]["type"] = type;

        values.montly_income = NumericFormat(values?.montly_income);
        mutate(values);
      }}>
      {({ values, setFieldValue }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            {!addAddress && (
              <>
                <UserDetail1 />
                <UserPassword updateId={updateId} />
              </>
            )}
            <UserAddress addAddress={addAddress} type={type} />
            <ClientInfo values={values} setFieldValue={setFieldValue} />
            <FormBtn loading={loading} />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default ClientForm;
