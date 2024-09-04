import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { YupObject } from "@/Utils/Validation/BodyTypeValidationSchemas";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import CalendarField from "./CalendarField";
import { MoneyFormat, NumericFormat } from "@/Utils/utils";
import Btn from "@/Elements/Buttons/Btn";
import { Alert } from "@mui/material";
import AgreementForm from "./AgreementForm";
import { releaseUnitValidationSchema } from "./validation/validation";
import ModalPassword from "../ModalVerification/ModalPassword";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";

const FormReservation = ({
    handleModalPopup,
    handleSubmitModalPopup,
    initialValues,
    modal,
    unit,
    setModal,
    userdt,
    loading,
    mutate,
}) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={YupObject(releaseUnitValidationSchema)}
            onSubmit={(values) => {
                values.amount = values?.amount ? NumericFormat(values?.amount) : 0;
                if (values?.payment_type === 'STAGGERED') {
                    values.already_payment = NumericFormat(values?.already_payment);
                    values.later_payment = NumericFormat(values?.later_payment);
                    values.staggered_payment = NumericFormat(values?.staggered_payment);
                }
                if (values?.payment_type === 'FULL_DOWNPAYMENT') {
                    values.downpayment = NumericFormat(values?.downpayment);
                }
                if (values?.payment_type === 'FULL_PAYMENT') {
                    values.price = NumericFormat(values?.price);
                }
                mutate({ ...values, status: Number(values.status) });
                }}
            >
            {({ values, errors, setFieldValue, touched, submitForm }) => (
            <Form className="theme-form theme-form-2 mega-form">
                {!values?.car_unit_id && (
                    <Alert severity="warning" sx={{marginBottom: '20px'}}>Select first car unit</Alert>
                )}
                <SearchableSelectInput
                    nameList={[
                        {
                        title: t("Unit"),
                        name: "car_unit_id",
                        require: "true",
                        inputprops: {
                            name: "car_unit_id",
                            id: "car_unit_id",
                            options: unit,
                        },
                        },
                    ]}
                />

                {values?.car_unit_id && (
                <>
                    <SearchableSelectInput
                    nameList={[
                        {
                        title: t("Client"),
                        name: "new_owner_id",
                        require: "true",
                        inputprops: {
                            name: "new_owner_id",
                            id: "new_owner_id",
                            options: userdt,
                        },
                        },
                    ]}
                    />
                    
                    <SimpleInputField
                    nameList={
                    [
                        {
                            value: MoneyFormat(values.amount),
                            title: "Reservation Amount",
                            name: "amount",
                            inputaddon: "true",
                            require: "true",
                            placeholder: "Reservation Amount"
                        },
                    ]
                    } />

                    <CalendarField
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    label="Target Date"
                    name="target_date"
                    />

                    <SearchableSelectInput
                    nameList={[
                        {
                        title: t("InquireFrom"),
                        name: "from",
                        require: "true",
                        inputprops: {
                            name: "from",
                            id: "from",
                            options: [
                            { id: "PAGES", name: "Pages" },
                            { id: "AGENT", name: "Agent" },
                            { id: "WALKIN", name: "Walk-in" },
                            ],
                        },
                        },
                    ]}
                    />

                    <AgreementForm
                    units={unit}
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    />

                    <CheckBoxField name="status" />
                    <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
                    <Btn className="btn-outline btn-lg" title="Back" onClick={() => router.back()} />
                    <Btn className="btn-primary btn-lg" onClick={() => handleModalPopup(values)} title="submit" loading={Number(loading)} />
                    </div>
                </>
                )}
                <ModalPassword setModal={setModal} modal={modal} title='Reservation' handleSubmitModalPopup={() => handleSubmitModalPopup(submitForm)} isLoading={loading} />
            </Form>
            )}
        </Formik>
    );
};

export default FormReservation;