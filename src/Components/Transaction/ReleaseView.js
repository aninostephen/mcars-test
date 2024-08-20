'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, Col, Row, ListGroup, ListGroupItem } from 'reactstrap'
import {
  RiAccountPinCircleFill,
  RiMailOpenFill,
  RiPhoneFill,
} from "react-icons/ri";
import { nameSchema } from '@/Utils/Validation/ValidationSchemas'
import SettingContext from '@/Helper/SettingContext';
import { MoneyFormat, NumericFormat } from '@/Utils/utils';
import { Typography, Divider, ButtonGroup, Button, Chip, Alert } from '@mui/material';
import { Stack } from '@mui/system';
import { Status } from '@/Utils/statues';
import ModalVerification from '../ModalVerification';
import { payModal } from './components/fields';
import GetRemitStatus from './components/GetRemitStatus';
import { STOCK_STATUS, STOCK_STATUS_ENUM } from '@/Utils/Enums';

const ReleaseView = ({ reserveData, id }) => {
    const { currencySymbol } = useContext(SettingContext);
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState({});


    const onHandleModalOpen = (data) => {
        let info = [],
            itemKey = {},
            validation = {};
        if (data?.type === 'void') {
            info = [
                {
                    label: 'Car Unit',
                    value: reserveData?.car_unit?.car_name
                },
                {
                    label: 'Type Payment',
                    value: data?.type
                }
            ]

            itemKey = {
                id: id,
                password: '',
                payment_type: data?.type,
                car_unit_id: reserveData?.car_unit?.id,
            };

            validation = {
                id: nameSchema,
                password: nameSchema,
                payment_type: nameSchema,
                car_unit_id: nameSchema,
            };
        } else {
            info = [
                {
                    label: 'Type Payment',
                    value: data?.type
                },
                {
                    label: 'Amount Pay',
                    value: `${currencySymbol} ${data?.payment ? MoneyFormat(data?.payment): 0}`
                }
            ]

            itemKey = {
                id: id,
                payment_type: data?.type,
                amount_pay: data?.payment,
                password: '',
            };

            validation = {
                id: nameSchema,
                password: nameSchema,
                payment_type: nameSchema,
                amount_pay: nameSchema,
            }
        }

        setItem(
            payModal({
                data,
                api: '/release-pay',
                redirection: '/transaction',
                title: "Pay Release Unit",
                info: info,
                itemKey: itemKey,
                validation: validation,
            })
        );
        setModal(true);
    }
    console.log(reserveData?.car_unit?.stock_status)
    return (
        <div className='save-back-button'>
            <>
              <Row>
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
                            </Stack>
                        </CardBody>
                    </Card>
                </Col>
              </Row>
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
                                  <RiAccountPinCircleFill /> {reserveData?.old_owner.name}
                              </ListGroupItem>
                              <ListGroupItem>
                                  <RiMailOpenFill /> {reserveData?.old_owner.email}
                              </ListGroupItem>
                              <ListGroupItem>
                                  <RiPhoneFill /> {reserveData?.old_owner.phone}
                              </ListGroupItem>
                          </ListGroup>
                          <CardBody>
                              <div className="title-header option-title">
                                  <div className="d-flex align-items-center">
                                      <h5>{reserveData?.car_name}</h5>
                                  </div>
                              </div>
                          </CardBody>
                          <ListGroup flush>
                              <ListGroupItem>
                                  <strong>Brand:</strong> {reserveData?.car_unit.car_make.car_make_name}
                              </ListGroupItem>
                              <ListGroupItem>
                                  <strong>Body Type:</strong> {reserveData?.car_unit.body_type.body_type_name}
                              </ListGroupItem>
                              <ListGroupItem>
                                  <strong>Transmission:</strong> {reserveData?.car_unit.transmission}
                              </ListGroupItem>
                              <ListGroupItem>
                                  <strong>Model Variant:</strong> {reserveData?.car_unit.model_variant}
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

                        {reserveData?.car_unit?.stock_status === STOCK_STATUS_ENUM.RELEASED && (
                           <Stack direction='row' sx={{ marginBottom: '20px' }} spacing={1.5}>
                                <Alert severity="success">
                                    <Stack direction='column' spacing={1.5}>
                                        <span>Driver: {reserveData?.car_unit?.driver_user_id ? reserveData?.car_unit?.driver?.name : '--'}</span>
                                        <span>Phone: {reserveData?.car_unit?.driver_user_id ? reserveData?.car_unit?.driver?.phone : '--'}</span>
                                    </Stack>
                                </Alert>
                                <Alert severity="success">
                                    <Stack direction='column' spacing={1.5}>
                                        <span>Backup driver: {reserveData?.car_unit?.driver_user_id ? reserveData?.car_unit?.backup_driver?.name : '--'}</span>
                                        <span>Phone: {reserveData?.car_unit?.driver_user_id ? reserveData?.car_unit?.backup_driver?.phone : '--'}</span>
                                    </Stack>
                                </Alert>
                           </Stack>
                        )}

                        {reserveData?.payment_type === 'FULL_PAYMENT' && (
                          <>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h7" component="div">
                                    Payment Type:
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {Status.RELEASE_PAYMENT_TYPE[reserveData?.payment_type]}
                                </Typography>
                            </Stack>
                            <Divider mb={1} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h7" component="div">
                                    Downpayment:
                                </Typography>
                                <Typography color="green" gutterBottom variant="h7" component="div">
                                    <Chip label={`Paid: ${currencySymbol} ${MoneyFormat(reserveData?.price)}`} color="success" />
                                </Typography>
                            </Stack>
                            <Divider mb={1} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h7" component="div">
                                    Status:
                                </Typography>
                                <Typography color="green" gutterBottom variant="h7" component="div">
                                    Paid
                                </Typography>
                            </Stack>
                            <Stack mb={2}>
                                <Divider mb={3} />
                            </Stack>
                            </>
                        )}
                        {reserveData?.payment_type === 'FULL_DOWNPAYMENT' && (
                          <>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h7" component="div">
                                    Payment Type:
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {Status.RELEASE_PAYMENT_TYPE[reserveData?.payment_type]}
                                </Typography>
                            </Stack>
                            <Divider mb={1} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h7" component="div">
                                    Downpayment:
                                </Typography>
                                <Typography color="green" gutterBottom variant="h7" component="div">
                                    <Chip label={`Paid: ${currencySymbol} ${MoneyFormat(reserveData?.downpayment)}`} color="success" />
                                </Typography>
                            </Stack>
                            <Divider mb={1} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h7" component="div">
                                    Status:
                                </Typography>
                                <Typography color="green" gutterBottom variant="h7" component="div">
                                    Paid
                                </Typography>
                            </Stack>
                            <Stack mb={2}>
                                <Divider mb={3} />
                            </Stack>
                          </>
                        )}
                        {reserveData?.payment_type === 'STAGGERED' && (
                          <>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h7" component="div">
                                    Already Payment:
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {reserveData?.already_payment && <GetRemitStatus type="already_payment" reserveData={reserveData}/>}
                                </Typography>
                            </Stack>
                            <Divider mb={1} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                                <Typography gutterBottom variant="h7" component="div">
                                    Later Payment:
                                </Typography>
                                {reserveData?.is_paid_later ? (
                                    <>
                                        <GetRemitStatus type="is_paid_later" reserveData={reserveData}/>
                                    </>
                                ) : (
                                    <>
                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="Button group with a nested menu"
                                            onClick={() => onHandleModalOpen({type: 'later_payment', payment: reserveData?.later_payment})}
                                        >
                                            <Button>{currencySymbol} {MoneyFormat(reserveData?.later_payment)}</Button>
                                            <Button
                                                size="small"
                                                aria-label="select merge strategy"
                                                aria-haspopup="menu"
                                            >
                                                PAY
                                            </Button>
                                        </ButtonGroup>
                                    </>
                                )}
                                
                            </Stack>
                            <Divider mb={1} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                                <Typography gutterBottom variant="h7" component="div">
                                    Staggered Payment:
                                </Typography>
                                {reserveData?.is_paid_staggered ? (
                                    <>
                                        <GetRemitStatus type="staggered_payment" reserveData={reserveData}/>
                                    </>
                                ) : (
                                    <>
                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="Button group with a nested menu"
                                            onClick={() => onHandleModalOpen({type: 'staggered_payment', payment: reserveData?.staggered_payment})}
                                            >
                                            <Button >{currencySymbol} {MoneyFormat(reserveData?.staggered_payment)}</Button>
                                            <Button
                                                size="small"
                                                aria-label="select merge strategy"
                                                aria-haspopup="menu"
                                            >
                                                PAY
                                            </Button>
                                        </ButtonGroup>
                                    </>
                                )}
                                
                            </Stack>
                            <Divider mb={1} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                                <Typography gutterBottom variant="h7" component="div">
                                    Downpayment:
                                </Typography>
                                <Typography color="red" gutterBottom variant="h7" component="div">
                                    {currencySymbol} {MoneyFormat(reserveData?.car_unit?.downpayment)}
                                </Typography>
                            </Stack>
                            <Stack mb={2}>
                                <Divider mb={3} />
                            </Stack>
                          </>
                        )}
                    </Card>
                  </Col>
                </Row>
              </Col>
              <ModalVerification
                modal={modal}
                setModal={setModal}
                item={item}
              />
          </>
        </div>
    )
}

export default ReleaseView;
