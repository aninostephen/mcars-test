"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import { reservation } from "@/Utils/AxiosUtils/API";
import Reservation from "@/Components/Reservation";

const CarUnitCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <Reservation 
        url={reservation}
        moduleName="Reservation"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default CarUnitCreate;
