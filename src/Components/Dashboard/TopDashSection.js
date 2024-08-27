import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { FiBox } from "react-icons/fi";
import { RiFileTextLine, RiGroupLine, RiWalletLine } from 'react-icons/ri';
import { Col, Container, Row } from 'reactstrap';
import SettingContext from '../../Helper/SettingContext';
import request from "../../Utils/AxiosUtils";
import { mcarsdt } from '../../Utils/AxiosUtils/API';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { Divider, Typography } from '@mui/material';

const TopDashSection = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, "common");
    const { convertCurrency } = useContext(SettingContext)
    const { data } = useQuery([mcarsdt], () => request({ url: mcarsdt }), { refetchOnWindowFocus: false, select: (data) => data?.data });

    return (
        <section className="dashboard-tiles">
            <Container fluid={true} className='p-sm-0'>
                <Divider />
                <Typography variant="h6" gutterBottom>
                    Active Users
                </Typography>
                <Row className='g-3' style={{marginBottom: '20px'}}>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Total Employee</h6>
                                <h3>{data?.userTotal}</h3>
                            </div>
                            <div className="icon-box">
                                <RiWalletLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Total Client</h6>
                                <h3>{data?.userClientTotal}</h3>
                            </div>
                            <div className="icon-box">
                                <RiFileTextLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Client Reservation</h6>
                                <h3>{data?.reservationCount}</h3>
                            </div>
                            <div className="icon-box">
                                <RiFileTextLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Inquiries</h6>
                                <h3>{data?.inquiries}</h3>
                            </div>
                            <div className="icon-box">
                                <RiFileTextLine />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Typography variant="h6" gutterBottom>
                    Units
                </Typography>
                <Row className='g-3' style={{marginBottom: '20px'}}>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Total Unit</h6>
                                <h3>{data?.unitsTotal}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>On-hand unit</h6>
                                <h3>{data?.unitsOnHandCount}</h3>
                            </div>
                            <div className="icon-box">
                                <RiWalletLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Release Unit</h6>
                                <h3>{data?.unitsReleaseCount}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>For Return Unit</h6>
                                <h3>{data?.unitsTotalForReturnCount}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='g-3' style={{marginBottom: '20px'}}>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Return Unit</h6>
                                <h3>{data?.unitsTotalReturnCount}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Typography variant="h6" gutterBottom>
                    Amortization (On-Hand Unit)
                </Typography>
                <Row className='g-3' style={{marginBottom: '20px'}}>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Due Dates today</h6>
                                <h3>{data?.onHandDueToday}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>3 days delay</h6>
                                <h3>{data?.onHandDueDelay}</h3>
                            </div>
                            <div className="icon-box">
                                <RiWalletLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Near Due</h6>
                                <h3>{data?.onHandDueNear}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Typography variant="h6" gutterBottom>
                    Amortization (Release Unit)
                </Typography>
                <Row className='g-3' style={{marginBottom: '20px'}}>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Due Dates today</h6>
                                <h3>{data?.releaseDueToday}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>3 days delay</h6>
                                <h3>{data?.releaseDueDelay}</h3>
                            </div>
                            <div className="icon-box">
                                <RiWalletLine />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} sm={6}>
                        <div className="card-tiles">
                            <div>
                                <h6>Near Due</h6>
                                <h3>{data?.releaseDueNear}</h3>
                            </div>
                            <div className="icon-box">
                                <FiBox />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TopDashSection