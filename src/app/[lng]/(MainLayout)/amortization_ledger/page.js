"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Col } from "reactstrap";
import { cu } from "@/Utils/AxiosUtils/API";
import Ledgers from "@/Components/AmortLedger/Index"

const AmortizationLedgerCreate = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <Ledgers
        paramsProps={{
          isLedger: true,
        }}
        url={cu}
        moduleName="Amortization Ledgers"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default AmortizationLedgerCreate;
