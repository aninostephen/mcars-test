import { Stack, Typography } from '@mui/material';
import {
    RiAccountPinCircleFill,
    RiMailOpenFill,
    RiPhoneFill,
    RiMapPinFill,
  } from "react-icons/ri";
import React from 'react';

const ReleaseStation = ({data}) => {

    let userDetails;
    switch (data?.payment_type) {
        case 'reservation_fee':
            userDetails = data?.reservations?.new_owner
        break;
        case 'staggered_payment':
        case 'is_paid_later':
        case 'full_payment':
        case 'already_payment':
        case 'full_downpayment':
            userDetails = data?.release_station?.new_owner;
        break;
        case 'company_amortization':
            userDetails = data?.car_unit?.new_owner;
        break;
    }

    return (
        <Stack direction="column" spacing={1.5} sx={{marginBottom: 5}}>
            {userDetails ? (
              <>
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
              </>  
            ) : (
                <><Typography variant="h7" gutterBottom>
                <RiAccountPinCircleFill /> Company Pay
            </Typography></>
            )}
        </Stack>
    );
};

export default ReleaseStation;
