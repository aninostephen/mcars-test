import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Btn from "@/Elements/Buttons/Btn";
import { Stack } from '@mui/material';

const ExportXls = ({ headers, data, filename, isExportXls=false }) => {
    const handleXlsDownload = (e) => {
        const wsData = [
            headers.map(header => header.label),
            ...data.map(row => headers.map(header => row[header.key]))
        ];

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate a download link
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${filename}.xlsx`);
    };

    return (
        <>
            {isExportXls && (
                <Btn
                    className="btn-outline btn-lg"
                    title="Export"
                    onClick={() => handleXlsDownload()}
                />
            )}
        </>
    );
};

export default ExportXls;
