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

interface ITransactionModalProps {
    open: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

export const TransactionModal = (props: ITransactionModalProps) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, transaction } = props;
    const [cagnotteList, setCagnotteList] = useState<Cagnotte[]>([]);
    const [loadingCagnotte, setLoadingCagnotte] = useState<boolean>(false);
    const [name, setName] = useState<string>(transaction ? transaction.name : '');
    const [amount, setAmount] = useState<string>(transaction ? transaction.amount.toString() : '');
    const [tag, setTag] = useState<string>(
        transaction && transaction.tag && transaction.tag.id != null ? transaction.tag.id.toString() : '',
    );
    const [show, setShow] = useState(false);
    const [type, setType] = useState<string>(transaction ? transaction.type : '');
    const [date, setDate] = useState(transaction ? new Date(transaction.transactionDate) : new Date());
    const handleClose = () => setShow(false);

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

    const addTransaction = async () => {
        setLoading(true);
        const addTransactionInfo = await post('/transaction/create', {
            name: name,
            amount: amount,
            date: dateToString(new Date(date ?? new Date())),
            account: id,
            type: type,
            tag: tag,
        });
        setLoading(false);
        if (addTransactionInfo.error) {
            setError(addTransactionInfo.error);
        } else {
            onClose();
        }
    };

    const editTransaction = async () => {
        setLoading(true);
        const editTransactionInfo = await post('/transaction/edit', {
            id: transaction?.id,
            name: name,
            amount: amount,
            date: dateToString(new Date(date ?? new Date())),
            account: id,
            type: type,
            tag: tag,
        });
        setLoading(false);
        if (editTransactionInfo.error) {
            setError(editTransactionInfo.error);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        if (transaction) {
            setName(transaction.name);
            setAmount(transaction.amount.toString());
            setTag(transaction && transaction.tag && transaction.tag.id != null ? transaction.tag.id.toString() : '');
            setType(transaction.type);
            setDate(new Date(transaction.transactionDate));
        }
    }, [transaction]);

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>
                {transaction ? t('transaction.edit_transaction') : t('transaction.add_transaction')}
            </Modal.Header>
            <Modal.Body>
                {loadingCagnotte && (
                    <div className='mt-3 w-full items-center justify-center flex'>
                        <Spinner size='md' />
                    </div>
                )}
                {!loadingCagnotte && (
                    <div className='flex flex-col flex-1 gap-3'>
                        <div className='flex w-full flex-row gap-5'>
                            <div className='flex-1'>
                                <Input
                                    label={t('transaction.name')}
                                    placeholder={t('transaction.name')}
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
                                    label={t('transaction.amount')}
                                    placeholder={t('transaction.amount')}
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
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
                        <div className='flex w-full flex-row gap-5'>
                            <div className='flex-1 flex gap-1 w-full flex-col'>
                                <Label>{t('transaction.type')}</Label>
                                <Select
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value);
                                    }}
                                >
                                    <option value=''>{t('')}</option>
                                    <option value='depense'>{t('transaction.depense')}</option>
                                    <option value='provision'>{t('transaction.provision')}</option>
                                </Select>
                            </div>
                        </div>
                        <div className='flex w-full flex-row gap-5'>
                            <span className='flex-1 flex flex-col gap-1'>
                                <div
                                    className='flex'
                                    onClick={() => {
                                        if (!show) {
                                            setShow(true);
                                        }
                                    }}
                                >
                                    <Datepicker
                                        show={show}
                                        setShow={handleClose}
                                        options={{
                                            defaultDate: date,
                                            todayBtnText: "Aujourd'hui",
                                            clearBtnText: 'Effacer',
                                            clearBtn: false,
                                            todayBtn: false,
                                            language: 'fr',
                                            weekDays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
                                            inputPlaceholderProp: 'Sélectionner une date',
                                            inputDateFormatProp: {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            },
                                            datepickerClassNames: 'mt-[4rem]',
                                        }}
                                        onChange={(e: any) => {
                                            setDate(e);
                                        }}
                                    >
                                        <div className='...'>
                                            <div className='...'></div>
                                            <Input
                                                type='text'
                                                label={t('transaction.date')}
                                                className='...'
                                                placeholder='Select Date'
                                                value={new Date(date ?? new Date()).toLocaleDateString()}
                                                onFocus={() => setShow(true)}
                                                readOnly
                                            />
                                        </div>
                                    </Datepicker>
                                </div>
                            </span>
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
                        transaction ? editTransaction() : addTransaction();
                    }}
                    className='bg-secondary text-white'
                >
                    {transaction ? t('transaction.edit') : t('transaction.add')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
