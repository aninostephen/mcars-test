import React, { useContext } from 'react'
import { Table } from 'reactstrap'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'
import SettingContext from '@/Helper/SettingContext'
import { MoneyFormat, paymentStatusUtils } from '@/Utils/utils'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { REMIT_PAYMENT_TYPE, REMIT_STATUS, REMIT_TRANSACTION } from "@/Utils/Enums";
import { Chip, Divider, Stack, Typography, Select } from '@mui/material'

const DetailTable = ({ data, onHandleChange }) => {
    const { currencySymbol } = useContext(SettingContext);
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');

    let module = data?.data?.module;
    let paymenttype = data?.data?.payment_type;

    const ActionBtn = () => {
        return (
            <Stack direction="column" justifyContent="flex-end" sx={{ float: 'right' }}>
                {data?.data?.is_remitted === 'APPROVED' || data?.data?.is_remitted === 'REJECTED' ? (
                    <>
                    {data?.data?.is_remitted === 'APPROVED' && <Chip label="Paid" color="success" />}
                    {data?.data?.is_remitted === 'REJECTED' && <Chip label="Rejected" color="error" />}
                    </>
                ) : (
                    <FormControl sx={{ m: 1, minWidth: 150, marginLeft: 0 }} size="small">
                    <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Payment Status"
                        onChange={onHandleChange}
                    >
                        <MenuItem value="">
                            Select Payment Status
                        </MenuItem>
                        <MenuItem value={REMIT_STATUS.REJECTED}>Rejected</MenuItem>
                        <MenuItem value={REMIT_STATUS.APPROVED}>Approved</MenuItem>
                    </Select>
                    </FormControl>
                )}
            </Stack>
        );
    }
    return (
        <Stack direction="column" sx={{marginTop: '50px', marginBottom: '20px'}}>
            <Typography variant="h6" gutterBottom>
                Paid Amount
            </Typography>
            <Divider />
            <Table className="table all-package theme-table no-footer">
                <thead>
                    <tr>
                        <th scope="col">{t("Transaction")}</th>
                        <th scope="col">{t("PaymentType")}</th>
                        <th scope="col">{t("Amount")}</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <h4>{REMIT_TRANSACTION[module]}</h4>
                        </td>
                        <td>
                            <h4>{REMIT_PAYMENT_TYPE[data?.data?.payment_type]}</h4>
                        </td>
                        <td>
                            <h4>{currencySymbol} {MoneyFormat(data?.data?.amount)}</h4>
                        </td>
                        <td>
                            <ActionBtn />
                        </td>
                    </tr >
                </tbody >
            </Table>
        </Stack>
    )
}

export default DetailTable