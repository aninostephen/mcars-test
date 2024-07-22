import { useContext } from 'react';
import { Card, CardBody } from 'reactstrap'
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const UnitDetails = ({ data }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <Card>
            <CardBody>
                <div className="title-header" >
                    <div className="d-flex align-items-center">
                        <h5>{t("UnitDetails")}</h5>
                    </div>
                </div>
                <div className="customer-detail tracking-wrapper">
                    <ul>
                        <li>
                            <label>{t("OldOwner")}:</label>
                            <h4>{data?.old_owner.name}</h4>
                        </li>
                        <li>
                            <label>{t("ContactNo")}:</label>
                            <h4>{data?.old_owner.phone}</h4>
                        </li>
                        <li>
                            <label>{t("OwnUnit")}:</label>
                            <h4>{data?.car_name}</h4>
                        </li>
                        <li>
                            <label>{t("Brand")}:</label>
                            <h4>{data?.car_make?.car_make_name}</h4>
                        </li>
                        <li>
                            <label>{t("UnitStatus")}:</label>
                            <h4>{data?.unit_status}</h4>
                        </li>
                    </ul>
                </div>
            </CardBody>
        </Card >
    )
}

export default UnitDetails