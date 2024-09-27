import { Grid, Snackbar } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useRouter } from "next/navigation";

import { MoneyFormat, ordinalSuffix } from '@/Utils/utils';
import styled from 'styled-components';
import Loader from '../CommonComponent/Loader';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import AccountContext from '@/Helper/AccountContext';
import SettingContext from '@/Helper/SettingContext';
import CardBox from './CardBox';

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

const ShowCard = ({ headerData, moduleName, mutate, fetchStatus }) => {
    const { accountData } = useContext(AccountContext)
    const { currencySymbol } = useContext(SettingContext);
    const { data } = headerData;
    const router = useRouter();
    const [clipCopiedOpen, setClipCopiedOpen] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const handleOnClick = (id) => {
        router.push(`${moduleName.toLowerCase()}/update/${id}`)
    }
    const copyToClipboard = (item) => {
        const listText = `
${item?.car_make?.car_make_name} ${item?.model_variant} - ${item?.year}
${item?.transmission}
${item?.body_color}
${item?.fuel_type}

DP: ${item?.downpayment ? MoneyFormat(item?.downpayment) : 0}
Montly: ${MoneyFormat(item?.amort_amount)}
${item?.month_paid} Months Remaining
Every ${ordinalSuffix(item?.due_date)} Month

Sales ${accountData.name}
Phone #: ${accountData.phone}
        `;
        navigator.clipboard.writeText(listText).then(
            () => {
                setClipCopiedOpen(true);
                setPopupTitle("Copy unit details");
            },
            (err) => {
                console.error('Failed to copy: ', err);
            }
        );
    };

    const handleCloseCopied = () => {
        setClipCopiedOpen(false);
    }

    const downloadImageAsZip = async (images) => {

        if (!images || images.length === 0) return false;

        const zip = new JSZip();
        const folder = zip.folder("images");

        setClipCopiedOpen(true);
        setPopupTitle("Images Downloading");

        const promises = images.map(async (img, index) => {
            if (index < 10) {
                try {
                  const response = await fetch(img?.original_url);
                  if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${img?.original_url}`);
                  }
                  const blob = await response.blob();
                  folder.file(`image${index + 1}.jpg`, blob);
                } catch (error) {
                  console.error(error);
                }
            }
        });
  
        await Promise.all(promises);
        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "images.zip");
        });
    };

    if (fetchStatus === 'fetching') return <Loader />;
    return (
        <Grid container>
            {data && data.length > 0 ? data.map((item) => (
                <CardBox
                    handleOnClick={handleOnClick}
                    copyToClipboard={copyToClipboard}
                    downloadImageAsZip={downloadImageAsZip}
                    item={item}
                    currencySymbol={currencySymbol}
                    mutate={mutate}
                />
            )) : 'No data'}
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={clipCopiedOpen}
                onClose={handleCloseCopied}
                message={popupTitle}
                key={"topcenter"}
                autoHideDuration={3000}
            />
        </Grid>
    );
};

export default ShowCard;