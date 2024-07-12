import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row, Col, Card } from "reactstrap";
import { CarUnitTabTitleListData } from "../../Data/TabTitleListData";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { cu } from "../../Utils/AxiosUtils/API";
import Loader from "../CommonComponent/Loader";
import { InitValues, ValidationSchema } from "./CarUnitObjects";
import SubmitFunction from "./CarUnitSubmitFunction";
import SettingContext from "../../Helper/SettingContext";
import AllTabs from "./AllTabs";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import TabTitle from "../TabTitle";

const CarUnitForm = ({ mutate, loading, updateId, title }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [activeTab, setActiveTab] = useState("1");
  const { state } = useContext(SettingContext)
  const { data: oldData, isFetching, refetch } = useQuery([updateId], () => request({ url: `${cu}/${updateId}` }), { refetchOnWindowFocus: false, enabled: false, select: (data) => data.data });
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  const watchEvent = useCallback((oldData, updateId) => {
    return InitValues(oldData, updateId)
  }, [oldData, updateId])
  if ((updateId && isFetching)) return <Loader />;
  return (
    <Formik
      validateOnChange={false}
      initialValues={{ ...watchEvent(oldData, updateId) }}
      // validationSchema={YupObject({
      //   ...ValidationSchema,
      //   store_id: state?.isMultiVendor && nameSchema
      // })}
      onSubmit={(values) => {
        if (updateId) {
          values["_method"] = "put";
        }
        SubmitFunction(mutate, values);
      }}>
      {({ values, setFieldValue, errors, touched }) => (
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
                  <AllTabs values={values} activeTab={activeTab} setFieldValue={setFieldValue} errors={errors} updateId={updateId} touched={touched} />
                  <FormBtn loading={loading} />
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CarUnitForm;