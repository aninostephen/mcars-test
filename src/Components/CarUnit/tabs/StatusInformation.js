import React, { useContext, useEffect, useState } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField";
// import VariationsTab from "./VariationsTab";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import ToggleInput from "@/Components/InputFields/ToggleInput";
import CheckBoxField from "@/Components/InputFields/CheckBoxField";
import { MoneyFormat } from "@/Utils/utils";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";

const StatusInformation = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {/* <ToggleInput
        {...{
          title: t("BackUpUnit"),
          name: "backup_unit",
          setFieldValue,
          values,
          inputprops: {
            name: "backup_unit",
            id: "backup_unit",
            options: [
              { id: "YES", name: "Yes" },
              { id: "NO", name: "No" },
            ],
          },
        }}
      /> */}

      <SearchableSelectInput
        nameList={[
          {
            title: t("FESections"),
            name: "fe_section",
            inputprops: {
              name: "fe_section",
              id: "fe_section",
              options: [
                { id: "", name: "Unset" },
                { id: "LATEST_UNIT", name: "Latest Unit" },
                { id: "TOP_SELLING", name: "Top Selling Unit" },
              ],
            },
          },
        ]}
      />

      <SimpleInputField
        nameList={
          [
            {
              value: MoneyFormat(values?.downpayment),
              title: t("Downpayment"),
              name: "downpayment",
              require: "false",
              inputaddon: "true",
              placeholder: t("Downpayment")
            },
          ]
      } />

      <CheckBoxField name="status" />
    </>
  );
};

export default StatusInformation;
