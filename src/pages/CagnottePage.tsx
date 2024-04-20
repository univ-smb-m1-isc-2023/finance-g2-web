import { Button, Card, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { BasePage } from '../component/base/BasePage';
import Cagnotte from '../object/Cagnotte';
import { CagnotteListTable } from '../component/CagnotteListTable';
import { DeleteCagnotteModal } from '../component/modal/DeleteCagnotteModal';
import { CagnotteModal } from '../component/modal/CagnotteModal';

interface CagnottePageProps {}

export const CagnottePage = (props: CagnottePageProps) => {
    const [search, setSearch] = useState<string>('');
    const [createCagnotte, setCreateCagnotte] = useState<boolean>(false);
    const [deleteCagnotte, setDeleteCagnotte] = useState<boolean>(false);
    const [editCagnotte, setEditCagnotte] = useState<boolean>(false);
    const [CagnotteForModal, setCagnotteForModal] = useState<Cagnotte | null>(null);

    const onAdd = () => {
        setCreateCagnotte(true);
    };

    const onEdit = (cagnotte: Cagnotte) => {
        setEditCagnotte(true);
        setCagnotteForModal(cagnotte);
    };

    const onDelete = (cagnotte: Cagnotte) => {
        setCagnotteForModal(cagnotte);
        setDeleteCagnotte(true);
    };

    const { t } = useTranslation();

    return (
        <BasePage>
            <div className='flex flex-col pb-4 px-4 mx-auto max-w-screen-xl text-center lg:pb-8 lg:px-12 w-full gap-4'>
                <h1 className='text-4xl font-bold'>{t('cagnotte.title')}</h1>

                <p className='text-xl'>{t('cagnotte.description')}</p>

                <Card className='flex mb-4 w-full '>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <TextInput
                            className='flex-1'
                            id='search'
                            name='search'
                            placeholder={t('cagnotte.search')}
                            type='text'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Button
                            className='bg-secondary text-white'
                            onClick={() => {
                                setCreateCagnotte(true);
                            }}
                        >
                            <span className='flex flex-row gap-2'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('cagnotte.add_cagnotte')}
                            </span>
                        </Button>
                    </div>
                </Card>
                <div className='w-full'>
                    <CagnotteListTable
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        search={search}
                    />
                </div>
            </div>

            <CagnotteModal
                open={createCagnotte}
                onClose={() => setCreateCagnotte(false)}
                cagnotte={null}
            />

            <CagnotteModal
                open={editCagnotte}
                onClose={() => setEditCagnotte(false)}
                cagnotte={CagnotteForModal}
            />

            <DeleteCagnotteModal
                open={deleteCagnotte}
                onClose={() => setDeleteCagnotte(false)}
                cagnotte={CagnotteForModal}
            />
        </BasePage>
    );
};
