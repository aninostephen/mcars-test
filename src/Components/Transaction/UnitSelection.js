import React, { useContext, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import ConfimationModal from "./ConfimationModal";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import Btn from "@/Elements/Buttons/Btn";
import { RiDownload2Fill } from "react-icons/ri";

const UnitSelection = ({ 
  values,
  title,
  units,
  setModal
}) => {
  return (
    <>
      <Col>
        <Card>
          <CardBody>
            <div className="title-header option-title">
              <div className="d-flex align-items-center">
                <h5>{title}</h5>
              </div>
            </div>
            <Row>
              <Col xs="7">
                <SearchableSelectInput
                  nameList={[
                    {
                      title: "Unit",
                      name: "car_unit_id",
                      notitle: 'true',
                      require: "true",
                      inputprops: {
                        name: "car_unit_id",
                        id: "car_unit_id",
                        options: units,
                      },
                    },
                  ]}
                />
              </Col>
              <Col xs="5">
                <Btn
                  className="btn btn-outline btn-primary btn-theme"
                  type="button"
                  title="Create Release Transaction"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <RiDownload2Fill />
                </Btn>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default UnitSelection;
