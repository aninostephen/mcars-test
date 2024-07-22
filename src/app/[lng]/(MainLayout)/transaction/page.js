"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import { release } from "@/Utils/AxiosUtils/API";
import ReleaseStation from "@/Components/Transaction";

const CarMakeCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <ReleaseStation 
        url={release}
        moduleName="Release Station"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default CarMakeCreate;
