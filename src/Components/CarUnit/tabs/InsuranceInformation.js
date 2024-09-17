import React, { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { Col, Label, Row } from "reactstrap";
import ToggleInput from "@/Components/InputFields/ToggleInput";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";
import CalendarField from "../components/CalendarField";
import { Stack } from "@mui/material";

const InsuranceInformation = ({ values, setFieldValue, errors, updateId, touched }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    <>
      <SimpleInputField
        nameList={[
            {
              title: t("InsuranceName"),
              type: 'text',
              require: "true",
              name: "insurance_name",
              placeholder: t("InsuranceName"),
            },
        ]}
      />
      <Row className='mb-4 align-items-center g-2'>
        <Col sm="3" style={{marginTop: "0px"}}><Label className='col-form-label form-label-title form-label'> {t("Registered")}</Label></Col>
        <Col sm="9">
            <Row>
              <Col sm="12">
                <Stack direction="row" spacing={5} alignItems="center">
                  <ToggleInput
                    {...{
                      title: t("registered"),
                      nolabel: "true",
                      name: "is_registered",
                      require: "true",
                      setFieldValue,
                      values,
                      inputprops: {
                        name: "is_registered",
                        id: "is_registered",
                        options: [
                          { id: "YES", name: "Yes" },
                          { id: "NO", name: "No" },
                        ],
                      },
                    }}
                  />
                  {values?.is_registered === 'YES' && (
                    <CalendarField
                      value={values?.till_registered}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                      label="Till"
                      name="till_registered"
                      type="input"
                    />
                  )}
                </Stack>
              </Col>
            </Row>
        </Col>
      </Row>

      <Row className='mb-4 align-items-center g-2'>
        <Col sm="3" style={{marginTop: "0px"}}><Label className='col-form-label form-label-title form-label'> {t("Insured")}</Label></Col>
        <Col sm="9">
            <Row>
              <Col sm="12">
                <Stack direction="row" spacing={5} alignItems="center">
                  <ToggleInput
                    {...{
                      title: t("registered"),
                      nolabel: "true",
                      name: "is_insured",
                      setFieldValue,
                      values,
                      inputprops: {
                        name: "is_insured",
                        id: "is_insured",
                        options: [
                          { id: "YES", name: "Yes" },
                          { id: "NO", name: "No" },
                        ],
                      },
                    }}
                  />
                  {values?.is_insured === 'YES' && (
                    <CalendarField
                      value={values?.till_insured}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                      label="Till"
                      name="till_insured"
                      type="input"
                    />
                  )}
                </Stack>
              </Col>
            </Row>
        </Col>
      </Row>

      <ToggleInput
        {...{
          title: t("InsuranceLocked"),
          name: "insurance_locked",
          setFieldValue,
          values,
          inputprops: {
            name: "insurance_locked",
            id: "insurance_locked",
            options: [
              { id: "YES", name: "Yes" },
              { id: "NO", name: "No" },
            ],
          },
        }}
      />
    </>
  );
};

export default InsuranceInformation;
