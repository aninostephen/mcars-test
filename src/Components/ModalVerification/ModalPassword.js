import React, { useState } from 'react';
import { Form, Formik } from "formik";
import { nameSchema, YupObject } from '@/Utils/Validation/ValidationSchemas'
import ShowModal from '@/Elements/Alerts&Modals/Modal'
import { Row, Col } from 'reactstrap'
import useCreate from '@/Utils/Hooks/useCreate'
import { Stack } from '@mui/material'
import Btn from '@/Elements/Buttons/Btn'
import SimpleInputField from '../InputFields/SimpleInputField';

const ModalPassword = ({ modal, setModal, title, handleSubmitModalPopup, isLoading }) => {
    return (
        <ShowModal open={modal} title={title} close={true} setModal={setModal}>
            <Row>
                <Col>
                    <Row>
                        <Col xl="12" lg="4">
                            <Stack direction="column" spacing={1.5} ali>
                            <SimpleInputField 
                                nameList={
                                [
                                    {
                                        title: "Pass",
                                        type: "password",
                                        name: "password",
                                        require: "true",
                                        placeholder: "Password"
                                    },
                                ]
                            } />
                            </Stack>
                        </Col>
                        <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
                            <Btn
                                className="btn-primary btn-lg"
                                title="Submit"
                                disabled={isLoading}
                                loading={Number(isLoading)}
                                onClick={handleSubmitModalPopup}
                            />
                        </div>
                        
                    </Row>
                </Col>
            </Row>
        </ShowModal>
    );
};

export default ModalPassword;