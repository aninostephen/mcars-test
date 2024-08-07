import React from 'react';
import ModalExport from '../ModalExport';
import ExportPdf from '../ExportImportPrint/ExportPdf';
import Printable from './components/Printable';

const ModalPrint = ({ modal, setModal, title, data }) => {
    return (
        <>
            <ModalExport modal={modal} setModal={setModal} title={title} >
                <Printable data={data} />
                <ExportPdf
                    isPdf={true}
                    elemeCapture="printable"
                    pdfFilename={`Remit-${data?.release_station?.new_owner?.email}`}
                />
            </ModalExport>
        </>
    );
};

export default ModalPrint;