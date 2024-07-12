"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Col } from "reactstrap";
import { cm } from "@/Utils/AxiosUtils/API";
import CarMake from "@/Components/CarMake";

const CarMakeCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <CarMake 
        url={cm}
        moduleName="Car Make"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default CarMakeCreate;
