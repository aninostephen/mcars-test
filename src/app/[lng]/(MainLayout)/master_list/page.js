"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Col } from "reactstrap";
import { role } from "@/Utils/AxiosUtils/API";

const MList = dynamic(() => import("@/Components/MasterList"),{  suspense: true,});

const MasterList = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <MList
        url={role}
        moduleName="Master List"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default MasterList;
