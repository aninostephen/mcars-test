import { useContext } from "react";
// import { AllCountryCode } from "../../Data/AllCountryCode";
//import SearchableSelectInput from "../InputFields/SearchableSelectInput";
// import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { AllCountryCode } from "@/Data/AllCountryCode";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";

const UserDetail1 = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <>
      <SimpleInputField
        nameList={[
          { name: "name", placeholder: t("EnterUserName"), require: "true" },
          {
            type: "email",
            name: "email",
            placeholder: t("EnterEmailAddress"),
            require: "true",
          },
        ]}
      />
      <SimpleInputField
          nameList={[
            {
              name: "phone",
              type: "number",
              placeholder: t("EnterPhoneNumber"),
              require: "true",
            },
          ]}
        />
    </>
  );
};

export default UserDetail1;
