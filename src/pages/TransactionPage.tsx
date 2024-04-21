import { Button, Card, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { BasePage } from '../component/base/BasePage';
import Transaction from '../object/Transaction';
import { TransactionListTable } from '../component/TransactionListTable';
import { DeleteTransactionModal } from '../component/modal/DeleteTransactionModal';
import { TransactionModal } from '../component/modal/TransactionModal';
import { TfiImport } from 'react-icons/tfi';
import { ImportCsvModal } from '../component/modal/ImportCsvModal';
import { useParams } from 'react-router-dom';
import { get } from '../utils/http';

export const TransactionPage = () => {
    const { id } = useParams();
    const [search, setSearch] = useState<string>('');
    const [createTransaction, setCreateTransaction] = useState<boolean>(false);
    const [deleteTransaction, setDeleteTransaction] = useState<boolean>(false);
    const [editTransaction, setEditTransaction] = useState<boolean>(false);
    const [TransactionForModal, setTransactionForModal] = useState<Transaction | null>(null);
    const [importCsvOpen, setImportCsvOpen] = useState<boolean>(false);
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        setError('');
        (async () => {
            const transactionListInfo = await get('/transaction/account', { account: id });
            setLoading(false);
            if (transactionListInfo.error) {
                setError(transactionListInfo.error);
                return;
            }
            setTransactionList(transactionListInfo);
        })();
    }, [, createTransaction, deleteTransaction, editTransaction]);

    const onAdd = () => {
        setCreateTransaction(true);
    };

    const onEdit = (transaction: Transaction) => {
        setEditTransaction(true);
        setTransactionForModal(transaction);
    };

    const onDelete = (transaction: Transaction) => {
        setTransactionForModal(transaction);
        setDeleteTransaction(true);
    };

    const { t } = useTranslation();

    return (
        <BasePage>
            <div className='flex flex-col pb-4 px-4 mx-auto max-w-screen-xl text-center lg:pb-8 lg:px-12 w-full gap-4'>
                <h1 className='text-4xl font-bold'>{t('transaction.title')}</h1>

                <p className='text-xl'>{t('transaction.description')}</p>

                <Card className='flex mb-4 w-full '>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <TextInput
                            className='flex-1'
                            id='search'
                            name='search'
                            placeholder={t('transaction.search')}
                            type='text'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Button
                            className='bg-secondary text-white'
                            onClick={() => {
                                setImportCsvOpen(true);
                            }}
                        >
                            <span className='flex flex-row gap-2'>
                                <TfiImport className='h-6 w-6' />
                                {t('transaction.import_csv')}
                            </span>
                        </Button>
                        <Button
                            className='bg-secondary text-white'
                            onClick={() => {
                                setCreateTransaction(true);
                            }}
                        >
                            <span className='flex flex-row gap-2'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('transaction.add_transaction')}
                            </span>
                        </Button>
                    </div>
                </Card>
                <div className='w-full'>
                    <TransactionListTable
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        search={search}
                        transactionList={transactionList}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>

            <TransactionModal
                open={createTransaction}
                onClose={() => setCreateTransaction(false)}
                transaction={null}
            />

            <TransactionModal
                open={editTransaction}
                onClose={() => setEditTransaction(false)}
                transaction={TransactionForModal}
            />

            <DeleteTransactionModal
                open={deleteTransaction}
                onClose={() => setDeleteTransaction(false)}
                transaction={TransactionForModal}
            />

            <ImportCsvModal
                open={importCsvOpen}
                onClose={() => setImportCsvOpen(false)}
            />
        </BasePage>
    );
};
