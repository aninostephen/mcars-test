"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Col } from "reactstrap";
import { cu } from "@/Utils/AxiosUtils/API";
import CarUnit from "@/Components/CarUnit";

const CarUnitCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <CarUnit 
        url={cu}
        moduleName="Car Unit"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default CarUnitCreate;
