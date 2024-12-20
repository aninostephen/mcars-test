import React, { useContext, useEffect, useState } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import CheckBoxField from "@/Components/InputFields/CheckBoxField";
import { MoneyFormat } from "@/Utils/utils";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import DescriptionInput from "../DescriptionInput";

const StatusInformation = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
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

      {values['transactions'] === 'ASSUME_UNIT' && (
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
      )}
      
      <DescriptionInput
        values={values}
        setFieldValue={setFieldValue}
        title={t('Remarks')}
        nameKey="remarks"
      />

      <CheckBoxField name="status" />
    </>
  );
};

export default StatusInformation;
