import { Stack, Typography } from '@mui/material';
import {
    RiAccountPinCircleFill,
    RiMailOpenFill,
    RiPhoneFill,
    RiMapPinFill,
  } from "react-icons/ri";
import React from 'react';

const ReleaseStation = ({data}) => {
    return (
        <Stack direction="column" spacing={1.5} sx={{marginBottom: 5}}>
            <Typography variant="h7" gutterBottom>
                <RiAccountPinCircleFill /> Fullname: {data?.release_station?.new_owner?.name}
            </Typography>
            <Typography variant="h7" gutterBottom>
                <RiMailOpenFill /> Email: {data?.release_station?.new_owner?.email}
            </Typography>
            <Typography variant="h7" gutterBottom>
                <RiPhoneFill /> Contact No.:{data?.release_station?.new_owner?.phone}
            </Typography>
            <Typography variant="h7" gutterBottom>
                <RiMapPinFill /> Address: {data?.release_station?.new_owner?.client_information?.address}
            </Typography>
        </Stack>
    );
};

export default ReleaseStation;
