import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { post } from '../../utils/http';

interface IDeletePrevisionModalProps {
    open: boolean;
    onClose: () => void;
    prevision: any;
}

export const DeletePrevisionModal = (props: IDeletePrevisionModalProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, prevision } = props;

    const submit = async () => {
        setLoading(true);
        const deletePrevisionInfo = await post('/forecast/delete', {
            id: prevision.id,
        });
        setLoading(false);
        if (deletePrevisionInfo.error) {
            setError(deletePrevisionInfo.error);
        } else {
            onClose();
        }
    };

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{t('prevision.delete_title')}</Modal.Header>
            <Modal.Body>
                <p>{t('prevision.confirm_delete')}</p>
                {error !== '' && <p className='mt-3 text-center text-red-700'>{error}</p>}

                {loading && (
                    <div className='mt-3 w-full items-center justify-center flex'>
                        <Spinner size='md' />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className='flex-end flex items-end justify-end'>
                <Button
                    color='gray'
                    onClick={() => onClose()}
                >
                    {t('prevision.cancel')}
                </Button>
                <Button
                    color='failure'
                    onClick={() => submit()}
                >
                    {t('prevision.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
