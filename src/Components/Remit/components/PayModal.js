import SimpleInputField from '@/Components/InputFields/SimpleInputField';

export const PayModal = ({api, redirection, title, info, itemKey, validation}) => ({
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
