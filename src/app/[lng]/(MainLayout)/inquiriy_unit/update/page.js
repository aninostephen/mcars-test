'use client'
import { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useTranslation } from "@/app/i18n/client";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { cm } from "@/Utils/AxiosUtils/API";
import I18NextContext from "@/Helper/I18NextContext";
import CmForm from "@/Components/CarMake/Form";

const InquiryEdit = ({ params }) => {
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
                <h5>User Inquiries</h5>
              </div>
              asdasdasd
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default InquiryEdit;