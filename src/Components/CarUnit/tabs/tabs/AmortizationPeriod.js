import React, { useContext, useState } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";

import useOutsideDropdown from "@/Utils/Hooks/CustomHooks/useOutsideDropdown";
import { Calendar } from "react-date-range";
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import { Alert, Col, Input, Label, Row } from "reactstrap";
import { generateCountData } from "@/Utils/utils";
import CalendarField from "../../components/CalendarField";

const AmortizationPeriod = ({ values, setFieldValue, errors, updateId, touched }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  const [pickupdate, setPickupdate] = useState();
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();

  const onChangeDate = (item, field) => {
    setPickupdate(item);
    setFieldValue(field, item);
    setIsComponentVisible(false);
  }

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col md={12}>
          <Alert color="warning">
            For Accuracy of data entry need statement of account (SOA) of were finance the unit
          </Alert>
        </Col>
        <Col md={12}>
          <Alert color="warning">
            MCars contract month period nalang input pwedi din pra hindi mahirapan sa SOA na nanggaling sa finance.
          </Alert>
        </Col>
        <Col md={12}>
        <Alert color="danger">
          <h4 className="alert-heading">
            Reminders
          </h4>
          <p>
            Before you proceed to update, Please double check amortization entry, make sure is correct, because the system will automatically
            generate a ledger from starting date (Acquired date) paid to maturity date (Ending date)
          </p>
          <hr />
          <p className="mb-0">
            You can recorrect if no amortization transaction payment made.
          </p>
        </Alert>
        </Col>
      </Row>

      <CalendarField
        value={values?.amort_start_date}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        label={t("AmortStartDate")}
        name="amort_start_date"
      />

      <CalendarField
        value={values?.amort_end_date}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        label={t("AmortEndDate")}
        name="amort_end_date"
      />

      <SearchableSelectInput
        nameList={[
          {
            title: t("MonthPaid"),
            name: "month_paid",
            inputprops: {
              name: "month_paid",
              id: "month_paid",
              options: generateCountData(100).map((month, idx) => ({ id: idx, name: `${month} month`})),
            },
          },
        ]}
      />

    </>
  );
};

export default AmortizationPeriod;
