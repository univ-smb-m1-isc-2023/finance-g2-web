import { Button, Label, Modal, Select, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Prevision from '../../object/Prevision';
import { Input } from '../base/Input';
import Cagnotte from '../../object/Cagnotte';
import { get, post } from '../../utils/http';
import { useParams } from 'react-router-dom';
import Datepicker from 'tailwind-datepicker-react';
import { dateToString } from '../../utils/utils';

interface IPrevisionModalProps {
    open: boolean;
    onClose: () => void;
    prevision: Prevision | null;
}

export const PrevisionModal = (props: IPrevisionModalProps) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { open, onClose, prevision } = props;
    const [cagnotteList, setCagnotteList] = useState<Cagnotte[]>([]);
    const [loadingCagnotte, setLoadingCagnotte] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>(prevision ? prevision.amount.toString() : '');
    const [tag, setTag] = useState<string>(prevision ? prevision.tag.id.toString() : '');
    const [show, setShow] = useState(false);
    const [type, setType] = useState<string>(prevision ? prevision.type : '');
    const [month, setMonth] = useState<number>(prevision ? prevision.month : 0);
    const [year, setYear] = useState<number>(prevision ? prevision.year : 0);
    const [isMultiYear, setIsMultiYear] = useState<boolean>(false);
    const [nbOfYear, setOfNbYear] = useState<string>('');
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

    const addPrevision = async () => {
        setLoading(true);
        if (!isMultiYear) {
            const addPrevisionInfo = await post('/forecast/create', {
                amount: amount,
                month: month,
                year: year,
                account: id,
                type: type,
                tag: tag,
            });
            setLoading(false);
            if (addPrevisionInfo.error) {
                setError(addPrevisionInfo.error);
            } else {
                onClose();
            }
        } else {
            const addPrevisionInfo = await post('/forecast/createMultiple', {
                amount: amount,
                month: month,
                year: year,
                account: id,
                type: type,
                tag: tag,
                nbOfYear: parseInt(nbOfYear),
            });
            setLoading(false);
            if (addPrevisionInfo.error) {
                setError(addPrevisionInfo.error);
            } else {
                onClose();
            }
        }
    };

    const editPrevision = async () => {
        setLoading(true);
        const editPrevisionInfo = await post('/forecast/edit', {
            id: prevision?.id,
            amount: amount,
            month: month,
            year: year,
            account: id,
            type: type,
            tag: tag,
        });
        setLoading(false);
        if (editPrevisionInfo.error) {
            setError(editPrevisionInfo.error);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        if (prevision) {
            setAmount(prevision.amount.toString());
            setTag(prevision.tag.id.toString());
            setType(prevision.type);
            setMonth(prevision.month);
            setYear(prevision.year);
        }
    }, [prevision]);

    return (
        <Modal
            show={open}
            onClose={onClose}
        >
            <Modal.Header>{prevision ? t('prevision.edit_prevision') : t('prevision.add_prevision')}</Modal.Header>
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
                                    label={t('prevision.amount')}
                                    placeholder={t('prevision.amount')}
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='flex w-full flex-row gap-5'>
                            <div className='flex-1 flex gap-1 w-full flex-col'>
                                <Label>{t('prevision.tag')}</Label>
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
                                <Label>{t('prevision.type')}</Label>
                                <Select
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value);
                                    }}
                                >
                                    <option value=''>{t('')}</option>
                                    <option value='depense'>{t('prevision.depense')}</option>
                                    <option value='provision'>{t('prevision.provision')}</option>
                                </Select>
                            </div>
                        </div>
                        <div className='flex w-full flex-row gap-5'>
                            <div className='flex-1 flex gap-1 w-full flex-col'>
                                <Label>{t('prevision.month')}</Label>
                                <Select
                                    value={month}
                                    onChange={(e) => {
                                        setMonth(parseInt(e.target.value));
                                    }}
                                >
                                    <option value={0}>{t('')}</option>
                                    <option value={1}>{t('prevision.january')}</option>
                                    <option value={2}>{t('prevision.february')}</option>
                                    <option value={3}>{t('prevision.march')}</option>
                                    <option value={4}>{t('prevision.april')}</option>
                                    <option value={5}>{t('prevision.may')}</option>
                                    <option value={6}>{t('prevision.june')}</option>
                                    <option value={7}>{t('prevision.july')}</option>
                                    <option value={8}>{t('prevision.august')}</option>
                                    <option value={9}>{t('prevision.september')}</option>
                                    <option value={10}>{t('prevision.october')}</option>
                                    <option value={11}>{t('prevision.november')}</option>
                                    <option value={12}>{t('prevision.december')}</option>
                                </Select>
                            </div>
                        </div>
                        <div className='flex w-full flex-row gap-5'>
                            <div className='flex-1 flex gap-1 w-full flex-col'>
                                <Label>{t('prevision.year')}</Label>
                                <Select
                                    value={year}
                                    onChange={(e) => {
                                        setYear(parseInt(e.target.value));
                                    }}
                                >
                                    <option value={0}>{t('')}</option>
                                    {Array.from(Array(10).keys()).map((i) => {
                                        return (
                                            <option
                                                key={i}
                                                value={parseInt(new Date().getFullYear().toString()) + i}
                                            >
                                                {(parseInt(new Date().getFullYear().toString()) + i).toString()}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                        </div>
                        {!prevision && (
                            <>
                                <div className='flex flex-row gap-2 w-full'>
                                    <Label className='text-xl flex flex-row w-full font-bold'>
                                        <span className={'flex-1'}>{t('prevision.muti_year')}</span>
                                        <div className='flex items-center'>
                                            <p className='mr-2 text-xs'>NON</p>
                                            <div className='relative'>
                                                <input
                                                    type='checkbox'
                                                    className='sr-only peer'
                                                    checked={isMultiYear}
                                                    onClick={() => setIsMultiYear(!isMultiYear)}
                                                />
                                                <div className="w-[2.8rem] h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </div>
                                            <p className='ml-2 text-xs'>OUI</p>
                                        </div>
                                    </Label>
                                </div>
                                {isMultiYear && (
                                    <div className='flex w-full flex-row gap-5'>
                                        <div className='flex-1'>
                                            <Input
                                                label={t('prevision.nbYear')}
                                                placeholder={t('prevision.nbYear')}
                                                value={nbOfYear}
                                                onChange={(e) => {
                                                    setOfNbYear(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
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
                    {t('prevision.cancel')}
                </Button>
                <Button
                    onClick={() => {
                        prevision ? editPrevision() : addPrevision();
                    }}
                    className='bg-secondary text-white'
                >
                    {prevision ? t('prevision.edit') : t('prevision.add')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
