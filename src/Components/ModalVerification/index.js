import React, { useState } from 'react';
import { Form, Formik } from "formik";
import { nameSchema, YupObject } from '@/Utils/Validation/ValidationSchemas'
import ShowModal from '@/Elements/Alerts&Modals/Modal'
import { Row, Col } from 'reactstrap'
import useCreate from '@/Utils/Hooks/useCreate'
import { Stack } from '@mui/material'
import SimpleInputField from '../InputFields/SimpleInputField';
import Btn from '@/Elements/Buttons/Btn'

const ModalVerification = ({ modal, item, setModal }) => {
    const { mutate, isLoading } = useCreate(item.api, false, item.redirection, "Successfully Save");
    
    return (
        <ShowModal open={modal} title={item.title} close={true} setModal={setModal}>
            <Formik
                validateOnChange={false}
                initialValues={item.itemKey}
                validationSchema={YupObject(item.validation)}
                onSubmit={(values) => {
                    mutate(values);
                }}>
                {({ values, errors, setFieldValue, touched }) => (
                    <Form className="theme-form theme-form-2 mega-form vertical-tabs">
                        <Row>
                            <Col>
                                <Row>
                                    <Col xl="12" lg="4">
                                        <Stack direction="column" spacing={1.5} ali>
                                            <div className="customer-detail tracking-wrapper">
                                                <ul>
                                                    {item?.data && item?.data?.map((i) => (
                                                       <li key={i?.value}>
                                                            <label>{i.label}:</label>
                                                            <h4>{i?.value}</h4>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {item?.fields(errors, setFieldValue, values, touched)}
                                        </Stack>
                                    </Col>
                                    <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
                                        <Btn
                                            className="btn-primary btn-lg"
                                            type="submit"
                                            title="Pay"
                                            disabled={isLoading}
                                            loading={Number(isLoading)}
                                        />
                                    </div>
                                    
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </ShowModal>
    );
};

export default ModalVerification;