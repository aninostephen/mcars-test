import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import {
  RiAccountPinCircleFill,
  RiMailOpenFill,
  RiPhoneFill,
} from "react-icons/ri";
import SimpleInputField from '../InputFields/SimpleInputField';
import SearchableSelectInput from '../InputFields/SearchableSelectInput';
import CkEditorComponent from '../InputFields/CkEditorComponent';
import { MoneyFormat, NumericFormat } from '@/Utils/utils';
import SettingContext from '@/Helper/SettingContext';
import {Typography, Divider, Stack } from '@mui/material';

function UnitInformation({ unit, values, setFieldValue }) {
    const { currencySymbol } = useContext(SettingContext);
    const [editorLoaded, setEditorLoaded] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    let staggeredPayment = 0;
    if (values?.payment_type === 'STAGGERED') {
        const downpayment = parseInt(NumericFormat(unit?.downpayment));
        const alreadyPayment = values?.already_payment ? parseInt(NumericFormat(values?.already_payment)) : 0 ;
        const laterPayment = values?.later_payment ? parseInt(NumericFormat(values?.later_payment)) : 0;
        staggeredPayment = (alreadyPayment || laterPayment)
            ? downpayment - (alreadyPayment + laterPayment) < 0 
                ? 0
                : downpayment - (alreadyPayment + laterPayment)
            : 0;
        values.staggered_payment = MoneyFormat(staggeredPayment);
    }
    
    if (values?.payment_type === 'FULL_DOWNPAYMENT') {
        const downpayment = MoneyFormat(unit.downpayment)
        values.downpayment = downpayment;
    }

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
                        {(values?.payment_type === 'STAGGERED' || values?.payment_type === 'FULL_DOWNPAYMENT') && (
                            <>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h6" component="div">
                                        Staggered Payment:
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {currencySymbol} {MoneyFormat(staggeredPayment)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h6" component="div">
                                        Downpayment:
                                    </Typography>
                                    <Typography color="red" gutterBottom variant="h6" component="div">
                                        {currencySymbol} {MoneyFormat(unit?.downpayment)}
                                    </Typography>
                                </Stack>
                                <Stack mb={2}>
                                    <Divider mb={3} />
                                </Stack>
                            </>
                        )}
                        
                        <SearchableSelectInput
                            nameList={[
                            {
                                title: "Payment Type",
                                name: "release_type",
                                require: "true",
                                inputprops: {
                                    name: "release_type",
                                    id: "release_type",
                                    options: [
                                        { id: "SELL", name: "Sell" },
                                        { id: "TRADE", name: "Trade-In" },
                                    ],
                                },
                            },
                            ]}
                        />

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
                                        { id: "STAGGERED", name: "Staggered Payment" },
                                        { id: "FULL_PAYMENT", name: "Full Payment(Cash Unit)" },
                                        { id: "FULL_DOWNPAYMENT", name: "Full Downpayment" },
                                    ],
                                },
                            },
                            ]}
                        />

                        {values?.payment_type === 'FULL_PAYMENT' && (
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
                        )}

                        {values?.payment_type === 'FULL_DOWNPAYMENT' && (
                            <SimpleInputField 
                                nameList={
                                [
                                    {
                                        value: MoneyFormat(unit.downpayment),
                                        title: "DP Price",
                                        name: "downpayment",
                                        inputaddon: "true",
                                        require: "true",
                                        placeholder: "Downpayment Price",
                                        helpertext: `Downpayment of this unit is ${currencySymbol}${MoneyFormat(unit?.downpayment)}`
                                    },
                                ]
                            } />
                        )}

                        {values?.payment_type === 'STAGGERED' && (
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
                        )}

                        {values?.payment_type === 'STAGGERED' && (
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
                        )}

                        {values?.payment_type === 'STAGGERED' && (
                            <SimpleInputField 
                                nameList={
                                    [
                                        {
                                            readOnly: true,
                                            value: values.staggered_payment,
                                            title: "Staggered Payment",
                                            name: "staggered_payment",
                                            inputaddon: "true",
                                            require: "true",
                                            placeholder: "Staggered Payment"
                                        },
                                    ]
                            } />
                        )}

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