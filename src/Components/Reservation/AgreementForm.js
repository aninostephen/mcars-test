import React, { useContext, useEffect, useState } from 'react';
import SimpleInputField from '../InputFields/SimpleInputField';
import {  Col, Row } from 'reactstrap';
import SearchableSelectInput from '../InputFields/SearchableSelectInput';
import { getValueById, MoneyFormat, NumericFormat } from '@/Utils/utils';
import SettingContext from '@/Helper/SettingContext';
import CalendarField from './CalendarField';
import { Grid, Stack } from '@mui/material';
import CkEditorComponent from '../InputFields/CkEditorComponent';

const AgreementForm = ({ units, values, setFieldValue, errors, touched }) => {
    const { currencySymbol } = useContext(SettingContext);
    const [editorLoaded, setEditorLoaded] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    const unit = getValueById(values?.car_unit_id, units);
    let staggeredPayment = 0;
    if (values?.payment_type === 'STAGGERED' && unit?.length > 0) {
        const downpayment = parseInt(NumericFormat(unit[0]?.downpayment));
        const alreadyPayment = values?.already_payment ? parseInt(NumericFormat(values?.already_payment)) : 0 ;
        const laterPayment = values?.later_payment ? parseInt(NumericFormat(values?.later_payment)) : 0;
        staggeredPayment = (alreadyPayment || laterPayment)
            ? downpayment - (alreadyPayment + laterPayment) < 0 
                ? 0
                : downpayment - (alreadyPayment + laterPayment)
            : 0;
        values.staggered_payment = MoneyFormat(staggeredPayment);
    }
    
    if (values?.payment_type === 'FULL_DOWNPAYMENT' && unit?.length > 0) {
        const downpayment = MoneyFormat(unit[0]?.downpayment)
        values.downpayment = downpayment;
    }

    return (
        <>
            <div className="title-header option-title">
                <div className="d-flex align-items-center">
                    <h5>Terms of Agreement form</h5>
                </div>
            </div>

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
                            value: MoneyFormat(unit?.length > 0 ? unit[0]?.downpayment : 0),
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
                <>
                    <SimpleInputField 
                        nameList={
                        [
                            {
                                value: MoneyFormat(values.already_payment),
                                title: "First Payment",
                                name: "already_payment",
                                inputaddon: "true",
                                require: "true",
                                placeholder: "Already Payment"
                            },
                        ]
                    } />
                    <Stack direction='row' spacing={2}>
                        <Stack direction='row' spacing={2} alignItems="baseline">
                            <label className="col-form-label form-label-title form-label">Later Payment<span className="theme-color ms-2 required-dot">*</span></label>
                            <SimpleInputField 
                                nameList={
                                    [
                                        {
                                            value: MoneyFormat(values.later_payment),
                                            title: "Later Payment",
                                            nolabel: "true",
                                            name: "later_payment",
                                            inputaddon: "true",
                                            require: "true",
                                            placeholder: "Later Payment"
                                        },
                                    ]
                            } />
                        </Stack>
                        <Stack direction='row' spacing={2} alignItems="baseline">
                            <label className="col-form-label form-label-title form-label">Target Date<span className="theme-color ms-2 required-dot">*</span></label>
                            <CalendarField
                                noLabel={true}
                                values={values}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                touched={touched}
                                label="Target Date"
                                name="later_payment_target_date"
                            />
                        </Stack>
                    </Stack>

                    <Stack direction='row' spacing={2}>
                        <Stack direction='row' spacing={2} alignItems="baseline">
                            <label className="col-form-label form-label-title form-label">Staggered Payment<span className="theme-color ms-2 required-dot">*</span></label>
                            <SimpleInputField 
                                nameList={
                                    [
                                        {
                                            nolabel: "true",
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
                        </Stack>

                        <Stack direction='row' spacing={2} alignItems="baseline">
                            <label className="col-form-label form-label-title form-label">Target Date<span className="theme-color ms-2 required-dot">*</span></label>
                            <CalendarField
                                noLabel={true}
                                values={values}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                touched={touched}
                                label="Target Date"
                                name="staggered_payment_target_date"
                            />
                        </Stack>
                    </Stack>
                </>                
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
        </>
    );
};

export default AgreementForm;