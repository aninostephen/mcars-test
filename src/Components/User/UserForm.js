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
import UserRole from "./UserRole";

const UserForm = ({ mutate, loading, updateId, fixedRole,noRoleField, addAddress, type }) => {
  const { data: rolesData, isFetching, refetch: RoleRefetch } = useQuery(["/role"], () => request({ url: "/role" }), {
    refetchOnMount: false, enabled: false, select: (data) => data?.data?.data?.filter((elem) => elem.id !== 1)
  });

  const { data: oldData, isFetching: isFetchingUser, isLoading: oldDataLoading, refetch } = useQuery([updateId], () => request({ url: `/user/${updateId}` }), { enabled: false, refetchOnWindowFocus:false });
  useEffect(() => {
    if (updateId) {
      refetch()
    }
  }, [updateId]);
  useEffect(() => {
    RoleRefetch();
  }, []);
  if ((isFetching && isFetchingUser) && (updateId && oldDataLoading)) return <Loader />;
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        email: updateId ? oldData?.data?.email || "" : "",
        phone: updateId ? Number(oldData?.data?.phone) || "" : "",
        password: "",
        password_confirmation: "",
        role_id: updateId ? oldData?.data?.role?.id || "" : fixedRole ? 2 : "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        address: [],
        country_code: updateId ? oldData?.data?.country_code || '' : "91"
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        password: !updateId && passwordSchema,
        password_confirmation: !updateId && passwordConfirmationSchema,
        role_id: noRoleField,
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
        mutate(values);
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            {!addAddress && (
              <>
                <UserDetail1 />
                <UserPassword updateId={updateId} />
                {noRoleField ?'':<UserRole rolesData={rolesData} />}
              </>
            )}
            <UserAddress addAddress={addAddress} type={type} />
            <FormBtn loading={loading} />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
