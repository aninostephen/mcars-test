import React, { useContext, useEffect, useState } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField";
// import VariationsTab from "./VariationsTab";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const CarRefTab = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <SimpleInputField 
        nameList={
          [
            {
              title: t("EngineNo"),
              name: "engine_number",
              require: "true",
              placeholder: t("EngineNo")
            },
          ]
      } />

      <SimpleInputField 
        nameList={
          [
            {
              title: t("ChasisNumber"),
              name: "chasis_number",
              require: "true",
              placeholder: t("ChasisNumber")
            },
          ]
      } />

      <SimpleInputField 
        nameList={
          [
            {
              title: t("MVfileNumber"),
              name: "mvfile_number",
              require: "true",
              placeholder: t("MVfileNumber")
            },
          ]
      } />

      <SimpleInputField 
        nameList={
          [
            {
              title: t("CRNumber"),
              name: "cr_number",
              require: "true",
              placeholder: t("CRNumber")
            },
          ]
      } />
    </>
  );
};

export default CarRefTab;
