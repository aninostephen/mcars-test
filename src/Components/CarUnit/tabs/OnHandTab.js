import React, { useContext, useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import SimpleInputField from "../../InputFields/SimpleInputField";
// import VariationsTab from "./VariationsTab";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import useOutsideDropdown from "@/Utils/Hooks/CustomHooks/useOutsideDropdown";
import { Calendar } from "react-date-range";
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import DescriptionInput from "../DescriptionInput";
// import CheckBoxField from "../InputFields/CheckBoxField";


const OnHandTab = ({ values, setFieldValue, errors, updateId, users }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [pickupdate, setPickupdate] = useState();
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();

  const onChangeDate = (item) => {
    setPickupdate(item);
    setFieldValue("pickup_date_target", item);
    setIsComponentVisible(false);
  }

  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            title: t("Stability"),
            name: "stability",
            require: "false",
            inputprops: {
              name: "stability",
              id: "stability",
              options: [
                { id: "FOR_PICK_UP_UNIT", name: "For pick-up unit" },
                { id: "UNIT_ALREADY_IN_SHOWROOM", name: "Unit already in showroom" },
              ],
            },
          },
        ]}
      />

      <SimpleInputField
        nameList={[
            {
              type: 'number',
              name: "on_handling_payment",
              inputaddon: "true",
              title: t("OnHandlingPayment"),
              placeholder: t("OnHandlingPayment"),
            },
        ]}
      />
      
      {/* <SimpleInputField 
        nameList={
          [
            {
              title: t("ContactName"),
              name: "contact_name",
              require: "false",
              placeholder: t("ContactName")
            },
          ]
        } />

      <SimpleInputField 
        nameList={
          [
            {
              title: t("ContactNo"),
              name: "contact_no",
              require: "false",
              placeholder: t("ContactNo")
            },
          ]
      } /> */}

      <div className="input-error" ref={ref}>
        <Row className="mb-4 align-items-center">
          <Col sm={2}><Label className="col-form-label form-label-title">{t("TargetPickupDate")}</Label></Col>
          <Col sm={5}>
            {isComponentVisible == 'pickup_date_target' && <Calendar
              onChange={item => onChangeDate(item)}
              date={pickupdate}
            />}
            <Input
              placeholder="YYYY-DD-MM"
              value={dateFormate(values['pickup_date_target'], false)}
              readOnly
              onClick={() => setIsComponentVisible((prev) => (prev != "pickup_date_target" ? "pickup_date_target" : ""))}
            />
          </Col>
        </Row>
      </div>

      <SearchableSelectInput
        nameList={[
          {
            title: t("AssignDriver"),
            name: "driver_user_id",
            require: "false",
            inputprops: {
              name: "driver_user_id",
              id: "driver_user_id",
              options: users,
            },
          },
        ]}
      />

      <SearchableSelectInput
        nameList={[
          {
            title: t("BackupDriver"),
            name: "backup_user_id",
            require: "false",
            inputprops: {
              name: "backup_user_id",
              id: "backup_user_id",
              options: users,
            },
          },
        ]}
      />

      <SimpleInputField 
        nameList={
          [
            {
              title: t("PickUpDestination"),
              name: "pickup_destination",
              require: "false",
              placeholder: t("PickUpDestination")
            },
          ]
      } />

      <DescriptionInput
        values={values}
        setFieldValue={setFieldValue}
        title={t('Remarks')}
        nameKey="remarks"
      />
    </>
  );
};

export default OnHandTab;
