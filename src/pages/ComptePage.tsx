import { Button, Card, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { BasePage } from '../component/base/BasePage';
import Compte from '../object/Compte';
import { CompteListTable } from '../component/CompteListTable';
import { DeleteCompteModal } from '../component/modal/DeleteCompteModal';
import { CompteModal } from '../component/modal/CompteModal';
import { get } from '../utils/http';

interface ComptePageProps {}

export const ComptePage = (props: ComptePageProps) => {
    const [search, setSearch] = useState<string>('');
    const [createCompte, setCreateCompte] = useState<boolean>(false);
    const [deleteCompte, setDeleteCompte] = useState<boolean>(false);
    const [editCompte, setEditCompte] = useState<boolean>(false);
    const [CompteForModal, setCompteForModal] = useState<Compte | null>(null);
    const [compteList, setCompteList] = useState<Compte[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        setError('');
        (async () => {
            const compteListInfo = await get('/account/me');
            setLoading(false);
            console.log(compteListInfo);
            if (compteListInfo.error) {
                setError(compteListInfo.error);
                return;
            }
            setCompteList(compteListInfo);
        })();
    }, [, createCompte, deleteCompte, editCompte]);

    const onAdd = () => {
        setCreateCompte(true);
    };

    const onEdit = (compte: Compte) => {
        setEditCompte(true);
        setCompteForModal(compte);
    };

    const onDelete = (compte: Compte) => {
        setCompteForModal(compte);
        setDeleteCompte(true);
    };

    const { t } = useTranslation();

    return (
        <BasePage>
            <div className='flex flex-col pb-4 px-4 mx-auto max-w-screen-xl text-center lg:pb-8 lg:px-12 w-full gap-4'>
                <h1 className='text-4xl font-bold'>{t('compte.title')}</h1>

                <p className='text-xl'>{t('compte.description')}</p>

                <Card className='flex mb-4 w-full '>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <TextInput
                            className='flex-1'
                            id='search'
                            name='search'
                            placeholder={t('compte.search')}
                            type='text'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Button
                            className='bg-secondary text-white'
                            onClick={() => {
                                setCreateCompte(true);
                            }}
                        >
                            <span className='flex flex-row gap-2'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('compte.add_compte')}
                            </span>
                        </Button>
                    </div>
                </Card>
                <div className='w-full'>
                    <CompteListTable
                        compteList={compteList}
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        search={search}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>

            <CompteModal
                open={createCompte}
                onClose={() => setCreateCompte(false)}
                compte={null}
            />

            <CompteModal
                open={editCompte}
                onClose={() => setEditCompte(false)}
                compte={CompteForModal}
            />

            <DeleteCompteModal
                open={deleteCompte}
                onClose={() => setDeleteCompte(false)}
                compte={CompteForModal}
            />
        </BasePage>
    );
};
