"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import { client } from "@/Utils/AxiosUtils/API";
import Client from "@/Components/Client";

const ClientCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <Client 
        url={client}
        moduleName="Client"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default ClientCreate;
