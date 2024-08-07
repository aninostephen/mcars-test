'use client'
import { Card, CardBody, Col, Row } from "reactstrap";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { remit } from "@/Utils/AxiosUtils/API";
import RemitForm from "@/Components/Remit/Form";

const RemitUpdate = ({ params }) => {
  const { mutate, isLoading } = useUpdate(remit, params?.updateId, "/remit");

  return (
    params?.updateId && (
      <Row>
        <Col sm="8" className="m-auto">
          <Card >
            <CardBody>
              <div className="card-header-2">
                <h5>Remit</h5>
              </div>
              <RemitForm mutate={mutate} updateId={params?.updateId} loading={isLoading} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default RemitUpdate;