import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row, Col, Card } from "reactstrap";
import { CarUnitTabTitleListData } from "../../Data/TabTitleListData";
// import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { cu, bt, cm, user } from "../../Utils/AxiosUtils/API";
import Loader from "../CommonComponent/Loader";
import { InitValues, ValidationSchema } from "./CarUnitObjects";
import SubmitFunction from "./CarUnitSubmitFunction";
import AllTabs from "./AllTabs";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import TabTitle from "../TabTitle";
import { YupObject } from "@/Utils/Validation/BodyTypeValidationSchemas";
import dayjs from "dayjs";
import { ISOFormat, NumericFormat } from "@/Utils/utils";
import ModalPassword from "../ModalVerification/ModalPassword";
import Btn from "@/Elements/Buttons/Btn";

const CarUnitForm = ({ mutate, loading, updateId, title }) => {
  const [modal, setModal] = useState(false);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [activeTab, setActiveTab] = useState("1");
  const { data: oldData, isFetching, refetch } = useQuery([updateId], () => request({ url: `${cu}/${updateId}` }), { refetchOnWindowFocus: false, enabled: false, select: (data) => data.data });
  const [initialValues, setInitialValues] = useState(InitValues(oldData, updateId));

  const { data: bodyType } = useQuery([bt], () => request({
    url: bt,
    params: { status: 1 }
  }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.body_type_name })) 
  });
  const { data: carMake } = useQuery([cm], () => request({ 
    url: cm, 
    params: { status: 1 }
  }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.car_make_name })) 
  });

  const { data: users } = useQuery([user], () => request({ 
    url: user,
  }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.name, ...item })) 
  });
  
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  const watchEvent = useCallback((oldData, updateId) => {
    return InitValues(oldData, updateId)
  }, [oldData, updateId])

  if ((updateId && isFetching)) return <Loader />;

  const handleModalPopup = (values) => {
    setInitialValues({...initialValues, ...values});
    setModal(true);
  }

  const handleSubmitModalPopup = (submitForm) => {
    submitForm();
  }

  return (
    <Formik
      validateOnChange={false}
      initialValues={{ ...watchEvent(oldData, updateId) }}
      validationSchema={YupObject({
        ...ValidationSchema,
      })}
      onSubmit={(values) => {
        if (updateId) {
          values["_method"] = "put";
        }
        values.amort_start_date = dayjs(values.amort_start_date).format(ISOFormat);
        values.amort_end_date = dayjs(values.amort_end_date).format(ISOFormat);
        values.downpayment = NumericFormat(values?.downpayment);
        values.on_handling_payment = NumericFormat(values?.on_handling_payment);
        values.amort_amount = NumericFormat(values?.amort_amount);

        SubmitFunction(mutate, values);
      }}>
      {({ values, setFieldValue, errors, touched, submitForm }) => (
        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
          <Row>
            <Col>
              <Card>
                <div className="title-header option-title">
                  <h5>{t(title)}</h5>
                </div>
                <Row>
                  <Col xl="3" lg="4">
                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={CarUnitTabTitleListData} errors={errors} touched={touched} />
                  </Col>
                  <AllTabs
                    values={values}
                    activeTab={activeTab}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    updateId={updateId}
                    touched={touched}
                    bodyType={bodyType}
                    carMake={carMake}
                    users={users}
                    />
                  {/* <FormBtn loading={loading} /> */}
                  <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
                      <Btn className="btn-outline btn-lg" title="Back" onClick={() => router.back()} />
                      <Btn className="btn-primary btn-lg" onClick={() => handleModalPopup(values)} title="submit" loading={Number(loading)} />
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
          <ModalPassword setModal={setModal} modal={modal} title='User Authentication' handleSubmitModalPopup={() => handleSubmitModalPopup(submitForm)} isLoading={loading} />
        </Form>
      )}
    </Formik>
  );
};

export default CarUnitForm;