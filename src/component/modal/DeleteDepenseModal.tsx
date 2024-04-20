import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface IDeleteDepenseModalProps {
    open: boolean;
    onClose: () => void;
    depense: any;
}

export const DeleteDepenseModal = (props: IDeleteDepenseModalProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, depense } = props;
    const navigate = useNavigate();

    const submit = async () => {
        //delete depense
    };

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{t('depense.delete_title')}</Modal.Header>
            <Modal.Body>
                <p>{t('depense.confirm_delete')}</p>
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
                    {t('depense.cancel')}
                </Button>
                <Button
                    color='failure'
                    onClick={() => submit()}
                >
                    {t('depense.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
