import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { post } from '../../utils/http';

interface IDeleteTransactionModalProps {
    open: boolean;
    onClose: () => void;
    transaction: any;
}

export const DeleteTransactionModal = (props: IDeleteTransactionModalProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, transaction } = props;

    const submit = async () => {
        setLoading(true);
        const deleteTransactionInfo = await post('/transaction/delete', {
            id: transaction.id,
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
            <Modal.Header>{t('transaction.delete_title')}</Modal.Header>
            <Modal.Body>
                <p>{t('transaction.confirm_delete')}</p>
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
                    {t('transaction.cancel')}
                </Button>
                <Button
                    color='failure'
                    onClick={() => submit()}
                >
                    {t('transaction.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
