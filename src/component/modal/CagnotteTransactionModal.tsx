import { Button, Label, Modal, Select, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Transaction from '../../object/Transaction';
import { Input } from '../base/Input';
import Cagnotte from '../../object/Cagnotte';
import { get, post } from '../../utils/http';
import { useParams } from 'react-router-dom';
import Datepicker from 'tailwind-datepicker-react';
import { dateToString } from '../../utils/utils';

interface ICagnotteTransactionModalProps {
    open: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

export const CagnotteTransactionModal = (props: ICagnotteTransactionModalProps) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, transaction } = props;
    const [cagnotteList, setCagnotteList] = useState<Cagnotte[]>([]);
    const [loadingCagnotte, setLoadingCagnotte] = useState<boolean>(false);
    const [tag, setTag] = useState<string>(transaction ? transaction.tag.id.toString() : '');

    useEffect(() => {
        setLoadingCagnotte(true);
        setError('');
        (async () => {
            const cagnotteListInfo = await get('/tag/tags', { account: id });
            setLoadingCagnotte(false);
            if (cagnotteListInfo.error) {
                setError(cagnotteListInfo.error);
                return;
            }
            setCagnotteList(cagnotteListInfo);
        })();
    }, [open]);

    const finalList = cagnotteList.sort((a, b) => a.name.localeCompare(b.name));

    const cagnotteTransaction = async () => {
        setLoading(true);
        console.log(transaction.id, tag);
        const cagnotteTransactionInfo = await post('/transaction/tag', {
            transactionId: transaction.id,
            tagId: parseInt(tag),
        });
        setLoading(false);
        if (cagnotteTransactionInfo.error) {
            setError(cagnotteTransactionInfo.error);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        if (transaction) {
            setTag(transaction.tag.id.toString());
        }
    }, [transaction]);

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{t('transaction.cagnotte_transaction')}</Modal.Header>
            <Modal.Body>
                {loadingCagnotte && (
                    <div className='mt-3 w-full items-center justify-center flex'>
                        <Spinner size='md' />
                    </div>
                )}
                {!loadingCagnotte && (
                    <div className='flex flex-col flex-1 gap-3'>
                        <div className='flex w-full flex-row gap-5'>
                            <div className='flex-1 flex gap-1 w-full flex-col'>
                                <Label>{t('transaction.tag')}</Label>
                                <Select
                                    value={tag}
                                    onChange={(e) => {
                                        setTag(e.target.value);
                                    }}
                                >
                                    <option value=''>{t('')}</option>
                                    {finalList.map((cagnotte, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={cagnotte.id}
                                            >
                                                {cagnotte.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>
                )}
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
                    {t('transaction.cancel')}
                </Button>
                <Button
                    onClick={() => {
                        cagnotteTransaction();
                    }}
                    className='bg-secondary text-white'
                >
                    {t('transaction.cagnotte')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
