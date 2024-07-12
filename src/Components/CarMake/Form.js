import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { cm } from "../../Utils/AxiosUtils/API";
import { bodytypename, YupObject } from "@/Utils/Validation/BodyTypeValidationSchemas";
import Loader from "../CommonComponent/Loader";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";

const CmForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: oldData, isFetching, refetch } = useQuery([updateId], () => request({ url: cm + "/" + updateId }), { refetchOnMount: false, enabled: false });

  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isFetching) return <Loader />

  return (
    <Formik
      enableReinitialize
      initialValues={{
        car_make_name: updateId ? oldData?.data?.car_make_name || "" : "",
        desc: updateId ? oldData?.data?.desc || "" : "",
        car_make_thumbnail_id: updateId ? oldData?.data?.car_make_thumbnail_id || '' : '',
        car_make_thumbnail: updateId ? oldData?.data?.car_make_thumbnail || '' : '',
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
      }}
      validationSchema={YupObject({
        car_make_name: bodytypename,
      })}
      onSubmit={(values) => {
        mutate({ ...values, status: Number(values.status) });
      }}>
      {({ values, errors, setFieldValue }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <SimpleInputField nameList={[
              { 
                name: "car_make_name", 
                placeholder: "Maker name",
                require: "true",
                title: "Maker name"
              },
              {
                name: 'desc',
                type: 'textarea',
                title: 'Description',
                placeholder: t("EnterDescription") 
              }
          ]} />
          <FileUploadField
            errors={errors}
            name="car_make_thumbnail_id"
            id="car_make_thumbnail_id"
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

export default CmForm;
