import { Box, Card, CardContent, Chip, Divider, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import placeHolderImage from "../../../public/assets/images/placeholder.png";
import Image from 'next/image';
import { STOCK_STATUS, TRANSACTION, TRANSMISSION, STOCK_STATUS_ENUM } from '@/Utils/Enums';
import {
  RiAccountPinCircleFill,
  RiPhoneFill,
  RiMapPin5Fill,
  RiFileCopyFill,
  RiDownloadCloudLine,
} from "react-icons/ri";
import { getAmountPaid, getNextPayableAmortization, getRemainingBalance, getTotalRemainingAmortization, MoneyFormat, ordinalSuffix } from '@/Utils/utils';
import DeleteButton from "./DeleteButton";
import styled from 'styled-components';

const GridStyled = styled(Grid)`
    position: relative;

    & .item_actions {
        position: absolute;
        left: 0px;
        background: #eee;
        padding: 14px;
        top: 11px;
        font-size: 18px;
        height: 95%;
        display: none;
    }

    &:hover .item_actions {
        display: block;
        z-index: 1;
    }
`;

const CardBox = ({ item, handleOnClick, copyToClipboard, downloadImageAsZip, currencySymbol, mutate }) => {

    let boxColor = '#eeffee';
    let tagColor = '#1976d2';
    if (item?.stock_status === STOCK_STATUS_ENUM.PENDING) {
        boxColor = '#fff2db';
    }

    if (item?.stock_status === STOCK_STATUS_ENUM['ON-HAND']) {
        boxColor = '#eeffee';
        if (item?.have_reserve === '1') boxColor = '#c4e7e9';
    }

    if (item?.stock_status === STOCK_STATUS_ENUM.RELEASED) {
        boxColor = '#f9dcdc';
        tagColor = '#a40d0d';
    }

    if (item?.stock_status === STOCK_STATUS_ENUM.FOR_RETURN) {
        boxColor = 'red';
    }

    return (
        <GridStyled key={item.id} item xs={12}>
            <div className='item_actions'>
                <Stack direction="column" spacing={2}>
                    {/* <RiDeleteBin2Fill style={{cursor: 'pointer'}}/> */}
                    <DeleteButton mutate={mutate} id={item.id}/>
                    <RiFileCopyFill title="Copy details" style={{cursor: 'pointer'}} onClick={() => copyToClipboard(item)} />
                    <RiDownloadCloudLine title="Download images" style={{cursor: 'pointer'}} onClick={() => downloadImageAsZip(item?.car_unit_galleries)} />
                </Stack>
            </div>
            <Card className='item_container' sx={{
                    display: 'flex',
                    background: boxColor,
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
                    <Image
                        className="img-fluid logo-sm w-auto"
                        src={item?.car_thumbnail?.original_url}
                        alt="Images"
                        width={150}
                        height={0}
                        style={{
                            height: '150px',
                        }}
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
                                    {item?.have_reserve === '1' && (item?.stock_status === STOCK_STATUS_ENUM['ON-HAND'] || item?.stock_status === STOCK_STATUS_ENUM.PENDING) && (
                                        <Chip label="Reserved" color="primary" style={{background: 'rgb(16 98 16)'}} />
                                    )}
                                    <Chip label={item?.status ? 'Listed': 'Not Listed'} color={item?.status ? 'primary': 'warning'} />
                                    <Chip label={TRANSACTION[item?.transactions]} color="primary" />
                                    <Chip label={STOCK_STATUS[item?.stock_status]} color="primary" style={{background: tagColor}} />
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
                                    <div><b>Downpayment</b>: {currencySymbol} {MoneyFormat(item?.downpayment)}</div>
                                    <div><b>Montly Amortization</b>: {currencySymbol} {MoneyFormat(item?.amort_amount)}</div>
                                    <Stack direction="row" spacing={1.5}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Terms</TableCell>
                                                    <TableCell>Remaining</TableCell>
                                                    <TableCell>Amount Paid</TableCell>
                                                    <TableCell>Balance</TableCell>
                                                    <TableCell>Total Price Unit</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{item?.month_contract} month</TableCell>
                                                    <TableCell>{item?.amort_month_remaining ? `${item?.amort_month_remaining > 0 ? item?.amort_month_remaining : 0} month` : '--'}</TableCell>
                                                    {/* <TableCell>{item?.amort_month_remaining ? `${item?.amort_month_remaining > 0 ? item?.amort_month_remaining - 1 : 0} month` : '--'}</TableCell> */}
                                                    <TableCell>{item?.amort_month_remaining ? `${currencySymbol} ${MoneyFormat(getAmountPaid(item?.amort_month_remaining, item?.month_contract, item?.amort_amount))}` : '--'}</TableCell>
                                                    <TableCell>{item?.amort_month_remaining ? `${currencySymbol} ${MoneyFormat(getRemainingBalance(item?.amort_month_remaining, item?.amort_amount))}` : '--'}</TableCell>
                                                    <TableCell>{item?.amort_remaining_balance ? `${currencySymbol} ${MoneyFormat(getTotalRemainingAmortization(item?.month_contract, item?.amort_month_paid, item?.amort_amount))}` : '--'}</TableCell>
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
        </GridStyled>
    );
};

export default CardBox;