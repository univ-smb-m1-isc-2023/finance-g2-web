import { useEffect, useState } from 'react';
import { Button, Card, Spinner, Table } from 'flowbite-react';
import { EyeIcon, PlusCircleIcon, TrashIcon, WrenchIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import Cagnotte from '../object/Cagnotte';

interface CagnotteListTableProps {
    onAdd: () => void;
    onEdit: (cagnotte: Cagnotte) => void;
    onDelete: (cagnotte: Cagnotte) => void;
    search: string;
    cagnotteList: Cagnotte[];
    loading: boolean;
    error: string;
}

export const CagnotteListTable = (props: CagnotteListTableProps) => {
    const { t } = useTranslation();

    const { loading, cagnotteList, error } = props;

    useEffect(() => {
        (async () => {
            //get cagnotte list
        })();
    }, []);

    const finalList = cagnotteList.sort((a, b) => a.name.localeCompare(b.name));

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
                        <h1 className='text-xl font-bold'>{t('cagnotte.no_cagnotte')}</h1>
                        <Button
                            className='bg-primary'
                            onClick={() => {
                                props.onAdd();
                            }}
                        >
                            <span className='flex flex-row gap-2 items-center justify-center'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('cagnotte.add_cagnotte')}
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
                        <Table.HeadCell>{t('cagnotte.name')}</Table.HeadCell>
                        <Table.HeadCell>{t('cagnotte.desc')}</Table.HeadCell>
                        <Table.HeadCell>{t('cagnotte.actions')}</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className='divide-y'>
                        {finalList.map((cagnotte, index) => {
                            return (
                                <Table.Row
                                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                    key={index}
                                >
                                    <Table.Cell>
                                        <span>{cagnotte.name}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span>{cagnotte.description}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-2 items-end justify-end flex-wrap'>
                                            <div className='flex flex-col gap-2'>
                                                <Button
                                                    className='w-full'
                                                    color='purple'
                                                    onClick={() => {}}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <EyeIcon className='h-6 w-6' />
                                                        {t('cagnotte.see')}
                                                    </span>
                                                </Button>
                                                <Button
                                                    className='w-full'
                                                    color='warning'
                                                    onClick={() => {
                                                        props.onEdit(cagnotte);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <WrenchIcon className='h-6 w-6' />
                                                        {t('cagnotte.edit')}
                                                    </span>
                                                </Button>

                                                <Button
                                                    className='w-full'
                                                    color='failure'
                                                    onClick={() => {
                                                        props.onDelete(cagnotte);
                                                    }}
                                                >
                                                    <span className='flex items-center justify-center gap-2 flex-row'>
                                                        <TrashIcon className='h-6 w-6' />
                                                        {t('cagnotte.remove')}
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
