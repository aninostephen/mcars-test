'use client'
import { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useTranslation } from "@/app/i18n/client";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { cm } from "@/Utils/AxiosUtils/API";
import I18NextContext from "@/Helper/I18NextContext";
import CmForm from "@/Components/CarMake/Form";

const CmUpdate = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useUpdate(cm, params?.updateId, "/car_make");

  return (
    params?.updateId && (
      <Row>
        <Col sm="8" className="m-auto">
          <Card >
            <CardBody>
              <div className="card-header-2">
                <h5>Car Make</h5>
              </div>
              <CmForm mutate={mutate} updateId={params?.updateId} loading={isLoading} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default CmUpdate;