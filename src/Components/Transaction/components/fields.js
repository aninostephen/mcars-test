import SimpleInputField from '@/Components/InputFields/SimpleInputField';
import ForReturnUnit from './ForReturnUnit';
import { STOCK_STATUS_ENUM } from '@/Utils/Enums';
import ForOnHandUnit from './ForOnHandUnit';

export const payModal = ({api, redirection, title, info, itemKey, validation}) => ({
    data: info,
    fields: () => (
        <>
            {(title === 'For Return Unit' && itemKey?.stock_status) && (
                <>
                    {itemKey?.stock_status === STOCK_STATUS_ENUM.RETURN && (
                        <ForReturnUnit itemKey={itemKey} />
                    )}

                    {itemKey?.stock_status === STOCK_STATUS_ENUM['ON-HAND'] && (
                        <ForOnHandUnit itemKey={itemKey} />
                    )}
                </>
            )}
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
    itemKey,
    validation,
    api: api,
    redirection: redirection,
    title: title,
});
