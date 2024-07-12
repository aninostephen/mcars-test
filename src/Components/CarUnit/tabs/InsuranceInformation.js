import React, { useContext, useState } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { Col, Label, Row, Input } from "reactstrap";
import ToggleInput from "@/Components/InputFields/ToggleInput";
import useOutsideDropdown from "@/Utils/Hooks/CustomHooks/useOutsideDropdown";
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import { Calendar } from "react-date-range";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";

const InsuranceInformation = ({ values, setFieldValue, errors, updateId }) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  const [pickupdate, setPickupdate] = useState();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const onChangeDate = (item, field) => {
    setPickupdate(item, field);
    setFieldValue(field, item);
    setIsComponentVisible(false);
  }
  return (
    <>
      <SimpleInputField
        nameList={[
            {
              title: t("InsuranceName"),
              type: 'text',
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
                <Row>
                    <Col sm="3">
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
                    </Col>
                    {values?.is_registered === 'YES' && (
                      <Col sm="9">
                        <div className="input-error" ref={ref}>
                          <Row className="mb-4 align-items-center">
                            <Col sm={2}><Label className="col-form-label form-label-title">{t("Till")}</Label></Col>
                            <Col sm={5}>
                              {isComponentVisible == 'till_registered' && <Calendar
                                onChange={item => onChangeDate(item, 'pickup_date_target')}
                                date={pickupdate}
                              />}
                              <Input
                                placeholder="YYYY-DD-MM"
                                value={dateFormate(values['till_registered'], false)}
                                readOnly
                                onClick={() => setIsComponentVisible((prev) => (prev != "till_registered" ? "till_registered" : ""))}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    )}
                </Row>
              </Col>
            </Row>
        </Col>
      </Row>

      <Row className='mb-4 align-items-center g-2'>
        <Col sm="3" style={{marginTop: "0px"}}><Label className='col-form-label form-label-title form-label'> {t("Insured")}</Label></Col>
        <Col sm="9">
            <Row>
              <Col sm="12">
                <Row>
                    <Col sm="3">
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
                    </Col>
                    {values?.is_insured === 'YES' && (
                      <Col sm="9">
                        <div className="input-error" ref={ref}>
                          <Row className="mb-4 align-items-center">
                            <Col sm={2}><Label className="col-form-label form-label-title">{t("Till")}</Label></Col>
                            <Col sm={5}>
                              {isComponentVisible == 'till_insured' && <Calendar
                                onChange={item => onChangeDate(item, "till_insured")}
                                date={pickupdate}
                              />}
                              <Input
                                placeholder="YYYY-DD-MM"
                                value={dateFormate(values['till_insured'], false)}
                                readOnly
                                onClick={() => setIsComponentVisible((prev) => (prev != "till_insured" ? "till_insured" : ""))}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    )}
                </Row>
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
