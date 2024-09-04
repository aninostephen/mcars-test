import React, { useContext } from 'react';
import { REMIT_STATUS } from '@/Utils/Enums';
import { Chip } from '@mui/material';
import SettingContext from '@/Helper/SettingContext';
import { MoneyFormat } from '@/Utils/utils';

const GetRemitStatus = ({ type, reserveData }) => {
    const { currencySymbol } = useContext(SettingContext);
    let remit = {};
    let paymentStatus = '';
    let colorStatus = '';
    let amount = '';

    if (reserveData?.remit) {
        remit = reserveData?.remit?.filter((item) => item.payment_type === type)[0];
        amount = remit?.amount;
    } else {
        switch (type) {
            case 'is_paid_later':
                amount = reserveData?.later_payment;
                break;
            case 'staggered_payment':
                amount = reserveData?.staggered_payment;
                break;
            case 'already_payment':
                console.log(remit)
                amount = reserveData?.already_payment;
                break;
        }
    }
    if (remit?.is_remitted === REMIT_STATUS.PENDING) {
        paymentStatus = 'Not yet remitted';
        colorStatus = 'warning'
    } else if (remit?.is_remitted === REMIT_STATUS.APPROVED) {
        paymentStatus = 'Paid';
        colorStatus = 'success'
    } else {
        paymentStatus = 'Rejected';
        colorStatus = 'error'
    }

    return (
        <>
            <Chip label={`${paymentStatus}: ${currencySymbol} ${MoneyFormat(amount)}`} color={colorStatus} />
        </>
    );
};

export default GetRemitStatus;