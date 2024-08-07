import { nameSchema } from '@/Utils/Validation/ValidationSchemas';
import SimpleInputField from '@/Components/InputFields/SimpleInputField';
import CalendarField from "@/Components/InputFields/CalendarField";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";
import SearchableSelectInput from '@/Components/InputFields/SearchableSelectInput';

export const payModal = ({api, redirection, title, info, itemKey, validation}) => ({
    data: info,
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
    itemKey,
    validation,
    api: api,
    redirection: redirection,
    title: title,
});
