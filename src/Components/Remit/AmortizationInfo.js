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
const AmortizationInfo = ({ data }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { currencySymbol } = useContext(SettingContext);
    const amortId = data?.amortization_id;
    const car_unit = data?.car_unit;
    const ledgers = car_unit?.ledger;
    const ledger = ledgers?.filter((item) => item?.id === amortId);
    
    return (
        <ContainerDiv>
            <Typography variant="h6" gutterBottom>
                Terms of agreement
            </Typography>
            <Stack direction='column' spacing={2} sx={{marginTop: '10px'}}>
                <Stack direction='row' spacing={2}>
                    <span><strong>Unit:</strong> </span>
                    <span>{car_unit?.car_name}</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span><strong>Payment type:</strong> </span>
                    <span>Amortization</span>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <span><strong>Due Date</strong> </span>
                    <span style={{background: 'yellow'}}>{ledger?.length > 0 ? dayjs(ledger[0]?.due_date).format(dateFormat) : ''}</span>
                </Stack>
                <Table className="table all-package theme-table no-footer">
                    <thead>
                        <tr>
                            <th scope="col">{t("DueDate")}</th>
                            <th scope="col">{t("AmountPaid")}</th>
                            <th scope="col">{t("Reciept")}</th>
                            <th scope="col">{t("Remarks")}</th>
                            <th scope="col">{t("PaidBy")}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledgers && ledgers.map((item, index) => (
                            <tr key={item.id} style={{background: item?.id === amortId ? 'yellow' : 'unset' }}>
                                <td>
                                    <h6 style={{color: item?.is_amort_due_date === '1' ? 'red': ''}}>
                                        {dayjs(item?.due_date).format(dateFormat)}
                                    </h6>
                                </td>
                                <td>
                                    <h6>{currencySymbol} {MoneyFormat(item?.amount_paid)}</h6>
                                </td>
                                <td>
                                    {item?.receipt_file?.original_url ? <img width="100px" src={`${item?.receipt_file?.original_url}`} /> : '--'}
                                </td>
                                <td>
                                    {item?.remarks ? item?.remarks : '--'}
                                </td>
                                <td>
                                    {item?.pay_by ? item?.pay_by === 'BUYER' ? item?.buyer?.name : item?.pay_by : '--'}
                                </td>
                                <td>
                                    {item?.id === amortId ? 'Waiting to approved' : item?.status_amort}
                                </td>
                            </tr >
                        ))}
                    </tbody >
                </Table>
            </Stack>
        </ContainerDiv>
    );
};

export default AmortizationInfo;
