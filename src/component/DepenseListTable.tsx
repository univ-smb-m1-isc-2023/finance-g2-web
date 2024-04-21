import { Button, Card, Spinner, Table } from 'flowbite-react';
import { PlusCircleIcon, TrashIcon, WrenchIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import Depense from '../object/Depense';

interface DepenseListTableProps {
    onAdd: () => void;
    onEdit: (depense: Depense) => void;
    onDelete: (depense: Depense) => void;
    search: string;
    depenseList: Depense[];
    loading: boolean;
    error: string;
}

export const DepenseListTable = (props: DepenseListTableProps) => {
    const { t } = useTranslation();

    const { loading, depenseList, error } = props;

    const finalList = depenseList.sort((a, b) =>
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
                        <h1 className='text-xl font-bold'>{t('depense.no_depense')}</h1>
                        <Button
                            className='bg-primary'
                            onClick={() => {
                                props.onAdd();
                            }}
                        >
                            <span className='flex flex-row gap-2 items-center justify-center'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('depense.add_depense')}
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
                        <Table.HeadCell>{t('depense.amount')}</Table.HeadCell>
                        <Table.HeadCell>{t('depense.date')}</Table.HeadCell>
                        <Table.HeadCell>{t('depense.tag')}</Table.HeadCell>
                        <Table.HeadCell>{t('depense.actions')}</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className='divide-y'>
                        {finalList.map((depense, index) => {
                            return (
                                <Table.Row
                                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                    key={index}
                                >
                                    <Table.Cell>{depense.amount}€</Table.Cell>
                                    <Table.Cell>{new Date(depense.transactionDate).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{depense.tag.name}</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-2 items-end justify-end flex-wrap'>
                                            <div className='flex flex-col gap-2'>
                                                <Button
                                                    className='w-full'
                                                    color='warning'
                                                    onClick={() => {
                                                        props.onEdit(depense);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <WrenchIcon className='h-6 w-6' />
                                                        {t('depense.edit')}
                                                    </span>
                                                </Button>

                                                <Button
                                                    className='w-full'
                                                    color='failure'
                                                    onClick={() => {
                                                        props.onDelete(depense);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <TrashIcon className='h-6 w-6' />
                                                        {t('depense.remove')}
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
