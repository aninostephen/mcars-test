import React from 'react';
import ShowModal from '@/Elements/Alerts&Modals/Modal'

const ModalExport = ({ children, modal, setModal, title='' }) => {
    return (
        <ShowModal open={modal} title={title} close={true} setModal={setModal} maxWidth="700px">
            {children}
        </ShowModal>
    );
};

export default ModalExport;