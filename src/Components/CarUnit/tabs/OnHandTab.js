import React, { useContext } from "react";
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import SimpleInputField from "../../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import DescriptionInput from "../DescriptionInput";
import CalendarField from "@/Components/InputFields/CalendarField";
import { MoneyFormat } from "@/Utils/utils";

// import CheckBoxField from "../InputFields/CheckBoxField";

const OnHandTab = ({ values, setFieldValue, errors, updateId, users, touched }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            title: t("Stability"),
            name: "stability",
            require: "true",
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
            value: MoneyFormat(values?.on_handling_payment),
            name: "on_handling_payment",
            inputaddon: "true",
            title: t("OnHandlingPayment"),
            require: "true",
            placeholder: t("OnHandlingPayment"),
          },
        ]}
      />

      <CalendarField
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        label={t("TargetPickupDate")}
        name="pickup_date_target"
      />

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
              require: "true",
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
