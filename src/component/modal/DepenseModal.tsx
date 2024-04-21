import { Button, Label, Modal, Select, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Depense from '../../object/Depense';
import { Input } from '../base/Input';
import Cagnotte from '../../object/Cagnotte';
import { get, post } from '../../utils/http';
import { useParams } from 'react-router-dom';
import Datepicker from 'tailwind-datepicker-react';
import { dateToString } from '../../utils/utils';

interface IDepenseModalProps {
    open: boolean;
    onClose: () => void;
    depense: Depense | null;
}

export const DepenseModal = (props: IDepenseModalProps) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, depense } = props;
    const [cagnotteList, setCagnotteList] = useState<Cagnotte[]>([]);
    const [loadingCagnotte, setLoadingCagnotte] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(null);
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

    const addDepense = async () => {
        setLoading(true);
        const addCompteInfo = await post('/transaction/create', {
            amount: amount,
            date: dateToString(new Date(date ?? new Date())),
            account: id,
            tag: tag,
        });
        setLoading(false);
        if (addCompteInfo.error) {
            setError(addCompteInfo.error);
        } else {
            onClose();
        }
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
                                    label={t('depense.amount')}
                                    placeholder={t('depense.amount')}
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='flex w-full flex-row gap-5'>
                            <div className='flex-1 flex gap-1 w-full flex-col'>
                                <Label>{t('depense.tag')}</Label>
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
                                                label={t('depense.date')}
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
