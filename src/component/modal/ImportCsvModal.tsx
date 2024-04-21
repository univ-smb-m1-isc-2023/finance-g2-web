import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import CustomFileInput from '../base/FileInput';
import { postFile } from '../../utils/http';

interface IImportCsvModalProps {
    open: boolean;
    onClose: () => void;
}

export const ImportCsvModal = (props: IImportCsvModalProps) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose } = props;
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const submit = async () => {
        setLoading(true);
        const addTransactionInfo = await postFile('/transaction/upload', file, {
            file: file,
            id: id,
        });
        setLoading(false);
        if (addTransactionInfo.error) {
            setError(addTransactionInfo.error);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        setFile(null);
        setLoading(false);
        setError('');
    }, [open]);

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{t('transaction.import_csv')}</Modal.Header>
            <Modal.Body>
                <CustomFileInput
                    value={file}
                    onChange={(newFile) => {
                        setFile(newFile);
                    }}
                />
            </Modal.Body>
            <Modal.Footer className='flex-end flex items-end justify-end'>
                <Button
                    color='gray'
                    onClick={() => onClose()}
                >
                    {t('transaction.cancel')}
                </Button>
                <Button
                    className='bg-secondary text-white'
                    onClick={() => submit()}
                >
                    {t('transaction.import')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
