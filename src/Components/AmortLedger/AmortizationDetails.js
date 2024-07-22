import React, { useEffect } from 'react'
import { Col, Row } from 'reactstrap';
import AmortizationNumberTable from './details/AmortizationNumberTable';
import UnitDetails from './details/UnitDetails';
import UnitAction from './details/UnitAction';
import { cu, user } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import Loader from '../CommonComponent/Loader';

const AmortizationDetails = ({ viewId }) => {

    const { data, isFetching, refetch } = useQuery([`${cu}/${viewId}`], () => request({
        url: `${cu}/${viewId}`
    }), 
    { refetchOnWindowFocus: false, select: (res) => { return res.data } });

    const { data: users, refetch: userRefetch } = useQuery([user], () => request({ 
      url: user,
    }), {
      refetchOnWindowFocus: false,
      select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.name, ...item })) 
    });

    useEffect(() => {
        refetch();
        userRefetch();
    }, [])

    if (isFetching) return <Loader />;
    return (
        <Row>
            <Col xxl="9">
                <Col sm="12">
                    <AmortizationNumberTable data={data} users={users} />
                </Col>
            </Col >
            <Col xxl="3">
                <UnitAction data={data} users={users} />
                <UnitDetails data={data} />
            </Col>
        </Row >
    )
}

export default AmortizationDetails
