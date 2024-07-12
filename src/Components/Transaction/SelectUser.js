import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap'
import request from '../../Utils/AxiosUtils';
import { user } from '../../Utils/AxiosUtils/API';
import SearchableSelectInput from '../InputFields/SearchableSelectInput'

const SelectUser = ({ values, title, name }) => {
    const { data, refetch } = useQuery([user], () => request({
            url: user, 
        }),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            select: (data) => data?.data?.data?.map((el) => { return { id: el.id, name: el.name } }) 
        });

    useEffect(() => {
        refetch();
    }, [])

    return (
        <Col xxl="4" xl="5">
            <Card>
                <CardBody className='theme-form'>
                    <div className="title-header option-title">
                        <div className="d-flex align-items-center">
                            <h5>{title}</h5>
                        </div>
                    </div>
                    <SearchableSelectInput
                        nameList={[
                            {
                                name: name,
                                title: "Client",
                                notitle: 'true',
                                inputprops: {
                                    name: name,
                                    id: name,
                                    options: data || [],
                                    defaultOption: "Select Client",
                                },
                            },
                        ]}
                    />
                </CardBody>
            </Card>
        </Col>
    )
}

export default SelectUser