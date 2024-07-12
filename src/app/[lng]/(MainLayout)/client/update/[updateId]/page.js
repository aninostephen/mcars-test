'use client'
import { Card, CardBody, Col, Row } from "reactstrap";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { client } from "@/Utils/AxiosUtils/API";
import ClientForm from "@/Components/Client/Form";

const ClientUpdate = ({ params }) => {
  const { mutate, isLoading } = useUpdate(client, params?.updateId, "/client");

  return (
    params?.updateId && (
      <Row>
        <Col sm="8" className="m-auto">
          <Card >
            <CardBody>
              <div className="card-header-2">
                <h5>Client</h5>
              </div>
              <ClientForm mutate={mutate} updateId={params?.updateId} loading={isLoading} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default ClientUpdate;