import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import {
    RiAccountPinCircleFill,
    RiMailOpenFill,
    RiPhoneFill,
  } from "react-icons/ri";
import SimpleInputField from '../InputFields/SimpleInputField';
import SearchableSelectInput from '../InputFields/SearchableSelectInput';
import CkEditorComponent from '../InputFields/CkEditorComponent';
import { MoneyFormat } from '@/Utils/utils';

function UnitInformation({ unit, values, setFieldValue }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    return (
        <div>
            <Col sm="12">
                <Row>
                    <Col xxl="4" xl="5">
                        <Card>
                            <CardBody>
                                <div className="title-header option-title">
                                    <div className="d-flex align-items-center">
                                        <h5>Old Owner</h5>
                                    </div>
                                </div>
                            </CardBody>
                            <ListGroup flush>
                                <ListGroupItem>
                                    <RiAccountPinCircleFill /> {unit?.old_owner.name}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <RiMailOpenFill /> {unit?.old_owner.email}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <RiPhoneFill /> {unit?.old_owner.phone}
                                </ListGroupItem>
                            </ListGroup>
                            <CardBody>
                                <div className="title-header option-title">
                                    <div className="d-flex align-items-center">
                                        <h5>{unit?.car_name}</h5>
                                    </div>
                                </div>
                            </CardBody>
                            <ListGroup flush>
                                <ListGroupItem>
                                    <strong>Brand:</strong> {unit?.car_make.car_make_name}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Body Type:</strong> {unit?.body_type.body_type_name}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Transmission:</strong> {unit?.transmission}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Model Variant:</strong> {unit?.model_variant}
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col xxl="8" xl="5">
                    <Card>
                        <CardBody>
                            <div className="title-header option-title">
                                <div className="d-flex align-items-center">
                                    <h5>Release Unit Form</h5>
                                </div>
                            </div>
                        </CardBody>
                        <SearchableSelectInput
                            nameList={[
                            {
                                title: "Payment",
                                name: "payment_type",
                                require: "true",
                                inputprops: {
                                    name: "payment_type",
                                    id: "payment_type",
                                    options: [
                                        { id: "DOWNPAYMENT", name: "Downpayment Price" },
                                        { id: "PAYOFF", name: "Pay-off Price" },
                                    ],
                                },
                            },
                            ]}
                        />
                        <SimpleInputField 
                            nameList={
                            [
                                {
                                    value: MoneyFormat(values.price),
                                    title: "Price",
                                    name: "price",
                                    inputaddon: "true",
                                    require: "true",
                                    placeholder: "Price"
                                },
                            ]
                        } />

                        <SimpleInputField 
                            nameList={
                            [
                                {
                                    value: MoneyFormat(values.already_payment),
                                    title: "Already Payment",
                                    name: "already_payment",
                                    inputaddon: "true",
                                    require: "true",
                                    placeholder: "Already Payment"
                                },
                            ]
                        } />

                        <SimpleInputField 
                            nameList={
                            [
                                {
                                    value: MoneyFormat(values.later_payment),
                                    title: "Later Payment",
                                    name: "later_payment",
                                    inputaddon: "true",
                                    require: "true",
                                    placeholder: "Later Payment"
                                },
                            ]
                        } />

                        <SimpleInputField 
                            nameList={
                            [
                                {
                                    value: MoneyFormat(values.staggered_payment),
                                    title: "Staggered Payment",
                                    name: "staggered_payment",
                                    inputaddon: "true",
                                    require: "true",
                                    placeholder: "Staggered Payment"
                                },
                            ]
                        } />

                        <SearchableSelectInput
                            nameList={[
                            {
                                title: "Release Type",
                                name: "release_type",
                                require: "true",
                                inputprops: {
                                    name: "release_type",
                                    id: "release_type",
                                    options: [
                                        { id: "SELL", name: "Sell" },
                                        { id: "TRADE", name: "Trade" },
                                    ],
                                },
                            },
                            ]}
                        />

                        <SearchableSelectInput
                            nameList={[
                            {
                                title: "Appointment",
                                name: "appointment",
                                require: "true",
                                inputprops: {
                                    name: "appointment",
                                    id: "appointment",
                                    options: [
                                        { id: "unit_pickup", name: "Unit Pickup here" },
                                        { id: "unit_deliver", name: "Unit Deliver to client" },
                                    ],
                                },
                            },
                            ]}
                        />
                        <div className="input-error">
                            <Row className="mb-4 align-items-center g-md-4 g-2">
                                <Col sm={2}>
                                    <span className="col-form-label form-label-title form-label">
                                        Remarks
                                    </span>
                                </Col>
                                <Col sm={10}>
                                    <CkEditorComponent
                                        name="remarks"
                                        onChange={(data) => {
                                            setFieldValue('remarks', data)
                                        }} 
                                        value={values.remarks}
                                        editorLoaded={editorLoaded}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default UnitInformation;