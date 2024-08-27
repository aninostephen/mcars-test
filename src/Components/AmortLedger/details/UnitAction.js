import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { Card, CardBody } from 'reactstrap'
import I18NextContext from '@/Helper/I18NextContext'
import SettingContext from '@/Helper/SettingContext'
import { useTranslation } from '@/app/i18n/client'
import { Stack } from '@mui/material'
import { GetRemainingBalance, MoneyFormat } from '@/Utils/utils'
import ModalVerification from '@/Components/ModalVerification'
import { nameSchema } from '@/Utils/Validation/ValidationSchemas'
import SimpleInputField from '@/Components/InputFields/SimpleInputField'
import { payModal } from '../components/fields'
import dayjs from 'dayjs'


const UnitAction = ({ data, users }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { currencySymbol } = useContext(SettingContext);
    const [item, setItem] = useState({});
    const [modal, setModal] = useState(false);
    const totalPaid = GetRemainingBalance(data);

    const onHandleDeleteLedger =  (e) => {
        e.preventDefault();
        
        setItem({
            data: [
                {
                    label: 'Total amout to paid',
                    value: `${currencySymbol} ${MoneyFormat(totalPaid)}`
                },
                {
                    label: 'Total month to paid',
                    value: data?.amort_month_remaining
                },
            ],
            fields: () => (
                <>
                    <SimpleInputField 
                        nameList={
                        [
                            {
                                title: "Pass",
                                type: "password",
                                name: "password",
                                require: "true",
                                placeholder: "Password"
                            },
                        ]
                    } />
                </>
            ),
            itemKey: {
                car_unit_id: data?.id,
                password: '',
            },
            validation: {
                password: nameSchema,
                car_unit_id: nameSchema
            },
            api: '/cu-amort-delete',
            redirection: '/amortization_ledger',
            title: 'Delete ledger'
        });
        setModal(true);
    }

    const onHandleFullPaid = (e) => {
        e.preventDefault();
    
        setItem(
            payModal({
                data,
                item,
                users,
                t,
                api: '/cu-amort-full-pay',
                redirection: '/amortization_ledger',
                title: 'Full Paid Amortization',
                info: [
                    {
                        label: 'Total amout to paid',
                        value: `${currencySymbol} ${MoneyFormat(totalPaid)}`
                    },
                    {
                        label: 'Total month to paid',
                        value: data?.amort_month_remaining
                    },
                ],
                itemKey: {
                    car_unit_id: data?.id,
                    password: '',
                    date_paid: dayjs(),
                    ref: '',
                    receipt_file_id: '',
                    pay_by: '',
                    buyer_id: '',
                    remarks: ''
                },
                validation: {
                    password: nameSchema,
                    car_unit_id: nameSchema,
                    date_paid: nameSchema,
                    pay_by: nameSchema
                },
            })
        );
        setModal(true);
    }

    return (
        <Card>
            <CardBody>
                <div className="title-header" >
                    <div className="d-flex align-items-center">
                        <h5>{("Summary")}</h5>
                    </div>
                    {data?.month_contract !== data?.amort_month_paid && (
                        <Stack direction="row" spacing={2}>
                            <Link href="#" onClick={(e) => onHandleFullPaid(e)} className="btn btn-animation btn-sm">{t("FullPaidNow")}</Link>
                            <Link href="#" onClick={(e) => onHandleDeleteLedger(e)} className="btn btn-animation btn-sm btn-outline">{t("DeleteLedger")}</Link>
                        </Stack>
                    )}
                </div>
                <div className="tracking-total tracking-wrapper">
                    <ul>
                        <li>{t("AmortAmount")} :<span>{currencySymbol} {MoneyFormat(data?.amort_amount)}</span></li>
                        <li>{t("MonthlyContracts")} :<span>{data?.month_contract}</span></li>
                        <li>{t("MonthPaid")} :<span>{data?.amort_month_paid}</span></li>
                        <li>{t("MonthRemaining")}: <span>{data?.amort_month_remaining}</span></li>
                        <li>{t("RemainingAmount")}: <span>{MoneyFormat(data?.amort_remaining_balance)}</span></li>
                    </ul>
                </div>
            </CardBody>
            <ModalVerification
                modal={modal}
                setModal={setModal}
                item={item}
            />
        </Card >
    )
}

export default UnitAction
