import { Button, Card, Spinner, Table } from 'flowbite-react';
import { PlusCircleIcon, TrashIcon, WrenchIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import Transaction from '../object/Transaction';
import { GiMoneyStack } from 'react-icons/gi';

interface TransactionListTableProps {
    onAdd: () => void;
    onEdit: (transaction: Transaction) => void;
    onDelete: (transaction: Transaction) => void;
    onCagnotte: (transaction: Transaction) => void;
    search: string;
    transactionList: Transaction[];
    loading: boolean;
    error: string;
}

export const TransactionListTable = (props: TransactionListTableProps) => {
    const { t } = useTranslation();

    const { loading, transactionList, error } = props;

    const finalList = transactionList.sort((a, b) =>
        a.transactionDate.toLocaleString().localeCompare(b.transactionDate.toLocaleString()),
    );

    return (
        <section className='gap-4 flex flex-col'>
            {error !== '' && (
                <Card className=''>
                    <div className='flex items-center flex-col justify-center gap-8 '>
                        <h1 className='font-bold text-red-600'>{error}</h1>
                    </div>
                </Card>
            )}
            {finalList.length === 0 && !loading ? (
                <Card className=''>
                    <div className='flex items-center flex-col justify-center gap-8 p-8'>
                        <h1 className='text-lightGray text-xl font-bold'>{t('transaction.no_transaction')}</h1>
                        <Button
                            className='bg-primary'
                            onClick={() => {
                                props.onAdd();
                            }}
                        >
                            <span className='flex flex-row gap-2 items-center justify-center'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('transaction.add_transaction')}
                            </span>
                        </Button>
                    </div>
                </Card>
            ) : (
                <Table
                    hoverable
                    className='shadow-lg'
                >
                    <Table.Head>
                        <Table.HeadCell>{t('transaction.name')}</Table.HeadCell>
                        <Table.HeadCell>{t('transaction.amount')}</Table.HeadCell>
                        <Table.HeadCell>{t('transaction.date')}</Table.HeadCell>
                        <Table.HeadCell>{t('transaction.tag')}</Table.HeadCell>
                        <Table.HeadCell>{t('transaction.actions')}</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className='divide-y'>
                        {finalList.map((transaction, index) => {
                            return (
                                <Table.Row
                                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                    key={index}
                                >
                                    <Table.Cell>{transaction.name}</Table.Cell>
                                    <Table.Cell>{transaction.amount}€</Table.Cell>
                                    <Table.Cell>
                                        {new Date(transaction.transactionDate).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>{transaction.tag.name}</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-2 items-end justify-end flex-wrap'>
                                            <div className='flex flex-col gap-2'>
                                                <Button
                                                    className='w-full'
                                                    color='purple'
                                                    onClick={() => {
                                                        props.onCagnotte(transaction);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <GiMoneyStack className='h-6 w-6' />
                                                        {t('transaction.cagnotte')}
                                                    </span>
                                                </Button>

                                                <Button
                                                    className='w-full'
                                                    color='warning'
                                                    onClick={() => {
                                                        props.onEdit(transaction);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <WrenchIcon className='h-6 w-6' />
                                                        {t('transaction.edit')}
                                                    </span>
                                                </Button>

                                                <Button
                                                    className='w-full'
                                                    color='failure'
                                                    onClick={() => {
                                                        props.onDelete(transaction);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <TrashIcon className='h-6 w-6' />
                                                        {t('transaction.remove')}
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
            {loading && (
                <div className='bg-white w-full dark:border-gray-700 dark:bg-gray-800'>
                    <div className='w-full flex items-center justify-center p-16'>
                        <Spinner size='md' />
                    </div>
                </div>
            )}
        </section>
    );
};
