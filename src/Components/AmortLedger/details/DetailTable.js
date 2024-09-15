import React, { useContext, useState } from 'react';
import { Table } from 'reactstrap';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/Helper/SettingContext';
import { dateFormat, MoneyFormat } from '@/Utils/utils';
import { Chip } from '@mui/material';
import Btn from '@/Elements/Buttons/Btn';
import ModalVerification from '@/Components/ModalVerification';
import { payModal } from '../components/fields';
import dayjs from 'dayjs';
import { nameSchema } from '@/Utils/Validation/ValidationSchemas';

const DetailTable = ({ data, users }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { currencySymbol } = useContext(SettingContext);
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState({});
    let isNotPaidNext = true;
    const onHandleModalOpen = (item) => {
        setItem(
            payModal({
                data,
                item,
                users,
                t,
                api: '/cu-amort-pay',
                redirection: '/amortization_ledger',
                title: "Pay Amortization",
                info: [
                    {
                        label: 'Unit Name',
                        value: data?.car_name
                    },
                    {
                        label: 'Amount Pay',
                        value: `${currencySymbol} ${item?.amortization ? MoneyFormat(item?.amortization): 0}`
                    }
                ],
                itemKey: {
                    amortization_id: item.id,
                    unit_id: data?.id,
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
                    amortization_id: nameSchema,
                    unit_id: nameSchema,
                    date_paid: nameSchema,
                    pay_by: nameSchema
                },
            })
        );
        setModal(true);
    };

    return (
        <div className='table-responsive'>
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
                    {data?.ledger && data?.ledger.map((item, index) => (
                        <tr key={item.id}>
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
                                {(item?.status_amort === 'UNPAID' && isNotPaidNext) && (
                                    <>
                                        {isNotPaidNext = false}
                                        {
                                            item?.status_amort === 'UNPAID' ? (
                                                <Btn href="#" className="btn btn-sm" onClick={() => onHandleModalOpen(item)}>PAY</Btn>
                                            ) : <Chip label="Paid" color="success"></Chip>
                                        }
                                    </>
                                )}
                                {(item?.status_amort === 'PAID') && (
                                    <>PAID</>
                                )}
                                {(item?.status_amort === 'PENDING') && (
                                    <>PENDING APPROVED</>
                                )}
                            </td>
                        </tr >
                    ))}
                </tbody >
            </Table>
            <ModalVerification
                modal={modal}
                setModal={setModal}
                item={item}
            />
        </div>
    )
}

export default DetailTable