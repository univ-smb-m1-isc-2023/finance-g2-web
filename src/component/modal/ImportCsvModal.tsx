import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import CustomFileInput from '../base/FileInput';
import { postFile, uploadFile } from '../../utils/http';
import { SERVER_URL } from '../../utils/Constant';

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
        // const addTransactionInfo = await uploadFile(file, parseInt(id));

        const formData = new FormData();
        formData.append('file', file); // Get the file from file input
        formData.append('accountId', id); // Get the account id from the url

        const addTransactionInfo = await fetch(SERVER_URL + '/transaction/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
        });

        /*const addTransactionInfo = await postFile('/transaction/upload', file, {
            accountId: id,
        });*/
        setLoading(false);
        console.log(addTransactionInfo);
        /*if (addTransactionInfo.error) {
            setError(addTransactionInfo.error);
        } else {
            onClose();
        }*/
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
