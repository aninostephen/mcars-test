import React, { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import { dateFormat, generateCountData, generateMonthlySchedule, MoneyFormat, NumericFormat } from "@/Utils/utils";
import CalendarField from "../../components/CalendarField";
import dayjs from "dayjs";
import { Stack, Alert } from "@mui/material";

const AmortizationAccount = ({ values, setFieldValue, errors, updateId, touched }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  const today = dayjs();
  let nextDue = today;
  let endDate = today;
  let totalMonth = 0;
  let amortizationAmount = '';
  let totalAmortization = '';
  if (values?.due_date) {
    nextDue = today.date(values?.due_date);
    if (today.isAfter(nextDue)) {
      nextDue = nextDue.add(1, "month");
    }
  }

  if (values?.month_contract) {
    const monthPaid = values?.month_paid ? values?.month_paid : 0;
    totalMonth = parseInt(values?.month_contract) - monthPaid;
    endDate = nextDue.add(totalMonth, "month");
  }

  if (values?.amort_amount) {
    amortizationAmount = parseInt(NumericFormat(values?.amort_amount));
    amortizationAmount = MoneyFormat(amortizationAmount);
  }

  if (values?.amort_amount && values?.month_contract) {
    const totalAmort = parseInt(NumericFormat(values?.amort_amount)) * totalMonth;
    totalAmortization = MoneyFormat(totalAmort);
  }

  return (
    <>
      <div style={{marginBottom: 20, marginLeft: '0px !important'}}>
        <Alert severity="info">
          <Stack direction="column" spacing={1.5}>
            <div><b>Next DueDate:</b> {dayjs(nextDue).format(dateFormat)}</div>
            <div><b>End date:</b> {dayjs(endDate).format(dateFormat)}</div>
            {amortizationAmount && (<div><b>Monthly Amortization:</b> {amortizationAmount}</div>)}
            {totalAmortization && (<div><b>Total Amortization:</b> {totalAmortization}</div>)}
          </Stack>
        </Alert>
      </div>
      <SearchableSelectInput
        nameList={[
          {
            title: t("DueEveryMonth"),
            name: "due_date",
            require: "true",
            inputprops: {
              name: "due_date",
              id: "due_date",
              options: generateMonthlySchedule().map((item, idx) => ({ id: idx+1, name: item })),
            },
          },
        ]}
      />

      <CalendarField
        value={values?.next_due}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        label={t("NextDue")}
        name="next_due"
      />

      <SimpleInputField 
        nameList={
          [
            {
              title: t("bankName"),
              name: "bank_name",
              require: "true",
              placeholder: t("bankName")
            },
          ]
      }/>

      <SearchableSelectInput
        nameList={[
          {
            title: t("MonthContract"),
            name: "month_contract",
            require: "true",
            inputprops: {
              name: "month_contract",
              id: "month_contract",
              options: [
                { id: 36, name: "36 Month" },
                { id: 48, name: "48 Month" },
                { id: 60, name: "60 Month" },
                { id: 72, name: "72 Month" },
              ],
            },
          },
        ]}
      />

      <SearchableSelectInput
        nameList={[
          {
            title: t("MonthPaid"),
            name: "month_paid",
            require: "true",
            inputprops: {
              name: "month_paid",
              id: "month_paid",
              options: generateCountData(100, 0).map((month, idx) => ({ id: idx, name: `${month} month`})),
            },
          },
        ]}
      />

      <SimpleInputField
        nameList={[
            {
              value: MoneyFormat(values?.amort_amount),
              name: "amort_amount",
              require: "true",
              inputaddon: "true",
              title: t("AmortAmount"),
              placeholder: t("AmortAmount"),
            },
        ]}
      />

      <SimpleInputField 
        nameList={
          [
            {
              title: t("AccountNo"),
              name: "account_no",
              require: "true",
              placeholder: t("AccountNo")
            },
          ]
      }/>
    </>
  );
};

export default AmortizationAccount;
