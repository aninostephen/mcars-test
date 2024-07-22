import { nameSchema } from '@/Utils/Validation/ValidationSchemas';
import SimpleInputField from '@/Components/InputFields/SimpleInputField';
import CalendarField from "@/Components/InputFields/CalendarField";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";
import SearchableSelectInput from '@/Components/InputFields/SearchableSelectInput';

export const payModal = ({users, t, api, redirection, title, info, itemKey, validation}) => ({
    data: info,
    fields: (errors, setFieldValue, values, touched) => (
        <>
            <CalendarField
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                label={t("DatePaid")}
                name="date_paid"
            />

            <SimpleInputField 
                nameList={
                [
                    {
                        title: "Ref",
                        type: "text",
                        name: "ref",
                        placeholder: "Recieipt Ref.:"
                    },
                ]
            } />

            <FileUploadField
                errors={errors}
                name="receipt_file_id"
                id="receipt_file_id"
                title="Receipt File"
                type="file"
                values={values}
                setFieldValue={setFieldValue}
                helpertext={getHelperText('600x600px')}
            />

            <SearchableSelectInput
                nameList={[
                    {
                    title: t("PayBy"),
                    name: "pay_by",
                    require: "true",
                    inputprops: {
                        name: "pay_by",
                        id: "pay_by",
                        options: [
                        { id: "COMPANY", name: "Company" },
                        { id: "BUYER", name: "Buyer" },
                        ],
                    },
                    },
                ]}
            />

            {values?.pay_by === 'BUYER' && (
                <SearchableSelectInput
                    nameList={[
                        {
                        title: t("Buyer"),
                        name: "buyer_id",
                        require: "true",
                        inputprops: {
                            name: "buyer_id",
                            id: "buyer_id",
                            options: users,
                        },
                        },
                    ]}
                />
            )}

            <SimpleInputField 
                nameList={
                [
                    {
                        title: "Remarks",
                        type: "text",
                        name: "remarks",
                        placeholder: "Remarks"
                    },
                ]
            } />

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
