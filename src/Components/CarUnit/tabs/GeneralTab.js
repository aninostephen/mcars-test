import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Col, Label, Row } from "reactstrap";
import request from "@/Utils/AxiosUtils";
import { bt, cm } from "@/Utils/AxiosUtils/API";
import SimpleInputField from "../../InputFields/SimpleInputField";
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import GetValue from "@/Utils/CustomFunctions/GetValue";
import ToggleInput from "@/Components/InputFields/ToggleInput";
import Btn from '@/Elements/Buttons/Btn';

const GeneralTab = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
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

  useEffect(() => {
    if (values['car_make_id'] || values['body_type_id'] || values['model_variant'] || values['year']) {
      const cmObj = GetValue(carMake, values['car_make_id']);
      const btObj = GetValue(bodyType, values['body_type_id']);
      const unitName = `${cmObj?.name ? cmObj.name + ' |' : ''} ${values['model_variant']} - ${values['year']} ${btObj?.name ? `(${btObj.name})` : ''}`;
      setFieldValue('car_name', unitName);
    }

  }, [
    values?.car_make_id,
    values?.model_variant,
    values?.body_type_id,
    values?.year,
  ]);

  return (
    <>
      <SimpleInputField 
        nameList={
          [
            {
              title: t("CarMakeName"),
              name: "car_name",
              require: "true",
              readOnly: true,
              placeholder: t("CarMakeName")
            },
          ]
        } />

      <SimpleInputField 
        nameList={
          [
            { 
              title: t("PlateNo"),
              name: "plate_no",
              require: "true",
              placeholder: t("PlateNo"),
            },
          ]
        }
      />

      <SearchableSelectInput
        nameList={[
          {
            title: t("CarMake"),
            name: "car_make_id",
            require: "true",
            inputprops: {
              name: "car_make_id",
              id: "car_make_id",
              options: carMake,
            },
          },
        ]}
      />

      <SearchableSelectInput
        nameList={[
          {
            title: t("Year"),
            name: "year",
            require: "true",
            inputprops: {
              name: "year",
              id: "year",
              options: [
                { id: "2024", name: "2024" },
                { id: "2023", name: "2023" },
              ],
            },
          },
        ]}
      />

      <SimpleInputField 
        nameList={
          [
            { 
              title: t("ModelVariant"),
              name: "model_variant",
              require: "true",
              placeholder: t("ModelVariant")
            },
          ]
      } />

      <SearchableSelectInput
        nameList={[
          {
            title: t("BodyType"),
            name: "body_type_id",
            require: "true",
            inputprops: {
              name: "body_type_id",
              id: "body_type_id",
              options: bodyType,
            },
          },
        ]}
      />

      <ToggleInput
        {...{
          title: t("UnitStatus"),
          name: "unit_status",
          require: "true",
          setFieldValue,
          values,
          inputprops: {
            name: "unit_status",
            id: "unit_status",
            options: [
              { id: "USE_CAR", name: "Use Car" },
              { id: "BRAND_NEW", name: "Brand New" },
            ],
          },
        }}
      />

      <ToggleInput
        {...{
          title: t("Transaction"),
          name: "transactions",
          require: "true",
          setFieldValue,
          values,
          inputprops: {
            name: "transactions",
            id: "transactions",
            options: [
              { id: "ASSUME_UNIT", name: "Assume Unit" },
              { id: "CASH_UNIT", name: "Cash Unit" },
            ],
          },
        }}
      />

      <ToggleInput
        {...{
          title: t("Transmission"),
          name: "transmission",
          require: "true",
          setFieldValue,
          values,
          inputprops: {
            name: "transmission",
            id: "transmission",
            options: [
              { id: "AUTOMATIC", name: "Automatic" },
              { id: "MANUAL", name: "Manual" },
              { id: "AUTO_MANUAL", name: "Automatic/Manual" },
            ],
          },
        }}
      />

      <Row className='mb-4 align-items-center g-2'>
          <Col sm="3"><Label className='col-form-label form-label-title form-label'> {t("CarFeatures")}</Label></Col>
          <Col sm="10">
              {values['car_features'] && values['car_features']?.length > 0 &&
                  values['car_features'].map((elem, i) => (
                      <div className='mb-3' key={i}>
                          <Row>
                              <Col sm="9">
                                  <Row className='g-3'>
                                      <Col xs="12">
                                          <SimpleInputField nameList={[{ name: `['car_features'][${i}]`, title: "title", notitle: "true", placeholder: t("EnterCarFeatures") }]} />
                                      </Col>
                                  </Row>
                              </Col>
                              <Col sm="2" className='px-sm-0' style={{marginLeft: "15px"}}>
                                  <a className="mt-custom d-block invalid-feedback cursor-pointer"
                                      onClick={() => setFieldValue("[car_features]", values['car_features'].filter((item, index) => index !== i),)}>{t('Remove')}</a>
                              </Col>
                          </Row>
                      </div>
                  ))}
              <Btn className="btn-theme mt-4" onClick={() => setFieldValue("[car_features]", [...values['car_features'], []])} title="AddCarFeatures" />
          </Col>
      </Row>
    </>
  );
};

export default GeneralTab;
