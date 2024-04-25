import { useEffect, useState } from 'react';
import { BasePage } from '../component/base/BasePage';
import { get } from '../utils/http';
import Compte from '../object/Compte';
import { Card, Label, Select, Spinner } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import Cagnotte from '../object/Cagnotte';
import Transaction from '../object/Transaction';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const DashboardPage = () => {
    const [compteList, setCompteList] = useState<Compte[]>([]);
    const [cagnotteList, setCagnotteList] = useState<Cagnotte[]>([]);
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);
    const [loadingCompte, setLoadingCompte] = useState<boolean>(false);
    const [loadingCagnotte, setLoadingCagnotte] = useState<boolean>(false);
    const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [compteSelected, setCompteSelected] = useState<string>('');
    const [cagnotteSelected, setCagnotteSelected] = useState<string>('all');
    const [labels, setLabels] = useState<string[]>([]);
    const [dataValues, setDataValues] = useState<number[]>([]);
    const { t } = useTranslation();
    -useEffect(() => {
        setLoadingCompte(true);
        setError('');
        (async () => {
            const compteListInfo = await get('/account/me');
            setLoadingCompte(false);
            if (compteListInfo.error) {
                setError(compteListInfo.error);
                return;
            }
            setCompteList(compteListInfo);
        })();
    }, []);

    useEffect(() => {
        setLoadingCagnotte(true);
        setError('');
        (async () => {
            const cagnotteListInfo = await get('/tag/tags', {
                account: compteList.find((compte) => compte.id === parseInt(compteSelected)).id,
            });
            setLoadingCagnotte(false);
            if (cagnotteListInfo.error) {
                setError(cagnotteListInfo.error);
                return;
            }
            setCagnotteList(cagnotteListInfo);
        })();
    }, [compteSelected]);

    useEffect(() => {
        setLoadingTransaction(true);
        setError('');
        (async () => {
            if (cagnotteSelected === 'all') {
                const transactionListInfo = await get('/transaction/account', {
                    account: compteList.find((compte) => compte.id === parseInt(compteSelected)).id,
                });
                setLoadingTransaction(false);
                if (transactionListInfo.error) {
                    setError(transactionListInfo.error);
                    return;
                }
                setTransactionList(transactionListInfo);
            } else {
                const transactionListInfo = await get('/transaction/getfromtags', {
                    tag: cagnotteList.find((cagnotte) => cagnotte.id === parseInt(cagnotteSelected)).id,
                });
                setLoadingTransaction(false);
                if (transactionListInfo.error) {
                    setError(transactionListInfo.error);
                    return;
                }
                setTransactionList(transactionListInfo);
            }
        })();
    }, [compteSelected, cagnotteSelected]);

    transactionList.sort((a, b) => {
        return new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime();
    });

    const getMonthName = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('fr-FR');
    };

    useEffect(() => {
        if (transactionList.length > 0) {
            const sortedTransactions = transactionList.sort((a, b) => {
                return new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime();
            });
            setLabels(calculateDataLabels(sortedTransactions));
            setDataValues(calculateDataValues(sortedTransactions));
        }
    }, [transactionList]);

    const calculateDataLabels = (transactions) => {
        let labels = [];
        let date = '';
        transactions.forEach((transaction) => {
            if (date !== getMonthName(transaction.transactionDate)) {
                labels.push(getMonthName(transaction.transactionDate));
                date = getMonthName(transaction.transactionDate);
            }
        });
        return labels;
    };

    const calculateDataValues = (transactions) => {
        let values = [];
        let amount = 0;
        let date = '';
        transactions.forEach((transaction) => {
            if (transaction.type === 'depense') {
                amount -= transaction.amount;
            } else if (transaction.type === 'provision') {
                amount += transaction.amount;
            }
            if (date !== getMonthName(transaction.transactionDate)) {
                values.push(amount);
                date = getMonthName(transaction.transactionDate);
            } else {
                values.pop();
                values.push(amount);
            }
        });
        return values;
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text:
                    'Evolution de ' +
                    (cagnotteSelected === 'all'
                        ? 'toutes les cagnottes'
                        : cagnotteList.length !== 0
                          ? 'la cagnotte ' +
                            cagnotteList.find((cagnotte) => cagnotte.id === parseInt(cagnotteSelected)).name
                          : '') +
                    ' du compte ' +
                    (compteSelected !== ''
                        ? compteList.length !== 0
                            ? compteList.find((compte) => compte.id === parseInt(compteSelected)).accountName
                            : ''
                        : ''),
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: cagnotteSelected === 'all' ? 'Évolution du compte' : 'Évolution de la cagnotte',
                data: dataValues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <BasePage>
            <div className='flex flex-col pb-4 px-4 mx-auto max-w-screen-xl text-center lg:pb-8 lg:px-12 w-full gap-4'>
                <h1 className='text-darkGray text-4xl font-bold'>{t('dashboard.title')}</h1>

                <p className='text-darkGray text-xl'>{t('dashboard.description')}</p>

                <Card className='flex mb-4 w-full '>
                    <div className='flex flex-row items-center justify-around gap-12'>
                        <div className=' flex gap-1 flex-col w-full'>
                            <Label>
                                <p className='text-lightGray'>{t('dashboard.compte')}</p>
                            </Label>
                            <Select
                                value={compteSelected}
                                onChange={(e) => {
                                    setCompteSelected(e.target.value);
                                }}
                            >
                                <option value=''>{t('dashboard.select_account')}</option>
                                {compteList.map((compte, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={compte.id}
                                        >
                                            {compte.accountName}
                                        </option>
                                    );
                                })}
                            </Select>
                        </div>
                        {compteSelected === '' ? (
                            <div className=' flex gap-1 flex-col w-full'>
                                <p className='text-lightGray'>{t('dashboard.select_an_account')}</p>
                            </div>
                        ) : loadingCompte ? (
                            <div className='mt-3 w-full items-center justify-center flex'>
                                <Spinner size='md' />
                            </div>
                        ) : (
                            <div className=' flex gap-1 flex-col w-full'>
                                <Label>
                                    <p className='text-lightGray'>{t('dashboard.cagnotte')}</p>
                                </Label>
                                <Select
                                    value={cagnotteSelected}
                                    onChange={(e) => {
                                        setCagnotteSelected(e.target.value);
                                    }}
                                >
                                    <option value='all'>{t('dashboard.all_cagnotte')}</option>
                                    {cagnotteList.map((cagnotte, index) => {
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
                        )}
                    </div>
                </Card>
                <section className='gap-4 flex flex-col'>
                    {error !== '' && (
                        <Card className=''>
                            <div className='flex items-center flex-col justify-center gap-8 '>
                                <h1 className='font-bold text-red-600'>{error}</h1>
                            </div>
                        </Card>
                    )}
                    {!loadingCagnotte && !loadingTransaction && !loadingCompte && (
                        <Card className=''>
                            <Line
                                options={options}
                                data={data}
                            />
                        </Card>
                    )}
                </section>
            </div>
        </BasePage>
    );
};
