import { Button, Card, Spinner, Table } from 'flowbite-react';
import { PlusCircleIcon, TrashIcon, WrenchIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import Prevision from '../object/Prevision';

interface PrevisionListTableProps {
    onAdd: () => void;
    onEdit: (prevision: Prevision) => void;
    onDelete: (prevision: Prevision) => void;
    search: string;
    previsionList: Prevision[];
    loading: boolean;
    error: string;
}

export const PrevisionListTable = (props: PrevisionListTableProps) => {
    const { t } = useTranslation();

    const { loading, previsionList, error } = props;

    const finalList = previsionList
        .sort((a, b) => a.year.toLocaleString().localeCompare(b.year.toLocaleString()))
        .sort((a, b) => a.month.toLocaleString().localeCompare(b.month.toLocaleString()));

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
                        <h1 className='text-lightGray text-xl font-bold'>{t('prevision.no_prevision')}</h1>
                        <Button
                            className='bg-primary'
                            onClick={() => {
                                props.onAdd();
                            }}
                        >
                            <span className='flex flex-row gap-2 items-center justify-center'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('prevision.add_prevision')}
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
                        <Table.HeadCell>{t('prevision.name')}</Table.HeadCell>
                        <Table.HeadCell>{t('prevision.amount')}</Table.HeadCell>
                        <Table.HeadCell>{t('prevision.month')}</Table.HeadCell>
                        <Table.HeadCell>{t('prevision.year')}</Table.HeadCell>
                        <Table.HeadCell>{t('prevision.tag')}</Table.HeadCell>
                        <Table.HeadCell>{t('prevision.actions')}</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className='divide-y'>
                        {finalList.map((prevision, index) => {
                            return (
                                <Table.Row
                                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                    key={index}
                                >
                                    <Table.Cell>{prevision.name}</Table.Cell>
                                    <Table.Cell>{prevision.amount}€</Table.Cell>
                                    <Table.Cell>{prevision.month}</Table.Cell>
                                    <Table.Cell>{prevision.year}</Table.Cell>
                                    <Table.Cell>{prevision.tag.name}</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-2 items-end justify-end flex-wrap'>
                                            <div className='flex flex-col gap-2'>
                                                <Button
                                                    className='w-full'
                                                    color='warning'
                                                    onClick={() => {
                                                        props.onEdit(prevision);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <WrenchIcon className='h-6 w-6' />
                                                        {t('prevision.edit')}
                                                    </span>
                                                </Button>

                                                <Button
                                                    className='w-full'
                                                    color='failure'
                                                    onClick={() => {
                                                        props.onDelete(prevision);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <TrashIcon className='h-6 w-6' />
                                                        {t('prevision.remove')}
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
