import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomFileInput from '../base/FileInput';

interface IImportCsvModalProps {
    open: boolean;
    onClose: () => void;
}

export const ImportCsvModal = (props: IImportCsvModalProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose } = props;
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const submit = async () => {
        //import csv
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
            <Modal.Header>{t('depense.import_csv')}</Modal.Header>
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
                    {t('depense.cancel')}
                </Button>
                <Button
                    className='bg-secondary text-white'
                    onClick={() => submit()}
                >
                    {t('depense.import')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
