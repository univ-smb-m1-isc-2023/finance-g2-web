import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { post } from '../../utils/http';

interface IDeleteCompteModalProps {
    open: boolean;
    onClose: () => void;
    compte: any;
}

export const DeleteCompteModal = (props: IDeleteCompteModalProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, compte } = props;

    const submit = async () => {
        setLoading(true);
        const deleteTransactionInfo = await post('/account/delete', {
            id: compte.id,
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
            <Modal.Header>{t('compte.delete_title')}</Modal.Header>
            <Modal.Body>
                <p>{t('compte.confirm_delete')}</p>
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
                    {t('compte.cancel')}
                </Button>
                <Button
                    color='failure'
                    onClick={() => submit()}
                >
                    {t('compte.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
