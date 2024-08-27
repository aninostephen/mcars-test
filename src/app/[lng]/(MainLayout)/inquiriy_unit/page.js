"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Col } from "reactstrap";
import { inquiry } from "@/Utils/AxiosUtils/API";
import Inquiriy_unit from "@/Components/inquiriy_unit";

const CarMakeCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <Inquiriy_unit 
        onlyTitle={true}
        url={inquiry}
        moduleName="Inquiry"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default CarMakeCreate;
