import I18NextContext from '@/Helper/I18NextContext';
import ShowModal from '../../Elements/Alerts&Modals/Modal';
import Btn from '../../Elements/Buttons/Btn';
import { RiQuestionLine } from 'react-icons/ri';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const ConfimationModal = ({
        modal,
        setModal,
        handleSubmit,
    }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const onSubmit = () => {
        setModal(false)
        handleSubmit()
    }
    return (
        <ShowModal
            open={modal}
            close={false}
            buttons={
                <>
                    <Btn
                        title="No"
                        onClick={() => {
                            setModal(false);
                        }}
                        className="btn--no btn-md fw-bold"
                    />
                    <Btn
                        title="Yes"
                        onClick={() => onSubmit()}
                        className="btn-theme btn-md fw-bold"
                    />
                </>
            }>
            <div className="remove-box">
                <RiQuestionLine className="icon-box wo-bg" />
                <h5 className="modal-title">{t("Confirmation")}</h5>
                <p>{t("Areyousureyouwanttoproceed?")} </p>
            </div>
        </ShowModal>
    )
}

export default ConfimationModal