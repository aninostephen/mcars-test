import React, { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import { generateCountData, generateMonthlySchedule, MoneyFormat } from "@/Utils/utils";
import { Banks } from "@/Utils/Banks";

const AmortizationAccount = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            title: t("DueDate"),
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

      <SearchableSelectInput
        nameList={[
          {
            title: t("bankName"),
            name: "bank_name",
            require: "true",
            inputprops: {
              name: "bank_name",
              id: "bank_name",
              options: Banks.map((item) => ({ id: item, name: item })),
            },
          },
        ]}
      />

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
                { id: "36", name: "36 Month" },
                { id: "48", name: "48 Month" },
                { id: "60", name: "60 Month" },
                { id: "72", name: "72 Month" },
              ],
            },
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

    </>
  );
};

export default AmortizationAccount;
