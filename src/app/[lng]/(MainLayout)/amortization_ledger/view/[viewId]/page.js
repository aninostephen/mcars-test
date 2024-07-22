'use client'
import { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import AmortizationDetails from "@/Components/AmortLedger/AmortizationDetails";

const AmortView = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    params?.viewId && (
        <AmortizationDetails viewId={params?.viewId} />
    )
  );
};

export default AmortView;