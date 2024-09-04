import React, { useContext } from 'react';
import { dateFormat, MoneyFormat, paymentStatusUtils } from '@/Utils/utils';
import SettingContext from '@/Helper/SettingContext'
import { Stack, Typography } from '@mui/material';
import { Table } from 'reactstrap'
import { PAYMENT_TYPE, PAYMENT_TYPE_STRING } from '@/Utils/Enums';
import dayjs from 'dayjs';
import styled from 'styled-components';
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const ContainerDiv = styled.div`
    margin-top: 20px;
`;
const TermsInfo = ({ data }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { currencySymbol } = useContext(SettingContext);
    const releaseStation = data?.reservations?.release_station;
    const reservation = data?.reservations;

    const Staggered = () => {
        return (
            <>
                <tr>
                    <td>
                        <h6>Release Station</h6>
                    </td>
                    <td>
                        <h6>First Payment</h6>
                    </td>
                    <td>
                        <h6>{currencySymbol} {MoneyFormat(releaseStation?.already_payment)}</h6>
                    </td>
                    <td>
                        <h6>--</h6>
                    </td>
                    <td>
                        <h6>{paymentStatusUtils(releaseStation?.is_paid_already_payment)}</h6>
                    </td>
                </tr >
                <tr>
                    <td>
                        <h6>Release Station</h6>
                    </td>
                    <td>
                        <h6>Later Payment</h6>
                    </td>
                    <td>
                        <h6>{currencySymbol} {MoneyFormat(releaseStation?.later_payment)}</h6>
                    </td>
                    <td>
                        <h6>{dayjs(releaseStation?.later_payment_target_date).format(dateFormat)}</h6>
                    </td>
                    <td>
                        <h6>
                            {paymentStatusUtils(releaseStation?.is_paid_later)}
                        </h6>
                    </td>
                </tr >
                <tr>
                    <td>
                        <h6>Release Station</h6>
                    </td>
                    <td>
                        <h6>Staggered Payment</h6>
                    </td>
                    <td>
                        <h6>{currencySymbol} {MoneyFormat(releaseStation?.staggered_payment)}</h6>
                    </td>
                    <td>
                        <h6>{dayjs(releaseStation?.staggered_payment_target_date).format(dateFormat)}</h6>
                    </td>
                    <td>
                        {paymentStatusUtils(releaseStation?.is_paid_staggered)}
                    </td>
                </tr >
            </>
        );
    }

    const FullDownpayment = () => {
        return (
            <>
                <tr>
                    <td>
                        <h6>Release Station</h6>
                    </td>
                    <td>
                        <h6>Full Downpayment</h6>
                    </td>
                    <td>
                        <h6>{currencySymbol} {MoneyFormat(releaseStation?.downpayment)}</h6>
                    </td>
                    <td>
                        <h6>--</h6>
                    </td>
                    <td>
                        <h6>{paymentStatusUtils(releaseStation?.is_paid_fulldownpayment)}</h6>
                    </td>
                </tr >
            </>
        );
    }

    const FullPayment  = () => {
        return (
            <>
                <tr>
                    <td>
                        <h6>Release Station</h6>
                    </td>
                    <td>
                        <h6>Full payment</h6>
                    </td>
                    <td>
                        <h6>{currencySymbol} {MoneyFormat(releaseStation?.price)}</h6>
                    </td>
                    <td>
                        <h6>--</h6>
                    </td>
                    <td>
                        <h6>{paymentStatusUtils(releaseStation?.is_paid_fullpayment)}</h6>
                    </td>
                </tr >
            </>
        );
    }
    return (
        <ContainerDiv>
            <Typography variant="h6" gutterBottom>
                Terms of agreement
            </Typography>
            <Stack direction='column' spacing={2} sx={{marginTop: '10px'}}>
                <Stack direction='row' spacing={2}>
                    <span><strong>Unit:</strong> </span>
                    <span>{reservation?.car_unit?.car_name}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span><strong>Payment type:</strong> </span>
                    <span>{PAYMENT_TYPE_STRING[releaseStation?.payment_type]}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span><strong>Release type:</strong> </span>
                    <span>{releaseStation?.release_type}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span><strong>Appointment:</strong> </span>
                    <span>{releaseStation?.appointment}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span><strong>Remarks:</strong> </span>
                    <span>{releaseStation?.remarks}</span>
                </Stack>
                <Table className="table all-package theme-table no-footer">
                    <thead>
                        <tr>
                            <th scope="col">{t("Transaction")}</th>
                            <th scope="col">{t("PaymentType")}</th>
                            <th scope="col">{t("Amount")}</th>
                            <th scope="col">{t("Target date")}</th>
                            <th scope="col">{t("Status")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <h6>Reservation</h6>
                            </td>
                            <td>
                                <h6>Reservation Fee</h6>
                            </td>
                            <td>
                                <h6>{currencySymbol} {MoneyFormat(data?.reservations?.amount)}</h6>
                            </td>
                            <td>
                                <h6>--</h6>
                            </td>
                            <td>
                                <h6>{paymentStatusUtils(reservation?.is_paid_reservation)}</h6>
                            </td>
                        </tr >
                        {releaseStation?.payment_type === PAYMENT_TYPE.STAGGERED && (
                            <Staggered />
                        )}
                        {releaseStation?.payment_type === PAYMENT_TYPE.FULL_DOWNPAYMENT && (
                            <FullDownpayment />
                        )}
                        {releaseStation?.payment_type === PAYMENT_TYPE.FULL_PAYMENT && (
                            <FullPayment />
                        )}
                    </tbody >
                </Table>
            </Stack>
        </ContainerDiv>
    );
};

export default TermsInfo;
