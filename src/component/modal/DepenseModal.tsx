import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Depense from '../../object/Depense';
import { Input } from '../base/Input';

interface IDepenseModalProps {
    open: boolean;
    onClose: () => void;
    depense: Depense | null;
}

export const DepenseModal = (props: IDepenseModalProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, depense } = props;

    const addDepense = async () => {
        //add depense
    };

    const editDepense = async () => {
        //edit depense
    };

    useEffect(() => {
        if (depense) {
            //set depense data
        }
    }, [depense]);

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{depense ? t('depense.edit_depense') : t('depense.add_depense')}</Modal.Header>
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
                    {t('depense.cancel')}
                </Button>
                <Button
                    onClick={() => {
                        depense ? editDepense() : addDepense();
                    }}
                    className='bg-secondary text-white'
                >
                    {depense ? t('depense.edit') : t('depense.add')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
