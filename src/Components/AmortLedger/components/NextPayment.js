import React from "react";
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { calculateDate } from "@/Utils/CalculateDueDate";

const StyledSpan = styled.span`
    font-size: 13px;
`;

const NextPayment = ({ values }) => {
    // console.log(calculateDate(values.car_unit_id?.amort_start_date, 2));
    return (
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
                {values?.car_unit_id?.amort_start_date ? dayjs(values?.car_unit_id?.amort_start_date).add(30, 'day').format('MMM D, YYYY') : ""}
            </Typography>
            <StyledSpan>Next Payment</StyledSpan>
        </Box>
    );
};

export default NextPayment;