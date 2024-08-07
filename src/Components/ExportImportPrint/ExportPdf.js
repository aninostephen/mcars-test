import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Btn from "@/Elements/Buttons/Btn";

const ExportPdf = ({ pdfFilename, elemeCapture='', isPdf=false }) => {
    const handlePdfDownload = () => {
        const tableElement = document.getElementById(elemeCapture);

        if (tableElement) {
            const DownloadPdf = async () => {
                const margin = 10;
                const canvas = await html2canvas(tableElement, { useCORS: true }); // Increase scale for better quality
                const imgData = canvas.toDataURL('image/png');
    
                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    //format: 'a4',
                });
    
                const imgWidth = 210 - 2 * margin; // A4 width in mm
                const pageHeight = 295; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
                let heightLeft = imgHeight;
                let position = 0;
    
                pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
    
                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
    
                pdf.save(`${pdfFilename}.pdf`);
            }
            DownloadPdf();
        }
    }

    return (
        <>
            {isPdf && (
                <Btn
                    className="btn-outline btn-lg"
                    title="Print"
                    onClick={() => handlePdfDownload()}
                />
            )}
        </>
    );
};

export default ExportPdf;
