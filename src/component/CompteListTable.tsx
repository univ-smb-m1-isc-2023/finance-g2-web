import { Button, Card, Spinner, Table } from 'flowbite-react';
import { PlusCircleIcon, TrashIcon, WrenchIcon } from '@heroicons/react/24/solid';
import { GiMoneyStack } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import Compte from '../object/Compte';
import { useNavigate } from 'react-router-dom';

interface CompteListTableProps {
    onAdd: () => void;
    onEdit: (compte: Compte) => void;
    onDelete: (compte: Compte) => void;
    search: string;
    compteList: Compte[];
    loading: boolean;
    error: string;
}

export const CompteListTable = (props: CompteListTableProps) => {
    const { t } = useTranslation();
    const { loading, compteList, error } = props;
    const navigate = useNavigate();

    const finalList = compteList
        .sort((a, b) => a.balance - b.balance)
        .sort((a, b) => a.accountName.localeCompare(b.accountName));

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
                        <h1 className='text-xl font-bold'>{t('compte.no_compte')}</h1>
                        <Button
                            className='bg-primary'
                            onClick={() => {
                                props.onAdd();
                            }}
                        >
                            <span className='flex flex-row gap-2 items-center justify-center'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('compte.add_compte')}
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
                        <Table.HeadCell>{t('compte.name')}</Table.HeadCell>
                        <Table.HeadCell>{t('compte.balance')}</Table.HeadCell>
                        <Table.HeadCell>{t('compte.actions')}</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className='divide-y'>
                        {finalList.map((compte, index) => {
                            return (
                                <Table.Row
                                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                    key={index}
                                >
                                    <Table.Cell>
                                        <span>{compte.accountName}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span>{compte.balance}€</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-2 items-end justify-end flex-wrap'>
                                            <div className='flex flex-col gap-2'>
                                                <Button
                                                    className='w-full'
                                                    color='purple'
                                                    onClick={() => {
                                                        navigate(`/account/jackpot/${compte.id}`);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <GiMoneyStack className='h-6 w-6' />
                                                        {t('compte.jackpot')}
                                                    </span>
                                                </Button>
                                                <Button
                                                    className='w-full'
                                                    color='blue'
                                                    onClick={() => {
                                                        navigate(`/account/spent/${compte.id}`);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <GiMoneyStack className='h-6 w-6' />
                                                        {t('compte.spent')}
                                                    </span>
                                                </Button>
                                                <Button
                                                    className='w-full'
                                                    color='success'
                                                    onClick={() => {
                                                        navigate(`/account/forecast/${compte.id}`);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <GiMoneyStack className='h-6 w-6' />
                                                        {t('compte.forecast')}
                                                    </span>
                                                </Button>

                                                <Button
                                                    className='w-full'
                                                    color='warning'
                                                    onClick={() => {
                                                        props.onEdit(compte);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <WrenchIcon className='h-6 w-6' />
                                                        {t('compte.edit')}
                                                    </span>
                                                </Button>
                                                <Button
                                                    className='w-full'
                                                    color='failure'
                                                    onClick={() => {
                                                        props.onDelete(compte);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <TrashIcon className='h-6 w-6' />
                                                        {t('compte.remove')}
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
