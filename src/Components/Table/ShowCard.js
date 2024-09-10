import { Box, Card, CardContent, CardMedia, Chip, Divider, Grid, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from "next/navigation";
import placeHolderImage from "../../../public/assets/images/placeholder.png";
import Image from 'next/image';
import { STOCK_STATUS, TRANSACTION, TRANSMISSION } from '@/Utils/Enums';
import {
  RiAccountPinCircleFill,
  RiPhoneFill,
  RiMapPin5Fill,
} from "react-icons/ri";
import { getNextPayableAmortization, MoneyFormat, ordinalSuffix } from '@/Utils/utils';

const ShowCard = ({ headerData, moduleName }) => {
    const { data } = headerData;
    const router = useRouter();
    const handleOnClick = (id) => {
        router.push(`${moduleName.toLowerCase()}/update/${id}`)
    }
    return (
        <Grid container>
            {data && data.length > 0 ? data.map((item) => (
                <Grid key={item.id} item xs={12}>
                    <Card sx={{
                            display: 'flex',
                            background: '#f9f9f9',
                            margin: '10px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                        onClick={() => handleOnClick(item.id)}
                    >
                        {item?.car_thumbnail?.original_url  ? (
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={`${item?.car_thumbnail?.original_url}`}
                                alt="Live from space album cover"
                            />
                        ) : <Image src={placeHolderImage} width="151" />}
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <CardContent>
                               <Stack spacing={1} direction='column'>
                                    <Stack direction="row" spacing={1} justifyContent="space-between">
                                        <Typography component="div" variant="h6">
                                            {item?.car_name}
                                        </Typography>
                                         <Stack direction='row' spacing={1}>
                                            <Chip label={item?.status ? 'Listed': 'Not Listed'} color={item?.status ? 'primary': 'warning'} />
                                            <Chip label={TRANSACTION[item?.transactions]} color="primary" />
                                            <Chip label={STOCK_STATUS[item?.stock_status]} color="primary" />
                                            {item?.is_amort_due_date == '1' && (
                                                <Chip label="UNPAID AMORTIZATION" color="error" />
                                            )}
                                        </Stack>
                                    </Stack>
                                    <Divider />
                                    <Stack direction='row' spacing={3}>
                                        <Stack direction='column' spacing={1}>
                                            <Typography variant="subtitle1" color="text.primary" component="div" sx={{ fontWeight: 700 }}>
                                                Unit Information
                                            </Typography>
                                            <div><b>Plate No.</b>: {item?.plate_no}</div>
                                            <div><b>Brand</b>: {item?.car_make?.car_make_name}</div>
                                            <div><b>Body type</b>: {item?.body_type?.body_type_name}</div>
                                            <div><b>Plate No.</b>: {item?.plate_no}</div>
                                            <div><b>Transmission.</b>: {TRANSMISSION[item?.transmission]}</div>
                                            <div><b>Current mileage.</b>: {item?.current_mileage ? MoneyFormat(item?.current_mileage) : '--'}</div>
                                            <div><b>Fuel Type.</b>: {item?.fuel_type ? item?.fuel_type : '--'}</div>
                                        </Stack>
                                        <Stack direction='column' spacing={1} sx={{ width: '250px' }}>
                                            {item?.new_owner_id ? (
                                                <>
                                                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ fontWeight: 700 }}>
                                                        New Owner
                                                    </Typography>
                                                    <div><RiAccountPinCircleFill /> {item?.new_owner_id ? item?.new_owner?.name : '--'}</div>
                                                    <div><RiPhoneFill /> {item?.new_owner_id ? item?.new_owner?.phone : '--'}</div>
                                                    <div><RiMapPin5Fill /> {item?.new_owner_id ? item?.new_owner?.client_information?.address : '--'}</div>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ fontWeight: 700 }}>
                                                        Previous Owner
                                                    </Typography>
                                                    <div><RiAccountPinCircleFill /> {item?.old_owner_id ? item?.old_owner?.name : '--'}</div>
                                                    <div><RiPhoneFill /> {item?.old_owner_id ? item?.old_owner?.phone : '--'}</div>
                                                    <div><RiMapPin5Fill /> {item?.old_owner_id ? item?.old_owner?.client_information?.address : '--'}</div>
                                                </>
                                            )}
                                        </Stack>
                                        <Stack direction='column' spacing={1}>
                                            <Typography variant="subtitle1" color="text.primary" component="div" sx={{ fontWeight: 700 }}>
                                                Amortization
                                            </Typography>
                                            <div><b>Due date</b>: Every {ordinalSuffix(item?.due_date)} Month</div>
                                            <div style={{color: item?.is_amort_due_date === '1'? 'red': ''}}><b>Next Payable</b>: {getNextPayableAmortization(item?.ledger)}</div>
                                            <div><b>Downpayment</b>: {MoneyFormat(item?.downpayment)}</div>
                                            <div><b>Montly Amortization</b>: {MoneyFormat(item?.amort_amount)}</div>
                                            <Stack direction="row" spacing={1.5}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Terms</TableCell>
                                                            <TableCell>Paid</TableCell>
                                                            <TableCell>Remaining</TableCell>
                                                            <TableCell>Balance</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>{item?.month_contract} month</TableCell>
                                                            <TableCell>{item?.month_paid} month</TableCell>
                                                            <TableCell>{item?.amort_month_remaining ? item?.amort_month_remaining : '--'}</TableCell>
                                                            <TableCell>{item?.amort_remaining_balance ? MoneyFormat(item?.amort_remaining_balance) : '--'}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                               </Stack>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            )) : 'No data'}
        </Grid>
    );
};

export default ShowCard;