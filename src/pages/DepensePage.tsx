import { Button, Card, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { BasePage } from '../component/base/BasePage';
import Depense from '../object/Depense';
import { DepenseListTable } from '../component/DepenseListTable';
import { DeleteDepenseModal } from '../component/modal/DeleteDepenseModal';
import { DepenseModal } from '../component/modal/DepenseModal';
import { TfiImport } from 'react-icons/tfi';
import { ImportCsvModal } from '../component/modal/ImportCsvModal';
import { useParams } from 'react-router-dom';
import { get } from '../utils/http';

export const DepensePage = () => {
    const { id } = useParams();
    const [search, setSearch] = useState<string>('');
    const [createDepense, setCreateDepense] = useState<boolean>(false);
    const [deleteDepense, setDeleteDepense] = useState<boolean>(false);
    const [editDepense, setEditDepense] = useState<boolean>(false);
    const [DepenseForModal, setDepenseForModal] = useState<Depense | null>(null);
    const [importCsvOpen, setImportCsvOpen] = useState<boolean>(false);
    const [depenseList, setDepenseList] = useState<Depense[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        setError('');
        (async () => {
            const depenseListInfo = await get('/transaction/account', { account: id });
            setLoading(false);
            if (depenseListInfo.error) {
                setError(depenseListInfo.error);
                return;
            }
            setDepenseList(depenseListInfo);
        })();
    }, [, createDepense, deleteDepense, editDepense]);

    const onAdd = () => {
        setCreateDepense(true);
    };

    const onEdit = (depense: Depense) => {
        setEditDepense(true);
        setDepenseForModal(depense);
    };

    const onDelete = (depense: Depense) => {
        setDepenseForModal(depense);
        setDeleteDepense(true);
    };

    const { t } = useTranslation();

    return (
        <BasePage>
            <div className='flex flex-col pb-4 px-4 mx-auto max-w-screen-xl text-center lg:pb-8 lg:px-12 w-full gap-4'>
                <h1 className='text-4xl font-bold'>{t('depense.title')}</h1>

                <p className='text-xl'>{t('depense.description')}</p>

                <Card className='flex mb-4 w-full '>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <TextInput
                            className='flex-1'
                            id='search'
                            name='search'
                            placeholder={t('depense.search')}
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
                                {t('depense.import_csv')}
                            </span>
                        </Button>
                        <Button
                            className='bg-secondary text-white'
                            onClick={() => {
                                setCreateDepense(true);
                            }}
                        >
                            <span className='flex flex-row gap-2'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('depense.add_depense')}
                            </span>
                        </Button>
                    </div>
                </Card>
                <div className='w-full'>
                    <DepenseListTable
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        search={search}
                        depenseList={depenseList}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>

            <DepenseModal
                open={createDepense}
                onClose={() => setCreateDepense(false)}
                depense={null}
            />

            <DepenseModal
                open={editDepense}
                onClose={() => setEditDepense(false)}
                depense={DepenseForModal}
            />

            <DeleteDepenseModal
                open={deleteDepense}
                onClose={() => setDeleteDepense(false)}
                depense={DepenseForModal}
            />

            <ImportCsvModal
                open={importCsvOpen}
                onClose={() => setImportCsvOpen(false)}
            />
        </BasePage>
    );
};
