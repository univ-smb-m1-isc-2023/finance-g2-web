import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { post } from '../../utils/http';

interface IDeleteCagnotteModalProps {
    open: boolean;
    onClose: () => void;
    cagnotte: any;
}

export const DeleteCagnotteModal = (props: IDeleteCagnotteModalProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, cagnotte } = props;

    const submit = async () => {
        setLoading(true);
        const deleteTransactionInfo = await post('/tag/delete', {
            id: cagnotte.id,
        });
        setLoading(false);
        if (deleteTransactionInfo.error) {
            setError(deleteTransactionInfo.error);
        } else {
            onClose();
        }
    };

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{t('cagnotte.delete_title')}</Modal.Header>
            <Modal.Body>
                <p>{t('cagnotte.confirm_delete')}</p>
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
                    {t('cagnotte.cancel')}
                </Button>
                <Button
                    color='failure'
                    onClick={() => submit()}
                >
                    {t('cagnotte.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
