import React, { useContext, useEffect } from "react";
import { Col, Label, Row } from "reactstrap";
import SimpleInputField from "../../InputFields/SimpleInputField";
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import GetValue from "@/Utils/CustomFunctions/GetValue";
import ToggleInput from "@/Components/InputFields/ToggleInput";
import Btn from '@/Elements/Buttons/Btn';
import { generateYears, MoneyFormat } from "@/Utils/utils";

const GeneralTab = ({ values, setFieldValue, bodyType, carMake }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  useEffect(() => {
    if (values['car_make_id'] || values['body_type_id'] || values['model_variant'] || values['year'] || values['plate_no']) {
      const cmObj = GetValue(carMake, values['car_make_id']);
      const btObj = GetValue(bodyType, values['body_type_id']);
      const unitName = `${values['plate_no']} - ${cmObj?.name ? cmObj.name + ' |' : ''} ${values['model_variant']} - ${values['year']} ${btObj?.name ? `(${btObj.name})` : ''}`;
      setFieldValue('car_name', unitName);
    }
  }, [
    values?.car_make_id,
    values?.model_variant,
    values?.body_type_id,
    values?.year,
    values?.plate_no,
  ]);

  return (
    <>
      <SimpleInputField 
        nameList={
          [
            {
              title: t("UnitName"),
              name: "car_name",
              require: "true",
              readOnly: true,
              placeholder: t("UnitName")
            },
          ]
        }
      />

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
              options: generateYears(),
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

      <SimpleInputField
        nameList={
          [
            { 
              title: t("BodyColor"),
              name: "body_color",
              require: "true",
              placeholder: t("BodyColor")
            },
          ]
      } />

      <SearchableSelectInput
        nameList={[
          {
            title: t("StartOn"),
            name: "start_on",
            require: "true",
            inputprops: {
              name: "start_on",
              id: "start_on",
              options: [
                { id: "PUSH_BUTTON", name: "Push Button" },
                { id: "KEY_START", name: "Key Start" },
              ],
            },
          },
        ]}
      />

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

      <SearchableSelectInput
        nameList={[
          {
            title: t("Transmission"),
            name: "transmission",
            require: "true",
            inputprops: {
              name: "transmission",
              id: "transmission",
              options: [
                { id: "AUTOMATIC", name: "Automatic" },
                { id: "MANUAL", name: "Manual" },
                { id: "AUTO_MANUAL", name: "Automatic/Manual" },
                { id: "CVT", name: "CVT" },
                { id: "ELECTRIC", name: "Electric" },
              ],
            },
          },
        ]}
      />

      <SearchableSelectInput
        nameList={[
          {
            title: t("FuelType"),
            name: "fuel_type",
            require: "true",
            inputprops: {
              name: "fuel_type",
              id: "fuel_type",
              options: [
                { id: "GAS", name: "Gas" },
                { id: "DIESEL", name: "Diesel" },
                { id: "ELECTRIC", name: "Electric" },
              ],
            },
          },
        ]}
      />

      <SimpleInputField
        nameList={
          [
            { 
              title: t("CurrentMileage"),
              name: "current_mileage",
              require: "true",
              placeholder: t("CurrentMileage")
            },
          ]
      } />

      <SimpleInputField
        nameList={[
          {
            value: MoneyFormat(values?.on_handling_payment),
            name: "on_handling_payment",
            inputaddon: "true",
            title: t("OnHandlingPayment"),
            require: "true",
            placeholder: t("OnHandlingPayment"),
          },
        ]}
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
                                      onClick={() => setFieldValue("[car_features]", values['car_features']?.filter((item, index) => index !== i),)}>{t('Remove')}</a>
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
