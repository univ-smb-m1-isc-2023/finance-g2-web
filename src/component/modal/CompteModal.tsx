import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Compte from '../../object/Compte';
import { Input } from '../base/Input';
import { post } from '../../utils/http';
import { useUser } from '../../context/UserContext';

interface ICompteModalProps {
    open: boolean;
    onClose: () => void;
    compte: Compte | null;
}

export const CompteModal = (props: ICompteModalProps) => {
    const user = useUser();

    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, compte } = props;
    const [accountName, setAccountName] = useState<string>(compte ? compte.accountName : '');

    const addCompte = async () => {
        setLoading(true);
        const addCompteInfo = await post('/account/create', {
            accountName: accountName,
            balance: 0,
            user: user.id,
        });
        setLoading(false);
        if (addCompteInfo.error) {
            setError(addCompteInfo.error);
        } else {
            onClose();
        }
    };

    const editCompte = async () => {
        setLoading(true);
        const editCompteInfo = await post('/account/edit', {
            id: compte.id,
            accountName: accountName,
        });
        setLoading(false);
        if (editCompteInfo.error) {
            setError(editCompteInfo.error);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        if (compte) {
            setAccountName(compte.accountName);
        }
    }, [compte]);

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{compte ? t('compte.edit_compte') : t('compte.add_compte')}</Modal.Header>
            <Modal.Body>
                <div className='flex flex-col flex-1 gap-3'>
                    <div className='flex w-full flex-row gap-5'>
                        <div className='flex-1'>
                            <Input
                                label={t('compte.name')}
                                placeholder={t('compte.name')}
                                value={accountName}
                                onChange={(e) => {
                                    setAccountName(e.target.value);
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
                    {t('compte.cancel')}
                </Button>
                <Button
                    onClick={() => {
                        compte ? editCompte() : addCompte();
                    }}
                    className='bg-secondary text-white'
                >
                    {compte ? t('compte.edit') : t('compte.add')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
