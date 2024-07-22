import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { cu } from "../../Utils/AxiosUtils/API";
import { bodytypename, YupObject } from "@/Utils/Validation/BodyTypeValidationSchemas";
import Loader from "../CommonComponent/Loader";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import { Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { MoneyFormat } from "@/Utils/utils";
import dayjs from "dayjs";
import NextPayment from "./components/NextPayment";
import { getRemainingBalance } from "@/Utils/CalculateDueDate";
import SettingContext from "@/Helper/SettingContext";

const StyledSpan = styled.span`
    font-size: 13px;
`;

const LedgerForm = ({ mutate, loading }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { currencySymbol } = useContext(SettingContext)

    const { data: unit, isFetching: isFetchingUnit, refetch: unitRefetch } = useQuery([cu], () => request({ 
      url: cu,
      params: { isNotLedger: true }
    }),
    { 
      refetchOnMount: false,
      enabled: false ,
      select: (data) => data.data.data.map((item) => ({ id: item, name: item.car_name, })) 
    });

    useEffect(() => {
        unitRefetch();
    }, []);

    if (isFetchingUnit) return <Loader />
    return (
        <Formik
        enableReinitialize
        initialValues={{
            car_unit_id: "",
        }}
        validationSchema={YupObject({
            // car_unit_id: bodytypename,
        })}
        onSubmit={(values) => {
            values.car_unit_id = values.car_unit_id.id;
            mutate({ ...values });
        }}>
        {({ values, errors, setFieldValue }) => (
            <Form className="theme-form theme-form-2 mega-form">
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
                <Stack direction="row" spacing={1.5} sx={{width: "100%"}}>
                    {/* <NextPayment values={values} /> */}
                    <Box
                        sx={{
                            width: 300,
                            height: 100,
                            borderRadius: 1,
                            bgcolor: '#f3f3f3',
                            p: 2,
                            border: '1px solid #e9e9e9',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            {currencySymbol} {values?.car_unit_id?.amort_amount ? MoneyFormat(values?.car_unit_id?.amort_amount) : 0}
                        </Typography>
                        <StyledSpan>Montly Amortization</StyledSpan>
                    </Box>
                    <Box
                        sx={{
                            width: 300,
                            height: 100,
                            borderRadius: 1,
                            bgcolor: '#f3f3f3',
                            p: 2,
                            border: '1px solid #e9e9e9',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            {values?.car_unit_id?.month_contract ? values?.car_unit_id?.month_contract : 0}
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            Months Contract
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} mt={2} sx={{width: "100%"}}>
                    <Box
                        sx={{
                            width: 300,
                            height: 100,
                            borderRadius: 1,
                            bgcolor: '#f3f3f3',
                            p: 2,
                            border: '1px solid #e9e9e9',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            {values?.car_unit_id?.month_paid ? values?.car_unit_id?.month_paid : 0}
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            Month Paid
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 300,
                            height: 100,
                            borderRadius: 1,
                            bgcolor: '#f3f3f3',
                            p: 2,
                            border: '1px solid #e9e9e9',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                        {values?.car_unit_id?.month_paid ? (parseInt(values?.car_unit_id?.month_contract) - parseInt(values?.car_unit_id?.month_paid)) : 0}
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            Months Remaining
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 300,
                            height: 100,
                            borderRadius: 1,
                            bgcolor: '#f3f3f3',
                            p: 2,
                            border: '1px solid #e9e9e9',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            {currencySymbol} {values?.car_unit_id?.amort_amount && MoneyFormat(
                                getRemainingBalance(
                                    values?.car_unit_id?.amort_amount,
                                    values?.car_unit_id?.month_contract,
                                    values?.car_unit_id?.month_paid
                                )
                            )}
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            Remaining Balance
                        </Typography>
                    </Box>
                </Stack>
            <FormBtn loading={loading} title="Generate Ledger" />
            </Form>
        )}
        </Formik>
    );
};

export default LedgerForm;
