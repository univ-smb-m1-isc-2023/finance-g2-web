import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cagnotte from '../../object/Cagnotte';
import { Input } from '../base/Input';
import { useParams } from 'react-router-dom';
import { post } from '../../utils/http';

interface ICagnotteModalProps {
    open: boolean;
    onClose: () => void;
    cagnotte: Cagnotte | null;
}

export const CagnotteModal = (props: ICagnotteModalProps) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, cagnotte } = props;

    const [name, setName] = useState<string>(cagnotte ? cagnotte.name : '');
    const [description, setDescription] = useState<string>(cagnotte ? cagnotte.description : '');

    const addCagnotte = async () => {
        setLoading(true);
        const addCompteInfo = await post('/tag/create', {
            name: name,
            description: description,
            account: id,
        });
        setLoading(false);
        if (addCompteInfo.error) {
            setError(addCompteInfo.error);
        } else {
            onClose();
        }
    };

    const editCagnotte = async () => {
        setLoading(true);
        const editCompteInfo = await post('/tag/edit', {
            id: cagnotte.id,
            name: name,
            description: description,
        });
        setLoading(false);
        if (editCompteInfo.error) {
            setError(editCompteInfo.error);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        if (cagnotte) {
            setName(cagnotte.name);
            setDescription(cagnotte.description);
        }
    }, [cagnotte]);

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{cagnotte ? t('cagnotte.edit_cagnotte') : t('cagnotte.add_cagnotte')}</Modal.Header>
            <Modal.Body>
                <div className='flex flex-col flex-1 gap-3'>
                    <div className='flex w-full flex-row gap-5'>
                        <div className='flex-1'>
                            <Input
                                label={t('cagnotte.name')}
                                placeholder={t('cagnotte.name')}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex w-full flex-row gap-5'>
                        <div className='flex-1'>
                            <Input
                                label={t('cagnotte.desc')}
                                placeholder={t('cagnotte.desc')}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                {loading && (
                    <div className='mt-3 w-full items-center justify-center flex'>
                        <Spinner size='md' />
                    </div>
                )}
                {error !== '' && <p className='mt-3 text-center text-red-700'>{error}</p>}
            </Modal.Body>
            <Modal.Footer className='flex-end flex items-end justify-end'>
                <Button
                    color='gray'
                    onClick={() => onClose()}
                >
                    {t('cagnotte.cancel')}
                </Button>
                <Button
                    onClick={() => {
                        cagnotte ? editCagnotte() : addCagnotte();
                    }}
                    className='bg-secondary text-white'
                >
                    {cagnotte ? t('cagnotte.edit') : t('cagnotte.add')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
