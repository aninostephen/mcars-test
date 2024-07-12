"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Col } from "reactstrap";
import { bt } from "@/Utils/AxiosUtils/API";
import BodyType from "@/Components/BodyType";

const BodyTypeCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <BodyType 
        url={bt}
        moduleName="Body Type"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default BodyTypeCreate;
