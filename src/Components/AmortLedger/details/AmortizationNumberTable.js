import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { Form, Formik } from 'formik'
import DetailTable from './DetailTable'
import { Stack } from '@mui/material'

const AmortizationNumberTable = ({ data, users }) => {
    return (
        <Container fluid={true}>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <div className="title-header">
                                
                                <div className="d-flex align-items-center">
                                    <Stack direction='column'>
                                        <h5>{data?.car_name}</h5>
                                        <p>#{data?.ledger_ref}</p>
                                    </Stack>
                                </div>
                            </div>
                            <DetailTable data={data} users={users} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AmortizationNumberTable