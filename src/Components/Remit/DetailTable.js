import React, { useContext } from 'react'
import { Table } from 'reactstrap'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'
import SettingContext from '@/Helper/SettingContext'
import { MoneyFormat } from '@/Utils/utils'
import { Chip } from '@mui/material'

const DetailTable = ({ data }) => {
    const { currencySymbol } = useContext(SettingContext);
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className='table-responsive'>
            <Table className="table all-package theme-table no-footer">
                <thead>
                    <tr>
                        <th scope="col">{t("Transaction")}</th>
                        <th scope="col">{t("PaymentType")}</th>
                        <th scope="col">{t("Amount")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <h6>{data?.data?.module}</h6>
                        </td>
                        <td>
                            <h6>{data?.data?.payment_type}</h6>
                        </td>
                        <td>
                            <h4>{currencySymbol} {MoneyFormat(data?.data?.amount)}</h4>
                        </td>
                    </tr >
                </tbody >
            </Table>
        </div>
    )
}

export default DetailTable