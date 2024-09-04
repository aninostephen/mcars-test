import React, { useContext } from 'react';
import { dateFormat, MoneyFormat } from '@/Utils/utils';
import SettingContext from '@/Helper/SettingContext'
import { Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { PAYMENT_TYPE } from '@/Utils/Enums';

const TermsInfo = ({ data }) => {
    const { currencySymbol } = useContext(SettingContext);
    const remit = data?.remit;
    const releaseStation = remit?.reservations?.release_station;
    const reservation = remit?.reservations;
    console.log(data)
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Reservation Info
            </Typography>
            <Divider />
            <Stack direction='column' spacing={2} sx={{marginBottom: '20px', marginTop: '20px'}}>
                <Stack direction='row' spacing={2}>
                    <span>Unit: </span>
                    <span>{data?.car_unit?.car_name}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span>New Owner: </span>
                    <span>{data?.new_owner?.name}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span>Reservation Amount: </span>
                    <span>{currencySymbol} {MoneyFormat(data?.amount)}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span>Target date: </span>
                    <span>{dayjs(data?.target_date).format(dateFormat)}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span>From: </span>
                    <span>{data?.from}</span>
                </Stack>
            </Stack>
            <Typography variant="h6" gutterBottom>
                Terms of agreement
            </Typography>
            <Divider />
            <Stack direction='column' spacing={2} sx={{marginBottom: '20px', marginTop: '20px'}}>
                <Stack direction='row' spacing={2}>
                    <span>Payment: </span>
                    <span>{releaseStation?.payment_type}</span>
                </Stack>
                {releaseStation?.payment_type === PAYMENT_TYPE.FULL_PAYMENT && (
                    <Stack direction='row' spacing={2}>
                        <span>Amount: </span>
                        <span><strong>{currencySymbol} {MoneyFormat(releaseStation?.price)}</strong></span>
                    </Stack>
                )}

                {releaseStation?.payment_type === PAYMENT_TYPE.STAGGERED && (
                    <>
                        <Stack direction='row' spacing={2}>
                            <span>First payment: </span>
                            <span><strong>{currencySymbol} {MoneyFormat(releaseStation?.already_payment)}</strong></span>
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <span>Later payment: </span>
                            <div>
                                <Stack direction="row" spacing={3}>
                                    <strong>{currencySymbol} {MoneyFormat(releaseStation?.later_payment)}</strong>
                                    <div>Target date: <strong>{dayjs(releaseStation?.later_payment_target_date).format(dateFormat)}</strong></div>
                                </Stack>
                            </div>
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <span>Staggered payment: </span>
                            <div>
                                <Stack direction="row" spacing={3}>
                                    <strong>{currencySymbol} {MoneyFormat(releaseStation?.staggered_payment)}</strong>
                                    <div>Target date: <strong>{dayjs(releaseStation?.staggered_payment_target_date).format(dateFormat)}</strong></div>
                                </Stack>
                            </div>
                        </Stack>
                    </>
                )}

                {releaseStation?.payment_type === PAYMENT_TYPE.FULL_DOWNPAYMENT && (
                    <Stack direction='row' spacing={2}>
                        <span>Downpayment: </span>
                        <span><strong>{currencySymbol} {MoneyFormat(releaseStation?.downpayment)}</strong></span>
                    </Stack>
                )}

                <Stack direction='row' spacing={2}>
                    <span>Release type: </span>
                    <span>{releaseStation?.release_type}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span>Appointment: </span>
                    <span>{releaseStation?.appointment}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span>Remarks: </span>
                    <span>{releaseStation?.remarks}</span>
                </Stack>
            </Stack>
        </div>
    );
};

export default TermsInfo;
