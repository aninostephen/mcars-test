import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { bt } from "../../Utils/AxiosUtils/API";
import { bodytypename, YupObject } from "@/Utils/Validation/BodyTypeValidationSchemas";
import Loader from "../CommonComponent/Loader";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";

const BtForm = ({ mutate, updateId, loading }) => {
  const { data: oldData, isFetching , refetch } = useQuery([updateId], () => request({ url: bt + "/" + updateId }), { refetchOnMount: false, enabled: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isFetching) return <Loader />

  return (
    <Formik
      enableReinitialize
      initialValues={{
        body_type_name: updateId ? oldData?.data?.body_type_name || "" : "",
        desc: updateId ? oldData?.data?.desc || "" : "",
        body_type_thumbnail_id: updateId ? oldData?.data?.data?.body_type_thumbnail.id || '' : '',
        body_type_thumbnail: updateId ? oldData?.data?.data?.body_type_thumbnail || '' : '',
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
      }}
      validationSchema={YupObject({
        body_type_name: bodytypename,
      })}
      onSubmit={(values) => {
        mutate({ ...values, status: Number(values.status) });
      }}>
      {({ values, errors, setFieldValue }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <SimpleInputField nameList={[
              { 
                name: "body_type_name", 
                placeholder: "Body Type Name",
                require: "true",
                title: "Body Type"
              },
              {
                name: 'desc',
                type: 'textarea',
                title: 'Description',
                placeholder: "Description" 
              }
            ]} />
          <FileUploadField
            errors={errors}
            name="body_type_thumbnail_id"
            id="body_type_thumbnail_id"
            title="Thumbnail"
            type="file"
            values={values}
            setFieldValue={setFieldValue}
            updateId={updateId}
            helpertext={getHelperText('600x600px')}
          />
          <CheckBoxField name="status" />
          <FormBtn loading={loading} />
        </Form>
      )}
    </Formik>
  );
};

export default BtForm;
