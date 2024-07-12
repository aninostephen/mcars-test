import React, { useContext, useEffect, useState } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField";
// import VariationsTab from "./VariationsTab";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import ToggleInput from "@/Components/InputFields/ToggleInput";
import CheckBoxField from "@/Components/InputFields/CheckBoxField";

const StatusInformation = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <ToggleInput
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
      />

      <CheckBoxField name="status" />
    </>
  );
};

export default StatusInformation;
