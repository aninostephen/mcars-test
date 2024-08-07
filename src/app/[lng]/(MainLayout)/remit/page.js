"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import { remit } from "@/Utils/AxiosUtils/API";
import RemitList from "@/Components/Remit/RemitList";

const Remit = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <RemitList 
        url={remit}
        moduleName="Remit"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default Remit;
