'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, Col, Row, ListGroup, ListGroupItem } from 'reactstrap'
import {
  RiAccountPinCircleFill,
  RiMailOpenFill,
  RiPhoneFill,
  RiDownload2Fill,
} from "react-icons/ri";
import SelectUser from '@/Components/Transaction/SelectUser'
import UnitSelection from '@/Components/Transaction/UnitSelection'
import { release, cu } from '@/Utils/AxiosUtils/API'
import { YupObject } from '@/Utils/Validation/ValidationSchemas'
import useCreate from "@/Utils/Hooks/useCreate";
import request from '@/Utils/AxiosUtils';
import Loader from '@/Components/CommonComponent/Loader';
import SettingContext from '@/Helper/SettingContext';
import UnitInformation from '@/Components/Transaction/UnitInformation';
import ConfimationModal from '@/Components/Transaction/ConfimationModal';
import { MoneyFormat, NumericFormat } from '@/Utils/utils';
import { useSearchParams } from 'next/navigation'
import { Typography, Divider, ButtonGroup, Button } from '@mui/material';
import { Stack } from '@mui/system';
import Btn from '@/Elements/Buttons/Btn';
import { Status } from '@/Utils/statues';
import ReleaseView from '@/Components/Transaction/ReleaseView';

const TransactionView = ({ params: { viewId } }) => {
    let reserveData;
    const { data: reservationData, isLoading: reserveLoading, refetch: refetchReserve } = useQuery([viewId], () => request({
      url: `release/${viewId}`
    }), { refetchOnWindowFocus: false, enabled: false, select: (data) => data.data });

    reserveData = reservationData;
    useEffect(() => {
        refetchReserve();
    }, []);

    if (reserveLoading) return <Loader />;

    return (
        <ReleaseView reserveData={reserveData} id={viewId} />
    )
}

export default TransactionView;
