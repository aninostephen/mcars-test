'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, Col, Row } from 'reactstrap'
import SelectUser from '@/Components/Transaction/SelectUser'
import UnitSelection from '@/Components/Transaction/UnitSelection'
import { release, cu } from '@/Utils/AxiosUtils/API'
import { YupObject } from '@/Utils/Validation/ValidationSchemas'
import useCreate from "@/Utils/Hooks/useCreate";
import request from '@/Utils/AxiosUtils';
import Loader from '@/Components/CommonComponent/Loader';
import UnitInformation from '@/Components/Transaction/UnitInformation';
import ConfimationModal from '@/Components/Transaction/ConfimationModal';
import { NumericFormat } from '@/Utils/utils';
import { useSearchParams } from 'next/navigation'
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Btn from '@/Elements/Buttons/Btn';
import { RiDownload2Fill } from "react-icons/ri";
import { validationSchema } from '../validation';

const Transaction = () => {
    const searchParams = useSearchParams()
    const reservationId = searchParams.get('unit');
    const refRefetch = useRef();
    const [modal, setModal] = useState(false);

    let reserveData;
    if (reservationId) {

        const { data: reservationData, isLoading: reserveLoading, refetch: refetchReserve } = useQuery([reservationId], () => request({
            url: `reservation/${reservationId}`
        }), { refetchOnWindowFocus: false, enabled: false, select: (data) => data.data });

        reserveData = reservationData;
        useEffect(() => {
            refetchReserve();
        }, [])
    }

    const { data: units, isFetching, isLoading, refetch } = useQuery([cu], () => request({
      url: cu
    }), {
      refetchOnWindowFocus: false,
      enabled: false,
      select: (data) => data.data.data.map((item) => ({ id: item, name: item.car_name })) 
    });

    useEffect(() => {
        refetch();
    }, [])

    const { mutate: createRelease, isLoading: saveLoading } = useCreate(release, false, '/reservation', false, () => {
      refRefetch.current.call();
    });

    if ((isFetching && isLoading) || saveLoading) return <Loader />;
    return (
        <div className='save-back-button'>
            <Formik
                initialValues={{
                    car_unit_id: reserveData && reservationId ? reserveData?.car_unit : '',
                    new_owner_id: reserveData && reservationId ? reserveData?.new_owner_id : '',
                    payment_type: '',
                    price: '',
                    already_payment: '',
                    later_payment: '',
                    staggered_payment: '',
                    release_type: '',
                    appointment: '',
                    old_owner_id: '',
                    remarks: '',
                    downpayment: '',
                }}
                validationSchema={YupObject(validationSchema)}
                onSubmit={(values) => {
                    values.old_owner_id = values?.car_unit_id?.old_owner.id;
                    values.car_unit_id = values?.car_unit_id?.id;

                    values.price = NumericFormat(values?.price);
                    values.already_payment = NumericFormat(values?.already_payment);
                    values.later_payment = NumericFormat(values?.later_payment);
                    values.staggered_payment = NumericFormat(values?.staggered_payment);
                    values.downpayment = NumericFormat(values?.downpayment);
                    createRelease(values)
                }}>
                {({ values, handleSubmit, setFieldValue }) => (
                    <>
                        <Form>
                            <Row>
                                {reserveData && reservationId  ? (
                                    <>
                                        <Col xxl="4" xl="5">
                                            <Card>
                                                <CardBody className='theme-form'>
                                                    <div className="title-header option-title">
                                                        <div className="d-flex align-items-center">
                                                            <h5>New Owner</h5>
                                                        </div>
                                                    </div>
                                                    <Typography variant="h5" component="h2">
                                                        {reserveData?.new_owner?.name}
                                                    </Typography>
                                                    <div>{reserveData?.new_owner?.email}</div>
                                                    <div>{reserveData?.new_owner?.phone}</div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <CardBody className='theme-form'>
                                                    <div className="title-header option-title">
                                                        <div className="d-flex align-items-center">
                                                            <h5>Unit</h5>
                                                        </div>
                                                    </div>
                                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                                        <Stack direction="column">
                                                            <img width="75px" src={`${reserveData?.car_unit?.car_thumbnail?.original_url}`} />
                                                        </Stack>
                                                        <Stack direction="column">
                                                            <Typography variant="h5" component="h2">
                                                                {reserveData?.car_unit?.car_name}
                                                            </Typography>
                                                        </Stack>
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
                                                    </Stack>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <SelectUser
                                            title="Select New Owner"
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            name="new_owner_id"
                                            userRole={''}
                                        />
                                        <UnitSelection 
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            units={units}
                                            title={"Unit"}
                                            setModal={setModal}
                                        />
                                    </>
                                )}
                            </Row>

                            {(values.car_unit_id || (reserveData && reservationId))  && (
                                <UnitInformation
                                    unit={values?.car_unit_id}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />  
                            )}
                            <ConfimationModal
                                modal={modal}
                                setModal={setModal}
                                handleSubmit={handleSubmit}
                            />
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default Transaction;