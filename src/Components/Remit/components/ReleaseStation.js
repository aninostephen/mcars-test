import { Stack, Typography } from '@mui/material';
import {
    RiAccountPinCircleFill,
    RiMailOpenFill,
    RiPhoneFill,
    RiMapPinFill,
  } from "react-icons/ri";
import React from 'react';

const ReleaseStation = ({data}) => {

    const userDetails = data?.payment_type == 'reservation_fee'
        ? data?.reservations?.new_owner
        : data?.release_station?.new_owner;

    return (
        <Stack direction="column" spacing={1.5} sx={{marginBottom: 5}}>
            <Typography variant="h7" gutterBottom>
                <RiAccountPinCircleFill /> Fullname: {userDetails?.name}
            </Typography>
            <Typography variant="h7" gutterBottom>
                <RiMailOpenFill /> Email: {userDetails?.email}
            </Typography>
            <Typography variant="h7" gutterBottom>
                <RiPhoneFill /> Contact No.:{userDetails?.phone}
            </Typography>
            <Typography variant="h7" gutterBottom>
                <RiMapPinFill /> Address: {userDetails?.client_information?.address}
            </Typography>
        </Stack>
    );
};

export default ReleaseStation;
