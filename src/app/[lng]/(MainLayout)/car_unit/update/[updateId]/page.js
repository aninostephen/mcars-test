'use client'
import { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useTranslation } from "@/app/i18n/client";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { cu } from "@/Utils/AxiosUtils/API";
import I18NextContext from "@/Helper/I18NextContext";
import CarUnitForm from "@/Components/CarUnit/CarUnitForm";

const CuUpdate = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useUpdate(cu, params?.updateId, "/car_unit");
  return (
    params?.updateId && (
      <CarUnitForm mutate={mutate} updateId={params?.updateId} loading={isLoading} />
    )
  );
};

export default CuUpdate;