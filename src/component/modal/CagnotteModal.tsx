import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Cagnotte from '../../object/Cagnotte';
import { Input } from '../base/Input';

interface ICagnotteModalProps {
    open: boolean;
    onClose: () => void;
    cagnotte: Cagnotte | null;
}

export const CagnotteModal = (props: ICagnotteModalProps) => {
    const navigate = useNavigate();

    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, cagnotte } = props;

    const addCagnotte = async () => {
        //add cagnotte
    };

    const editCagnotte = async () => {
        //edit cagnotte
    };

    useEffect(() => {
        if (cagnotte) {
            //set cagnotte data
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
                                label={t('')}
                                placeholder={t('')}
                                value={''}
                                onChange={(e) => {}}
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
