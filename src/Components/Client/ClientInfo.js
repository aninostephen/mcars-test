import { useContext } from "react";
import { AllCountryCode } from "../../Data/AllCountryCode";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import DescriptionInput from "../CarUnit/DescriptionInput";
import ToggleInput from "../InputFields/ToggleInput";
import { MoneyFormat } from "@/Utils/utils";

const ClientInfo = ({ values, setFieldValue}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <>
      <SimpleInputField
        nameList={[
          { name: "age", placeholder: t("age"), require: "true" },
          {
            type: "text",
            name: "address",
            placeholder: t("Address"),
            require: "true",
          },
          {
            type: "text",
            name: "job",
            placeholder: t("Job"),
          },
          {
            value: MoneyFormat(values?.montly_income),
            name: "montly_income",
            title: t("MontlyIncome"),
            placeholder: t("MontlyIncome"),
          },
          {
            type: "text",
            name: "purpose",
            placeholder: t("Purpose"),
          },
        ]}
      />

      <SearchableSelectInput
          nameList={[
            {
              title: "Marital Status",
              name: "marital_status",
              require: "true",
              inputprops: {
                name: "marital_status",
                id: "marital_status",
                options: [
                  { id: "SINGLE", name: "Single" },
                  { id: "MARRIED", name: "Married" },
                ],
                defaultOption: "Marital Status",
              },
            },
          ]}
      />
    </>
  );
};

export default ClientInfo;
